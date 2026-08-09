# Green Tech — Waste Collection Route Optimization Engine

> **Engineering Log / Read Before README**

This document is the main project log for the route-optimization module.

The purpose of this README is not only to describe the finished system. It is also a **development history**.

Each engine version is recorded in sequence:

```text
Project Objective
      ↓
Overall Workflow
      ↓
Project Architecture
      ↓
V1 Engine — completed
      ↓
V1 limitations / observations
      ↓
V2 Engine — development log
      ↓
V2 limitations / observations
      ↓
V3 Engine — future development
      ↓
...
```

When a new engine version is developed, its section should be added **below the previous version** rather than rewriting the history of the project.

---

# 1. Project Objective

The Green Tech module is intended to help optimize municipal waste collection using user-generated waste reports, geographical aggregation, waste priority, and route optimization.

The system is designed around the assumption that widespread IoT-enabled smart bins may not be available.

Instead, users generate waste reports containing location and waste information.

The system converts those reports into meaningful collection nodes and eventually determines efficient routes for garbage trucks.

The long-term objective is:

```text
User Waste Reports
        ↓
Spatial Waste Aggregation
        ↓
Virtual Collection Nodes
        ↓
Priority Calculation
        ↓
Collection Target
        ↓
Route Optimization
        ↓
Traffic / Time / Fuel Optimization
        ↓
Garbage Truck Route
        ↓
Admin / Collector Dashboard
```

---

# 2. Overall Workflow

## Data Flow

```text
                    USER SYSTEM
                         │
                         │ Waste report
                         ▼
                ┌─────────────────┐
                │  Waste Database │
                └────────┬────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │      V1 ENGINE      │
              │                     │
              │ Report Validation   │
              │        ↓            │
              │ Geohash             │
              │        ↓            │
              │ Spatial Grouping    │
              │        ↓            │
              │ Collection Nodes    │
              │        ↓            │
              │ Priority            │
              └──────────┬──────────┘
                         │
                         ▼
               Highest-Priority Node
                         │
                         ▼
              ┌─────────────────────┐
              │      V2 ENGINE      │
              │                     │
              │ Truck Location      │
              │        ↓            │
              │ Route Calculation   │
              │        ↓            │
              │ Time / Fuel / Cost  │
              └──────────┬──────────┘
                         │
                         ▼
                   Route Result
                         │
                         ▼
                 Admin / Map UI
```

---

# 3. Project Architecture

The project is intentionally modular.

```text
Friend's User Module
        │
        ▼
Friend's Vision AI Module
        │
        ▼
Waste Reports
        │
        ▼
Database
        │
        ▼
┌───────────────────────────────┐
│      YOUR ROUTE MODULE        │
│                               │
│  V1 → Collection Intelligence │
│  V2 → Route Cost Engine       │
│  V3 → Road Routing            │
│  V4 → Live Traffic            │
│  V5 → Multi-stop Optimization │
└───────────────────────────────┘
        │
        ▼
Admin / Collector Frontend
```

### Main principle

The route module should **consume data**, not own the user or AI systems.

The AI module determines things such as:

```text
waste_type = "e_waste"
```

The route module uses that information for node aggregation and prioritization.

The frontend should consume the output of the route module rather than depend on its internal implementation.

---

# 4. Current Project Structure

The implementation is intentionally kept small.

```text
waste_router/
│
├── models.py
├── node_engine.py
├── priority.py
├── routing.py
└── main.py
```

### Responsibilities

| File | Responsibility |
|---|---|
| `models.py` | Data structures |
| `node_engine.py` | V1 spatial aggregation |
| `priority.py` | V1 priority calculation |
| `routing.py` | V2 route calculations |
| `main.py` | Testing/orchestration |

As the project grows, files should only be added when the responsibility genuinely requires separation.

---

# 5. Input Data Contract

The route module expects a waste report with approximately:

```python
{
    "report_id": "R001",
    "user_id": "U001",
    "latitude": 12.9716,
    "longitude": 77.5946,
    "timestamp": "...",
    "waste_type": "organic",
    "estimated_amount": 2.5
}
```

