import math
from datetime import datetime, timezone

from .models import CollectionNode


# ---------------------------------------------------------
# Waste category importance
# ---------------------------------------------------------

WASTE_PRIORITY = {
    "hazardous": 1.0,
    "e_waste": 0.9,
    "organic": 0.7,
    "recyclable": 0.6,
    "general": 0.5
}


# ---------------------------------------------------------
# Calculate priority
# ---------------------------------------------------------

def calculate_priority(
    node: CollectionNode,
    max_reports: int,
    max_amount: float
) -> float:
    """
    Calculate the priority score of a collection node.

    Final score is between approximately 0 and 1.

    Factors:

        35% → estimated waste amount
        30% → report density
        20% → waste type
        15% → recency
    """

    # -----------------------------------------------------
    # 1. Report density
    # -----------------------------------------------------

    if max_reports > 0:

        report_score = (
            node.report_count / max_reports
        )

    else:

        report_score = 0.0

    # -----------------------------------------------------
    # 2. Waste amount
    # -----------------------------------------------------

    if max_amount > 0:

        amount_score = (
            node.total_estimated_amount
            / max_amount
        )

    else:

        # If estimated amount is unavailable for
        # every node, use report count as a proxy.
        amount_score = report_score

    # -----------------------------------------------------
    # 3. Waste type importance
    # -----------------------------------------------------

    if node.waste_types:

        total_reports = sum(
            node.waste_types.values()
        )

        waste_score = 0.0

        for waste_type, count in node.waste_types.items():

            importance = WASTE_PRIORITY.get(
                waste_type.lower(),
                0.5
            )

            percentage = count / total_reports

            waste_score += (
                percentage * importance
            )

    else:

        waste_score = 0.0

    # -----------------------------------------------------
    # 4. Recency
    # -----------------------------------------------------

    if node.latest_report_time:

        timestamp = node.latest_report_time

        # If timestamp has no timezone,
        # assume UTC for this prototype.
        if timestamp.tzinfo is None:

            timestamp = timestamp.replace(
                tzinfo=timezone.utc
            )

        now = datetime.now(timezone.utc)

        age_hours = (
            now - timestamp
        ).total_seconds() / 3600

        # Recent reports get a higher score.
        #
        # At 0 hours → approximately 1
        # After 24 hours → approximately 0.37
        # After many days → approaches 0
        recency_score = math.exp(
            -age_hours / 24
        )

    else:

        recency_score = 0.5

    # -----------------------------------------------------
    # Final weighted score
    # -----------------------------------------------------

    score = (
        0.35 * amount_score +
        0.30 * report_score +
        0.20 * waste_score +
        0.15 * recency_score
    )

    return round(score, 3)


# ---------------------------------------------------------
# Rank collection nodes
# ---------------------------------------------------------

def prioritize_nodes(
    nodes: list[CollectionNode]
) -> list[CollectionNode]:
    """
    Calculate priority for every node and return
    nodes from highest priority to lowest priority.
    """

    if not nodes:
        return []

    # Find maximum report count.
    max_reports = max(
        node.report_count
        for node in nodes
    )

    # Find maximum estimated amount.
    max_amount = max(
        node.total_estimated_amount
        for node in nodes
    )

    # Calculate score for every node.
    for node in nodes:

        node.priority_score = calculate_priority(
            node=node,
            max_reports=max_reports,
            max_amount=max_amount
        )

    # Highest priority first.
    return sorted(
        nodes,
        key=lambda node: node.priority_score,
        reverse=True
    )