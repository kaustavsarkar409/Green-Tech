from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional


@dataclass
class WasteReport:
    """
    Represents one waste report received from the user system.

    In the final system, these values can come from an SQL database.
    For development, they can be created as Python objects.
    """

    report_id: str
    user_id: str

    latitude: float
    longitude: float

    timestamp: datetime

    waste_type: str

    # Optional because the friend's system may not
    # always be able to estimate the amount of waste.
    estimated_amount: Optional[float] = None


@dataclass
class CollectionNode:
    """
    Represents a virtual waste collection point.

    A CollectionNode is created by grouping multiple
    nearby WasteReports.
    """

    node_id: str

    # Geographical cell containing the reports.
    geohash: str

    # Representative location of the collection node.
    latitude: float
    longitude: float

    # Number of reports contributing to this node.
    report_count: int

    # Sum of estimated waste from all reports.
    total_estimated_amount: float

    # Example:
    # {
    #     "organic": 5,
    #     "e_waste": 2
    # }
    waste_types: dict[str, int] = field(default_factory=dict)

    # Most recent report contributing to this node.
    latest_report_time: Optional[datetime] = None

    # Calculated later by priority.py.
    priority_score: float = 0.0


@dataclass
class Truck:
    truck_id: str

    latitude: float
    longitude: float

    fuel_consumption_l_per_km: float = 0.25

@dataclass
class RouteResult:
    truck_id: str
    target_node_id: str
    distance_km: float
    estimated_time_min: float
    estimated_fuel_l: float
    traffic_level: str
    route_cost: float
    route_coordinates: list[list[float]]