### Required information

- `report_id`
- `user_id`
- `latitude`
- `longitude`
- `timestamp`
- `waste_type`

### Optional information

- `estimated_amount`

The current implementation uses Python objects/lists as a database substitute.

Later:

```text
SQL Database
     ↓
Database Adapter
     ↓
WasteReport
     ↓
V1
```

The algorithm should not need to change simply because the source of the data changes.

---

# 6. ENGINE LOG

The sections below are the chronological development record.

---

# V1 ENGINE — SPATIAL COLLECTION NODE ENGINE

**Status: COMPLETED / WORKING**

---

## V1.1 — Objective

The first objective is to convert individual user waste reports into **virtual collection nodes**.

V1 answers:

> **Where are the areas that appear to have enough waste accumulation to require collection?**

The system should not assume that every location has a physical IoT smart bin.

Instead:

```text
Many user reports
        ↓
Nearby geographical area
        ↓
Virtual collection node
```

---

## V1.2 — What We Are Doing

The V1 engine performs:

```text
1. Receive waste reports
2. Validate the reports
3. Convert GPS coordinates to geohashes
4. Group reports by geographical cell
5. Check whether a group qualifies as a collection area
6. Create a virtual collection node
7. Aggregate waste information
8. Calculate node priority
9. Rank collection nodes
10. Select the highest-priority target
```

---

## V1.3 — What We Have Implemented

### Waste report model

Each report contains:

```text
report ID
user ID
latitude
longitude
timestamp
waste type
optional estimated amount
```

### Geohashing

Latitude and longitude are converted into a geohash.

```text
GPS Coordinates
      ↓
Geohash
      ↓
Geographical Cell
```

### Spatial grouping

Reports with the same geohash are grouped.

```text
Geohash A
 ├── Report 1
 ├── Report 2
 ├── Report 3
 └── Report 4
```

### Virtual collection node

A qualifying geographical group becomes:

```text
NODE_001
```

The node stores:

```text
node ID
geohash
representative latitude
representative longitude
report count
total estimated amount
waste type distribution
latest report time
priority score
```

### Priority

Nodes are ranked using the current prototype priority model.

The current factors are:

```text
Estimated amount
Report count
Waste type importance
Recency
```

---

## V1.4 — Technologies / Techniques Used

### Python

Main implementation language.

### Dataclasses

Used to represent:

```text
WasteReport
CollectionNode
```

### Geohash

Used for geographical grouping.

### Python dictionaries

Used for:

```text
waste type counts
configuration
mock input data
```

### Python lists

Used for collections of reports and nodes.

### Weighted priority scoring

Used to rank collection nodes.

---

## V1.5 — How Geohashing Is Being Used

Example:

```text
R001 → ABC123
R002 → ABC123
R003 → ABC123
R004 → XYZ789
```

The system produces:

```text
ABC123
 ├── R001
 ├── R002
 └── R003

XYZ789
 └── R004
```

A qualifying group becomes:

```text
ABC123 → NODE_001
```

This reduces many individual reports into fewer routing targets.

---

## V1.6 — How the Virtual Bin / Node Works

The project does not require the node to represent a physical IoT bin.

The node is a **logical collection point**.

Example:

```text
User A ─┐
User B ─┤
User C ─┼──> Geographical hotspot
User D ─┤
User E ─┘
              ↓
        Collection Node
```

The idea is:

> Concentrated user activity can indicate a location where waste collection should be considered.

---

## V1.7 — Priority Behaviour

The engine produces a ranking:

```text
NODE_002 → 0.91
NODE_001 → 0.78
NODE_004 → 0.62
```

The highest-priority node becomes the current target:

```text
NODE_002
```

V1 therefore ends with:

```text
Waste Reports
      ↓
Collection Nodes
      ↓
Priority Ranking
      ↓
Target Node
```

---

## V1.8 — Output Behaviour

A typical output contains:

