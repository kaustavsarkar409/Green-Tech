from datetime import datetime, timezone

from .models import WasteReport, Truck
from .node_engine import create_collection_nodes
from .priority import prioritize_nodes
from .routing import optimize_to_target

# ============================================================
# TEST DATA
# ============================================================

def create_test_reports() -> list[WasteReport]:
    """
    Simulated waste reports.

    Later, this data will come from the SQL/database module.
    """

    return [

        # ----------------------------------------------------
        # AREA 1
        # ----------------------------------------------------

        WasteReport(
            report_id="R001",
            user_id="U001",
            latitude=12.97160,
            longitude=77.59460,
            timestamp=datetime.now(timezone.utc),
            waste_type="organic",
            estimated_amount=3.0
        ),

        WasteReport(
            report_id="R002",
            user_id="U002",
            latitude=12.97165,
            longitude=77.59465,
            timestamp=datetime.now(timezone.utc),
            waste_type="organic",
            estimated_amount=4.0
        ),

        WasteReport(
            report_id="R003",
            user_id="U003",
            latitude=12.97155,
            longitude=77.59455,
            timestamp=datetime.now(timezone.utc),
            waste_type="recyclable",
            estimated_amount=2.0
        ),

        WasteReport(
            report_id="R004",
            user_id="U004",
            latitude=12.97162,
            longitude=77.59462,
            timestamp=datetime.now(timezone.utc),
            waste_type="organic",
            estimated_amount=5.0
        ),

        # ----------------------------------------------------
        # AREA 2
        # ----------------------------------------------------

        WasteReport(
            report_id="R005",
            user_id="U005",
            latitude=12.97820,
            longitude=77.60110,
            timestamp=datetime.now(timezone.utc),
            waste_type="e_waste",
            estimated_amount=2.0
        ),

        WasteReport(
            report_id="R006",
            user_id="U006",
            latitude=12.97825,
            longitude=77.60115,
            timestamp=datetime.now(timezone.utc),
            waste_type="e_waste",
            estimated_amount=3.0
        ),

        WasteReport(
            report_id="R007",
            user_id="U007",
            latitude=12.97815,
            longitude=77.60105,
            timestamp=datetime.now(timezone.utc),
            waste_type="e_waste",
            estimated_amount=4.0
        ),

        WasteReport(
            report_id="R008",
            user_id="U008",
            latitude=12.97822,
            longitude=77.60112,
            timestamp=datetime.now(timezone.utc),
            waste_type="recyclable",
            estimated_amount=2.0
        ),

        WasteReport(
            report_id="R009",
            user_id="U009",
            latitude=12.97818,
            longitude=77.60108,
            timestamp=datetime.now(timezone.utc),
            waste_type="e_waste",
            estimated_amount=3.0
        ),

        # ----------------------------------------------------
        # AREA 3
        # ----------------------------------------------------

        WasteReport(
            report_id="R010",
            user_id="U010",
            latitude=12.98500,
            longitude=77.61000,
            timestamp=datetime.now(timezone.utc),
            waste_type="recyclable",
            estimated_amount=1.0
        ),

        WasteReport(
            report_id="R011",
            user_id="U011",
            latitude=12.98505,
            longitude=77.61005,
            timestamp=datetime.now(timezone.utc),
            waste_type="recyclable",
            estimated_amount=1.0
        ),
    ]


# ============================================================
# PRINT COLLECTION NODES
# ============================================================

def print_nodes(nodes):
    """
    Display collection nodes in a readable format.
    """

    print("\n" + "=" * 60)
    print("COLLECTION NODES")
    print("=" * 60)

    for node in nodes:

        print(f"\n{node.node_id}")

        print(
            f"  Location: "
            f"{node.latitude:.6f}, "
            f"{node.longitude:.6f}"
        )

        print(
            f"  Geohash: "
            f"{node.geohash}"
        )

        print(
            f"  Reports: "
            f"{node.report_count}"
        )

        print(
            f"  Estimated waste: "
            f"{node.total_estimated_amount:.2f} kg"
        )

        print(
            f"  Waste types: "
            f"{node.waste_types}"
        )

        print(
            f"  Priority: "
            f"{node.priority_score}"
        )


# ============================================================
# MAIN PROGRAM
# ============================================================

