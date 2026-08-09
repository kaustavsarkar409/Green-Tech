from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

from .models import WasteReport, Truck
from .node_engine import create_collection_nodes
from .priority import prioritize_nodes
from .routing import optimize_to_target

from fastapi.middleware.cors import CORSMiddleware

# ============================================================
# FASTAPI APPLICATION
# ============================================================

app = FastAPI(
    title="Green Tech Waste Route Optimizer",
    description=(
        "Backend API for waste collection node generation "
        "and road-based route optimization."
    ),
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ============================================================
# REQUEST MODELS
# ============================================================

class TruckRequest(BaseModel):
    """
    Information about the garbage truck.
    """

    truck_id: str = "TRUCK_001"

    latitude: float = Field(
        ...,
        ge=-90,
        le=90
    )

    longitude: float = Field(
        ...,
        ge=-180,
        le=180
    )

    fuel_consumption_l_per_km: float = Field(
        default=0.25,
        gt=0
    )


class WasteReportRequest(BaseModel):
    """
    Waste report received from the user system.

    This represents the data that will eventually
    come from the SQL database.
    """

    report_id: str

    user_id: str

    latitude: float = Field(
        ...,
        ge=-90,
        le=90
    )

    longitude: float = Field(
        ...,
        ge=-180,
        le=180
    )

    timestamp: str

    waste_type: str

    estimated_amount: float | None = Field(
        default=None,
        ge=0
    )


class OptimizeRouteRequest(BaseModel):
    """
    Complete request sent by the frontend/admin system.

    Contains:
        - truck location
        - waste reports
        - simulated traffic level
    """

    truck: TruckRequest

    reports: list[WasteReportRequest]

    traffic_level: str = "low"


# ============================================================
# HEALTH CHECK
# ============================================================

@app.get("/")
def root():
    """
    Basic API health check.
    """

    return {
        "status": "running",
        "service": "Green Tech Waste Route Optimizer",
        "version": "1.0.0"
    }


# ============================================================
# HEALTH ENDPOINT
# ============================================================

@app.get("/health")
def health_check():
    """
    Used to verify that the backend is alive.
    """

    return {
        "status": "healthy"
    }


# ============================================================
# OPTIMIZE ROUTE
# ============================================================

@app.post("/optimize-route")
def optimize_route(request: OptimizeRouteRequest):
    """
    Complete V1 → V2 pipeline.

    Flow:

        Waste reports
              ↓
        Geohash grouping
              ↓
        Collection nodes
              ↓
        Priority calculation
              ↓
        Highest-priority node
              ↓
        OSRM road routing
              ↓
        RouteResult
              ↓
        JSON response
    """

    # --------------------------------------------------------
    # 1. Validate traffic level
    # --------------------------------------------------------

    traffic_level = request.traffic_level.lower()

    if traffic_level not in {
        "low",
        "medium",
        "high"
    }:
        raise HTTPException(
            status_code=400,
            detail=(
                "traffic_level must be "
                "'low', 'medium', or 'high'."
            )
        )

    # --------------------------------------------------------
    # 2. Convert API reports → internal WasteReport objects
    # --------------------------------------------------------

    reports = []

    for report in request.reports:

        try:

            # Convert timestamp string into datetime.
            from datetime import datetime

            timestamp = datetime.fromisoformat(
                report.timestamp.replace(
                    "Z",
                    "+00:00"
                )
            )

            waste_report = WasteReport(
                report_id=report.report_id,

                user_id=report.user_id,

                latitude=report.latitude,

                longitude=report.longitude,

                timestamp=timestamp,

                waste_type=report.waste_type,

                estimated_amount=report.estimated_amount
            )

            reports.append(
                waste_report
            )

        except ValueError as error:

            raise HTTPException(
                status_code=400,
                detail=(
                    f"Invalid timestamp for report "
                    f"{report.report_id}: {error}"
                )
            )

    # --------------------------------------------------------
    # 3. Make sure reports exist
    # --------------------------------------------------------

    if not reports:

        raise HTTPException(
            status_code=400,
            detail="No waste reports were provided."
        )

    # --------------------------------------------------------
    # 4. V1 — Create collection nodes
    # --------------------------------------------------------

    nodes = create_collection_nodes(
        reports
    )

    if not nodes:

        raise HTTPException(
            status_code=404,
            detail=(
                "No collection nodes were created. "
                "There may not be enough nearby waste "
                "reports to form a collection node."
            )
        )

    # --------------------------------------------------------
    # 5. V1 — Prioritize nodes
    # --------------------------------------------------------

    ranked_nodes = prioritize_nodes(
        nodes
    )

    if not ranked_nodes:

        raise HTTPException(
            status_code=404,
            detail="No collection nodes available."
        )

    # --------------------------------------------------------
    # 6. Select highest-priority node
    # --------------------------------------------------------

    target = ranked_nodes[0]

    # --------------------------------------------------------
    # 7. Create Truck object
    # --------------------------------------------------------

    truck = Truck(
        truck_id=request.truck.truck_id,

        latitude=request.truck.latitude,

        longitude=request.truck.longitude,

        fuel_consumption_l_per_km=(
            request.truck.fuel_consumption_l_per_km
        )
    )

    # --------------------------------------------------------
    # 8. V2 — Road routing
    # --------------------------------------------------------

    try:

        route = optimize_to_target(
            truck=truck,

            target_node=target,

            traffic_level=traffic_level
        )

    except Exception as error:

        raise HTTPException(
            status_code=502,
            detail=(
                f"Routing service failed: {error}"
            )
        )

    # --------------------------------------------------------
    # 9. Return frontend-ready response
    # --------------------------------------------------------

    return {
        "status": "success",

        "target": {
            "node_id": target.node_id,

            "latitude": target.latitude,

            "longitude": target.longitude,

            "geohash": target.geohash,

            "priority": target.priority_score,

            "report_count": target.report_count,

            "estimated_waste_kg": (
                target.total_estimated_amount
            ),

            "waste_types": target.waste_types
        },

        "truck": {
            "truck_id": truck.truck_id,

            "latitude": truck.latitude,

            "longitude": truck.longitude
        },

        "route": {
            "distance_km": route.distance_km,

            "duration_min": (
                route.estimated_time_min
            ),

            "estimated_fuel_l": (
                route.estimated_fuel_l
            ),

            "route_cost": route.route_cost,

            "traffic": route.traffic_level,

            "geometry": route.route_coordinates
        }
    }