```text
Collection nodes created: 2

NODE_002
Location: 12.978200, 77.601100
Reports: 5
Estimated waste: 14 kg
Waste types: e_waste, recyclable
Priority: 0.91

NODE_001
Location: 12.971607, 77.594607
Reports: 4
Estimated waste: 14 kg
Waste types: organic, recyclable
Priority: 0.78

Next collection target:
NODE_002
```

---

## V1.9 — What V1 Is NOT Doing

V1 does not:

```text
❌ Calculate driving routes
❌ Calculate road distance
❌ Use Google Maps
❌ Use live traffic
❌ Estimate fuel
❌ Control trucks
❌ Build a road graph
❌ Use Dijkstra/A*
❌ Perform multi-stop routing
❌ Display a frontend map
```

V1 stops at:

```text
"Which collection node should be handled first?"
```

---

# V1 LIMITATIONS / WEAKNESSES

## L1 — Geohash Boundary Problem

Two nearby reports can fall into different geohash cells.

```text
+-------------+-------------+
| R R R       |       R R   |
| R R         |         R   |
|             |             |
+-------------+-------------+
    Cell A          Cell B
```

The system may treat them as two different groups even though they are part of one real-world hotspot.

### Future improvement

Neighbor-aware spatial clustering.

---

## L2 — Fixed Geohash Precision

The current version uses one geohash precision.

A dense city centre and a sparse area may require different spatial resolutions.

---

## L3 — No Real Fill-Level Sensor

The system does not know:

```text
physical bin = 82% full
```

Instead, it estimates accumulation from user reports.

---

## L4 — Estimated Amount May Be Missing

If estimated quantity is unavailable, report count becomes a proxy.

This is less accurate than actual weight or volume measurements.

---

## L5 — Priority Weights Are Prototype Values

The current priority weights are manually selected.

They are not trained from historical collection data.

---

## L6 — No Prediction

V1 identifies current accumulation.

It does not yet predict:

```text
"this area will probably become a hotspot tomorrow"
```

---

## V1 COMPLETION RECORD

**Status:** Working

**Achieved:**

```text
Waste Reports
     ↓
Geohash
     ↓
Spatial Groups
     ↓
Virtual Collection Nodes
     ↓
Priority
     ↓
Highest-Priority Node
```

**Decision:**

V1 is stable enough to become the input layer for the next engine.

**Next step:**

Move from:

> **Where should the truck go?**

to:

> **How should the truck reach that target?**

---

# V2 ENGINE — ROUTE COST ENGINE

**Status: DEVELOPMENT / NOT YET A FULL ROAD ROUTING ENGINE**

---

## V2.1 — Objective

V2 starts with the target generated by V1.

Input:

```text
Truck location
+
Highest-priority collection node
```

The first V2 objective is to calculate:

```text
Distance
+
Estimated travel time
+
Estimated fuel
+
Route cost
```

The current V2 is **not yet a complete road-routing system**.

---

## V2.2 — What We Are Doing

The current development sequence is:

```text
V1 Target Node
      ↓
Truck Location
      ↓
Haversine Distance
      ↓
Estimated Travel Time
      ↓
Estimated Fuel
      ↓
Route Cost
      ↓
RouteResult
```

---

## V2.3 — First Feature: Truck Model

A truck contains:

```text
truck ID
latitude
longitude
fuel consumption
```

Example:

```python
Truck(
    truck_id="TRUCK_001",
    latitude=12.971600,
    longitude=77.594600,
    fuel_consumption_l_per_km=0.25
)
```

---

## V2.4 — Distance Calculation

The current V2 uses the **Haversine formula**.

Inputs:

```text
Truck latitude
Truck longitude

Target latitude
Target longitude
```

Output:

```text
Approximate geographical distance in kilometres
```

The current system deliberately does not use a road-routing API.

---

## V2.5 — Why Haversine Is Being Used

The purpose is to keep the first routing implementation:

```text
Simple
Predictable
Easy to test
Easy to understand
Independent of external APIs
```

This gives us a baseline before introducing actual road-network data.

---

