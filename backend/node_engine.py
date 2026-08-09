from collections import defaultdict

import geohash2

from .models import WasteReport, CollectionNode

# ---------------------------------------------------------
# Configuration
# ---------------------------------------------------------

# Minimum number of reports required for an area
# to become a collection node.
MIN_REPORTS_FOR_NODE = 3

# Geohash precision controls the size of the
# geographical cell.
#
# Higher precision → smaller cells.
# Lower precision → larger cells.
GEOHASH_PRECISION = 7


# ---------------------------------------------------------
# Validation
# ---------------------------------------------------------

def validate_report(report: WasteReport) -> bool:
    """
    Check whether a waste report contains valid data.

    Returns:
        True  -> valid report
        False -> invalid report
    """

    # Check latitude.
    if not -90 <= report.latitude <= 90:
        return False

    # Check longitude.
    if not -180 <= report.longitude <= 180:
        return False

    # Report ID is required.
    if not report.report_id:
        return False

    # Waste type is required.
    if not report.waste_type:
        return False

    # Estimated amount, if provided, cannot be negative.
    if report.estimated_amount is not None:
        if report.estimated_amount < 0:
            return False

    return True


# ---------------------------------------------------------
# Geohash
# ---------------------------------------------------------

def get_geohash(report: WasteReport) -> str:
    """
    Convert latitude and longitude into a geohash.
    """

    return geohash2.encode(
        report.latitude,
        report.longitude,
        precision=GEOHASH_PRECISION
    )


# ---------------------------------------------------------
# Group reports
# ---------------------------------------------------------

def group_reports_by_geohash(
    reports: list[WasteReport]
) -> dict[str, list[WasteReport]]:
    """
    Group valid waste reports according to their geohash.

    Example:

        {
            "tdr1234": [report1, report2, report3],
            "tdr5678": [report4, report5]
        }
    """

    groups = defaultdict(list)

    for report in reports:

        # Ignore invalid reports.
        if not validate_report(report):
            continue

        geohash = get_geohash(report)

        groups[geohash].append(report)

    return dict(groups)


# ---------------------------------------------------------
# Create collection nodes
# ---------------------------------------------------------

def create_collection_nodes(
    reports: list[WasteReport]
) -> list[CollectionNode]:
    """
    Convert groups of nearby waste reports into
    virtual collection nodes.
    """

    grouped_reports = group_reports_by_geohash(reports)

    nodes = []

    node_number = 1

    for geohash, group in grouped_reports.items():

        # A single report does not automatically create
        # a collection node.
        if len(group) < MIN_REPORTS_FOR_NODE:
            continue

        # -------------------------------------------------
        # Calculate representative location
        # -------------------------------------------------

        latitude = sum(
            report.latitude
            for report in group
        ) / len(group)

        longitude = sum(
            report.longitude
            for report in group
        ) / len(group)

        # -------------------------------------------------
        # Count waste categories
        # -------------------------------------------------

        waste_types = defaultdict(int)

        for report in group:
            waste_types[
                report.waste_type.lower()
            ] += 1

        # -------------------------------------------------
        # Calculate total estimated waste
        # -------------------------------------------------

        total_amount = sum(
            report.estimated_amount or 0
            for report in group
        )

        # -------------------------------------------------
        # Find latest report
        # -------------------------------------------------

        latest_report_time = max(
            report.timestamp
            for report in group
        )

        # -------------------------------------------------
        # Create node
        # -------------------------------------------------

        node = CollectionNode(
            node_id=f"NODE_{node_number:03d}",

            geohash=geohash,

            latitude=latitude,
            longitude=longitude,

            report_count=len(group),

            total_estimated_amount=total_amount,

            waste_types=dict(waste_types),

            latest_report_time=latest_report_time
        )

        nodes.append(node)

        node_number += 1

    return nodes