def main():

    # ========================================================
    # V1 — GET WASTE REPORTS
    # ========================================================

    reports = create_test_reports()

    print("\n" + "=" * 60)
    print("V1 WASTE REPORT INPUT")
    print("=" * 60)

    print(
        f"Received {len(reports)} waste reports."
    )

    # ========================================================
    # V1 — CREATE COLLECTION NODES
    # ========================================================

    nodes = create_collection_nodes(
        reports
    )

    print(
        f"Created {len(nodes)} collection nodes."
    )

    # ========================================================
    # V1 — PRIORITIZE COLLECTION NODES
    # ========================================================

    ranked_nodes = prioritize_nodes(
        nodes
    )

    # Display V1 result
    print_nodes(
        ranked_nodes
    )

    # ========================================================
    # V1 OUTPUT → V2 INPUT
    # ========================================================

    if not ranked_nodes:

        print(
            "\nNo collection nodes currently "
            "require collection."
        )

        return

    target = ranked_nodes[0]

    print("\n" + "=" * 60)
    print("V1 → V2 TARGET")
    print("=" * 60)

    print(
        f"Node: "
        f"{target.node_id}"
    )

    print(
        f"Location: "
        f"{target.latitude:.6f}, "
        f"{target.longitude:.6f}"
    )

    print(
        f"Priority: "
        f"{target.priority_score}"
    )

    # ========================================================
    # V2 — CREATE TRUCK
    # ========================================================

    truck = Truck(
        truck_id="TRUCK_001",

        # Current truck location
        latitude=12.971600,
        longitude=77.594600,

        # Estimated fuel consumption
        fuel_consumption_l_per_km=0.25
    )

    print("\n" + "=" * 60)
    print("V2 TRUCK")
    print("=" * 60)

    print(
        f"Truck: "
        f"{truck.truck_id}"
    )

    print(
        f"Location: "
        f"{truck.latitude:.6f}, "
        f"{truck.longitude:.6f}"
    )

    # ========================================================
    # V2 — ROAD ROUTING
    # ========================================================

    # Traffic is currently SIMULATED.
    #
    # V2.2 now uses OSRM for:
    #
    #   ✓ Actual road distance
    #   ✓ Actual road duration
    #   ✓ Actual road geometry
    #
    # Traffic itself is still simulated.

    traffic_level = "low"

    print("\n" + "=" * 60)
    print("V2 ROAD ROUTING")
    print("=" * 60)

    print(
        f"Traffic: "
        f"{traffic_level} (simulated)"
    )

    try:

        route = optimize_to_target(
            truck=truck,
            target_node=target,
            traffic_level=traffic_level
        )

    except Exception as error:

        print(
            "\nRouting failed."
        )

        print(
            f"Error: {error}"
        )

        return

    # ========================================================
    # V2 — ROUTE RESULT
    # ========================================================

    print("\n" + "=" * 60)
    print("V2 ROUTE RESULT")
    print("=" * 60)

    print(
        f"Truck: "
        f"{route.truck_id}"
    )

    print(
        f"Target: "
        f"{route.target_node_id}"
    )

    print(
        f"Traffic: "
        f"{route.traffic_level} (simulated)"
    )

    print(
        f"Road distance: "
        f"{route.distance_km} km"
    )

    print(
        f"Road travel time: "
        f"{route.estimated_time_min} minutes"
    )

    print(
        f"Estimated fuel: "
        f"{route.estimated_fuel_l} L"
    )

    print(
        f"Route cost: "
        f"{route.route_cost}"
    )

    # ========================================================
    # V2 — ROUTE GEOMETRY
    # ========================================================

    print("\n" + "=" * 60)
    print("ROAD ROUTE GEOMETRY")
    print("=" * 60)

    print(
        f"Route points: "
        f"{len(route.route_coordinates)}"
    )

    if route.route_coordinates:

        print(
            "\nFirst route point "
            "(longitude, latitude):"
        )

        print(
            route.route_coordinates[0]
        )

        print(
            "\nLast route point "
            "(longitude, latitude):"
        )

        print(
            route.route_coordinates[-1]
        )

    # ========================================================
    # FRONTEND-READY INFORMATION
    # ========================================================

    print("\n" + "=" * 60)
    print("FRONTEND-READY ROUTE")
    print("=" * 60)

    print(
        f"Target latitude: "
        f"{target.latitude}"
    )

    print(
        f"Target longitude: "
        f"{target.longitude}"
    )

    print(
        f"Number of route coordinates: "
        f"{len(route.route_coordinates)}"
    )

    print(
        "\nRoute successfully generated."
    )


# ============================================================
# PROGRAM ENTRY POINT
# ============================================================

if __name__ == "__main__":
    main()