## V2.6 — Travel Time

The prototype uses an assumed average truck speed.

Example:

```text
BASE_SPEED_KMPH = 30
```

Basic calculation:

```text
time = distance / speed
```

The value is then converted to minutes.

This is a mathematical estimate rather than real truck telemetry.

---

## V2.7 — Traffic Multipliers

Traffic is currently **simulated**, not live.

The routing module contains:

```python
TRAFFIC_TIME_MULTIPLIERS = {
    "low": 1.0,
    "medium": 1.2,
    "high": 1.5
}
```

and:

```python
TRAFFIC_FUEL_MULTIPLIERS = {
    "low": 1.0,
    "medium": 1.15,
    "high": 1.35
}
```

These are placeholders for future traffic information.

For example:

```text
LOW
 ↓
Normal estimate

MEDIUM
 ↓
Higher travel time

HIGH
 ↓
Much higher travel time
```

### Important

The current system does **not** obtain live traffic.

The traffic level is supplied as a simulated input.

---

## V2.8 — Fuel Estimation

Current model:

```text
Fuel
 =
Distance
 ×
Truck Consumption
 ×
Traffic Multiplier
```

Example:

```text
Distance = 10 km
Consumption = 0.25 L/km
Traffic = HIGH
Multiplier = 1.35

Fuel = 3.375 L
```

This is an estimated model.

---

## V2.9 — Route Cost

The current route cost combines:

```text
Distance
Time
Fuel
```

Conceptually:

```text
Route Cost
 =
Distance contribution
+
Time contribution
+
Fuel contribution
```

The current implementation uses configurable weights.

Lower cost is intended to represent a better route.

### Future correction

When multiple candidate routes are introduced, distance/time/fuel should be normalized before combining them because they have different units and scales.

---

# V2.10 — CURRENT IMPORTANT LIMITATION

This is the key limitation of the current V2.

The system currently knows:

```text
Truck
  |
  | Haversine
  v
Target
```

It does **not** know the actual road network.

Therefore it cannot yet determine:

```text
Road A = congested
Road B = free
       ↓
Take Road B
```

It does not currently know:

```text
roads
intersections
one-way streets
road speed
road closures
actual driving distance
specific road traffic
```

Therefore:

> **Current V2 is a point-to-point route-cost estimator, not yet a true road-route optimizer.**

---

# V2.11 — What We Need Next

The next major feature is a **road graph**.

Concept:

```text
        B
       / \
      /   \
     A     D
      \   /
       \ /
        C
```

Where:

```text
Graph node = road intersection / location

Graph edge = road between locations
```

Each edge can eventually contain:

```text
distance
travel time
traffic
fuel cost
```

Then the system can compare:

```text
A → B → D
```

against:

```text
A → C → D
```

---

# V2.12 — Planned Routing Algorithm

After the road graph is available, the planned algorithms are:

### Dijkstra

Find the lowest-cost path through the graph.

### A*

Use a geographical heuristic to guide the search toward the target.

The V2 cost model can eventually become the edge cost.

---

# V2.13 — Planned Live Traffic

Future architecture:

```text
Traffic Source
      ↓
Traffic Data
      ↓
Road Graph
      ↓
Dynamic Edge Cost
      ↓
Dijkstra / A*
      ↓
Best Route
```

The current traffic multipliers are therefore a placeholder layer.

---

# V2.14 — Planned Multi-Stop Routing

Current V2:

```text
Truck → Target
```

Future:

```text
Truck
  ↓
Node A
  ↓
Node C
  ↓
Node B
  ↓
Depot
```

This becomes a multi-stop vehicle-routing problem.

It should be implemented only after point-to-point road routing is stable.

---

# V2 DEVELOPMENT LOG

Use this subsection as a running log while V2 is being developed.

Each update should be added **below the previous log entry**.

---

## V2 LOG — Entry 01

**Date:** 2026-08-09

**Objective:**

Create the first route-cost layer after V1.

**Implemented:**

```text
Truck model
Haversine distance
Estimated travel time
Estimated fuel
Traffic multiplier configuration
Route cost
RouteResult
```

