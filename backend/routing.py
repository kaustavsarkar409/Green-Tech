import requests

from .models import Truck, CollectionNode, RouteResult


# ============================================================
# OSRM CONFIGURATION
# ============================================================

OSRM_BASE_URL = "https://router.project-osrm.org"


# ============================================================
# TRAFFIC CONFIGURATION
# ============================================================

# These are still simulated traffic multipliers.
# OSRM gives us the road route, distance, and duration,
# but the public OSRM demo server does not provide
# reliable live traffic data.

TRAFFIC_FUEL_MULTIPLIERS = {
    "low": 1.0,
    "medium": 1.15,
    "high": 1.35
}


# ============================================================
# ROUTING CONFIGURATION
# ============================================================

# Average garbage-truck fuel consumption.
#
# Example:
# 0.25 L/km means the truck consumes approximately
# 1 litre every 4 km under normal conditions.
#
# This is a prototype estimate.
DEFAULT_FUEL_CONSUMPTION_L_PER_KM = 0.25


# ============================================================
# ROAD ROUTING
# ============================================================

def get_road_route(
    start_lat: float,
    start_lon: float,
    target_lat: float,
    target_lon: float
):
    """
    Get an actual road-based route from OSRM.

    Parameters
    ----------
    start_lat : float
        Starting latitude.

    start_lon : float
        Starting longitude.

    target_lat : float
        Destination latitude.

    target_lon : float
        Destination longitude.

    Returns
    -------
    tuple
        (
            distance_km,
            duration_min,
            route_coordinates
        )

    Notes
    -----
    OSRM expects coordinates in:

        longitude,latitude

    NOT:

        latitude,longitude
    """

    # --------------------------------------------------------
    # 1. Validate coordinates
    # --------------------------------------------------------

    if not (-90 <= start_lat <= 90):
        raise ValueError(
            "Invalid starting latitude."
        )

    if not (-180 <= start_lon <= 180):
        raise ValueError(
            "Invalid starting longitude."
        )

    if not (-90 <= target_lat <= 90):
        raise ValueError(
            "Invalid target latitude."
        )

    if not (-180 <= target_lon <= 180):
        raise ValueError(
            "Invalid target longitude."
        )

    # --------------------------------------------------------
    # 2. Build OSRM coordinate string
    # --------------------------------------------------------
    #
    # IMPORTANT:
    #
    # OSRM format:
    #
    # longitude,latitude
    #
    # Example:
    #
    # 77.5946,12.9716
    #
    # --------------------------------------------------------

    coordinates = (
        f"{start_lon},{start_lat};"
        f"{target_lon},{target_lat}"
    )

    # --------------------------------------------------------
    # 3. Build request URL
    # --------------------------------------------------------

    url = (
        f"{OSRM_BASE_URL}/route/v1/driving/"
        f"{coordinates}"
    )

    # --------------------------------------------------------
    # 4. Request full route geometry
    # --------------------------------------------------------

    params = {
        "overview": "full",
        "geometries": "geojson"
    }

    try:

        response = requests.get(
            url,
            params=params,
            timeout=10
        )

        response.raise_for_status()

    except requests.RequestException as error:

        raise RuntimeError(
            f"OSRM routing request failed: {error}"
        ) from error

    # --------------------------------------------------------
    # 5. Convert response to JSON
    # --------------------------------------------------------

    try:

        data = response.json()

    except ValueError as error:

        raise RuntimeError(
            "OSRM returned an invalid JSON response."
        ) from error

    # --------------------------------------------------------
    # 6. Check OSRM response status
    # --------------------------------------------------------

    if data.get("code") != "Ok":

        raise RuntimeError(
            f"OSRM routing failed: "
            f"{data.get('code', 'Unknown error')}"
        )

    # --------------------------------------------------------
    # 7. Check that a route exists
    # --------------------------------------------------------

    routes = data.get("routes", [])

    if not routes:

        raise RuntimeError(
            "OSRM did not return any route."
        )

    # --------------------------------------------------------
    # 8. Get the best route
    # --------------------------------------------------------

    route = routes[0]

    # --------------------------------------------------------
    # 9. Extract road distance
    # --------------------------------------------------------
    #
    # OSRM returns distance in metres.
    #
    # Convert:
    #
    # metres → kilometres
    #
    # --------------------------------------------------------

    distance_km = route["distance"] / 1000.0

    # --------------------------------------------------------
    # 10. Extract road travel duration
    # --------------------------------------------------------
    #
    # OSRM returns duration in seconds.
    #
    # Convert:
    #
    # seconds → minutes
    #
    # --------------------------------------------------------

    duration_min = route["duration"] / 60.0

    # --------------------------------------------------------
    # 11. Extract route geometry
    # --------------------------------------------------------
    #
    # GeoJSON coordinates are:
    #
    # [longitude, latitude]
    #
    # These coordinates can later be sent directly
    # to the frontend for drawing the route.
    #
    # --------------------------------------------------------

    geometry = route.get("geometry", {})

    route_coordinates = geometry.get(
        "coordinates",
        []
    )

    if not route_coordinates:

        raise RuntimeError(
            "OSRM returned no route geometry."
        )

    # --------------------------------------------------------
    # 12. Return route information
    # --------------------------------------------------------

    return (
        distance_km,
        duration_min,
        route_coordinates
    )