**Current input:**

```text
Truck
+
Highest-priority V1 node
+
Simulated traffic level
```

**Current output:**

```text
Distance
Estimated time
Estimated fuel
Traffic level
Route cost
```

**Traffic status:**

Not live.

Traffic is currently simulated using multipliers.

**Routing status:**

No road network yet.

Haversine is being used as the initial distance model.

**Result:**

The mathematical route-cost layer is established.

**Next task:**

Build a road-network representation so that multiple possible paths can be compared.

---

## V2 LOG — Entry 02

# V2 LOG — Entry 02

**Date:** 09 August 2026  
**Module:** Green Tech — Route Optimization Engine  
**Stage:** V2.2 — Road-Based Routing  
**Status:** ✅ TESTED / WORKING

---

## Objective

Replace the V2.1 Haversine straight-line distance calculation with a real road-network routing system so that the garbage collector receives an actual drivable route between the truck and the highest-priority collection node.

---

## Input

The V2 engine receives:

- Truck location
- V1 highest-priority collection node
- Simulated traffic level

### Example

```text
Truck:
Latitude:  12.971600
Longitude: 77.594600

Target:
Node: NODE_002
Latitude:  12.978200
Longitude: 77.601100

Traffic:
low (simulated)


## V2 LOG — Entry 03

**Date:** __________

**Objective:**

____________________________________________________

**What changed:**

____________________________________________________

**Implementation:**

```text
____________________________________________________
```

**Testing result:**

```text
____________________________________________________
```

**Problems:**

```text
____________________________________________________
```

**Next task:**

```text
____________________________________________________
```

---

# 7. How to Continue This README

Do **not** rewrite previous engine sections when the system improves.

Instead:

```text
V1 ENGINE
    ↓
V1 completion
    ↓
V1 limitations
    ↓
V2 ENGINE
    ↓
V2 LOG Entry 01
    ↓
V2 LOG Entry 02
    ↓
V2 LOG Entry 03
    ↓
V2 completion
    ↓
V2 limitations
    ↓
V3 ENGINE
```

When V2 is completed, add:

```text
# V2 COMPLETION RECORD

Status:
Working / Completed

Achieved:
...

Remaining limitations:
...

Next engine:
V3 — Road Routing / Live Traffic
```

Then begin a new section:

```text
# V3 ENGINE — ROAD ROUTING
```

This preserves the project's engineering history.

---

# 8. Final Version Roadmap

```text
V1
│
├── Waste reports
├── Geohash
├── Spatial grouping
├── Virtual collection nodes
└── Priority
        │
        ▼
V2
│
├── Truck
├── Haversine
├── Travel time
├── Fuel estimation
├── Simulated traffic multipliers
└── Route cost
        │
        ▼
V3
│
├── Road graph
├── Road edges
├── Dijkstra / A*
└── Actual path selection
        │
        ▼
V4
│
├── Live traffic
├── Dynamic edge costs
└── Traffic-aware rerouting
        │
        ▼
V5
│
├── Multiple collection nodes
├── Truck capacity
├── Multi-stop optimization
└── Depot return
        │
        ▼
FINAL INTEGRATION
│
├── SQL database
├── Backend API
├── Admin dashboard
└── Interactive map
```

---

# 9. Engineering Rule

The project follows one core rule:

> **Do not add complexity until the current engine is working and its limitations justify the next engine.**

Therefore:

```text
V1 does not need routing.

V2 does not need a road API.

V3 does not need live traffic until road routing works.

V4 does not need multi-truck optimization until single-truck routing works.

The frontend does not need to know the internal algorithms.
```

Each engine should have:

```text
Objective
    ↓
What we are doing
    ↓
Implementation
    ↓
Technologies
    ↓
Input
    ↓
Output
    ↓
Behaviour
    ↓
Testing
    ↓
Limitations
    ↓
Completion record
    ↓
Next engine
```

This README is therefore both the **documentation and development log** of the route-optimization module.


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