# ============================================================
# FUEL ESTIMATION
# ============================================================

def estimate_fuel(
    distance_km: float,
    truck: Truck,
    traffic_level: str
) -> float:
    """
    Estimate fuel consumed for the road route.

    Traffic is currently simulated using a multiplier.

    Parameters
    ----------
    distance_km : float
        Actual road distance.

    truck : Truck
        Truck information.

    traffic_level : str
        low / medium / high

    Returns
    -------
    float
        Estimated fuel consumption in litres.
    """

    traffic_level = traffic_level.lower()

    multiplier = TRAFFIC_FUEL_MULTIPLIERS.get(
        traffic_level,
        1.0
    )

    # Use truck-specific consumption if available.
    fuel_consumption = getattr(
        truck,
        "fuel_consumption_l_per_km",
        DEFAULT_FUEL_CONSUMPTION_L_PER_KM
    )

    fuel = (
        distance_km
        * fuel_consumption
        * multiplier
    )

    return fuel


# ============================================================
# ROUTE COST
# ============================================================

def calculate_route_cost(
    distance_km: float,
    time_min: float,
    fuel_l: float
) -> float:
    """
    Calculate a simple route cost.

    Lower cost = better route.

    These are prototype weights.

    NOTE:
    Distance, time, and fuel have different units,
    so this is a simple prototype cost rather than
    a mathematically normalized optimization function.
    """

    distance_weight = 0.30
    time_weight = 0.40
    fuel_weight = 0.30

    cost = (
        distance_weight * distance_km
        +
        time_weight * time_min
        +
        fuel_weight * fuel_l
    )

    return round(cost, 3)


# ============================================================
# MAIN V2 ROUTING FUNCTION
# ============================================================

def optimize_to_target(
    truck: Truck,
    target_node: CollectionNode,
    traffic_level: str = "low"
) -> RouteResult:
    """
    Calculate an actual road route from the truck's
    current position to one target collection node.

    V2.2:

        Truck
          ↓
        OSRM
          ↓
        Road distance
        Road duration
        Route geometry
          ↓
        Fuel estimation
          ↓
        Route cost
          ↓
        RouteResult

    Currently handles one target node.

    Multi-stop optimization will be implemented later.
    """

    # --------------------------------------------------------
    # 1. Get actual road route
    # --------------------------------------------------------

    (
        distance_km,
        road_time_min,
        route_coordinates
    ) = get_road_route(
        start_lat=truck.latitude,
        start_lon=truck.longitude,
        target_lat=target_node.latitude,
        target_lon=target_node.longitude
    )

    # --------------------------------------------------------
    # 2. Estimate fuel
    # --------------------------------------------------------

    fuel_l = estimate_fuel(
        distance_km=distance_km,
        truck=truck,
        traffic_level=traffic_level
    )

    # --------------------------------------------------------
    # 3. Calculate route cost
    # --------------------------------------------------------

    route_cost = calculate_route_cost(
        distance_km=distance_km,
        time_min=road_time_min,
        fuel_l=fuel_l
    )

    # --------------------------------------------------------
    # 4. Return structured result
    # --------------------------------------------------------

    return RouteResult(
        truck_id=truck.truck_id,

        target_node_id=target_node.node_id,

        distance_km=round(
            distance_km,
            3
        ),

        estimated_time_min=round(
            road_time_min,
            2
        ),

        estimated_fuel_l=round(
            fuel_l,
            3
        ),

        traffic_level=traffic_level,

        route_cost=route_cost,

        route_coordinates=route_coordinates
    )