import {
  Search,
  MapPin,
  Clock3,
  Trash2,
  MoreVertical
} from "lucide-react"

import { useState } from "react"

function Hotspots() {
  const [filter, setFilter] = useState("All")

  const hotspots = [
    {
      id: "HS-017",
      location: "Sector 7 · Lake Road",
      status: "full",
      time: "18 min ago",
      reports: 4
    },
    {
      id: "HS-012",
      location: "Sector 3 · Green Avenue",
      status: "empty",
      time: "32 min ago",
      reports: 1
    },
    {
      id: "HS-024",
      location: "Sector 9 · Industrial Road",
      status: "full",
      time: "41 min ago",
      reports: 6
    },
    {
      id: "HS-008",
      location: "Sector 2 · Park Lane",
      status: "empty",
      time: "55 min ago",
      reports: 0
    },
    {
      id: "HS-031",
      location: "Sector 5 · Market Street",
      status: "full",
      time: "1 hr ago",
      reports: 3
    },
    {
      id: "HS-019",
      location: "Sector 1 · Station Road",
      status: "empty",
      time: "1 hr ago",
      reports: 0
    }
  ]

  const filteredHotspots =
    filter === "All"
      ? hotspots
      : hotspots.filter((item) => item.status === filter.toLowerCase())

  return (
    <div className="hotspots-page">

      {/* HEADER */}

      <div className="hotspots-heading">

        <div>
          <span className="eyebrow">
            MUNICIPAL MONITORING
          </span>

          <h1>
            Garbage Hotspots
          </h1>

          <p>
            Monitor reported garbage locations and their current collection status.
          </p>
        </div>

      </div>


      {/* SUMMARY */}

      <div className="hotspot-summary">

        <div className="hotspot-summary-card">

          <div className="hotspot-summary-icon">
            <Trash2 size={19} />
          </div>

          <div>
            <strong>12</strong>
            <span>Full Locations</span>
          </div>

        </div>


        <div className="hotspot-summary-card">

          <div className="hotspot-summary-icon empty">
            <Trash2 size={19} />
          </div>

          <div>
            <strong>38</strong>
            <span>Empty Locations</span>
          </div>

        </div>


        <div className="hotspot-summary-card">

          <div className="hotspot-summary-icon">
            <MapPin size={19} />
          </div>

          <div>
            <strong>50</strong>
            <span>Monitored Locations</span>
          </div>

        </div>


        <div className="hotspot-summary-card">

          <div className="hotspot-summary-icon">
            <Clock3 size={19} />
          </div>

          <div>
            <strong>18 min</strong>
            <span>Last Update</span>
          </div>

        </div>

      </div>


      {/* TOOLBAR */}

      <div className="hotspot-toolbar">

        <div className="hotspot-search">

          <Search size={16} />

          <input
            type="text"
            placeholder="Search sector or location..."
          />

        </div>


        <div className="hotspot-filters">

          {["All", "Full", "Empty"].map((item) => (

            <button
              key={item}
              className={
                filter === item
                  ? "hotspot-filter active"
                  : "hotspot-filter"
              }
              onClick={() => setFilter(item)}
            >
              {item}
            </button>

          ))}

        </div>

      </div>


      {/* HOTSPOT GRID */}

      <div className="hotspots-grid">

        {filteredHotspots.map((spot) => (

          <div
            className="hotspot-card"
            key={spot.id}
          >

            <div className="hotspot-card-header">

              <div className="hotspot-location-icon">
                <Trash2 size={19} />
              </div>

              <div className="hotspot-title">

                <strong>
                  {spot.id}
                </strong>

                <span>
                  <MapPin size={11} />
                  {spot.location}
                </span>

              </div>

              <button className="hotspot-more">
                <MoreVertical size={16} />
              </button>

            </div>


            {/* STATUS */}

            <div className="hotspot-status-row">

              <div
                className={
                  spot.status === "full"
                    ? "hotspot-status full"
                    : "hotspot-status empty"
                }
              >

                <span className="status-dot"></span>

                {spot.status === "full"
                  ? "FULL"
                  : "EMPTY"}

              </div>

              <span className="hotspot-time">
                <Clock3 size={12} />
                {spot.time}
              </span>

            </div>


            {/* DESCRIPTION */}

            <div className="hotspot-description">

              {spot.status === "full" ? (
                <>
                  Garbage is currently present at this location.
                  Collection may be required.
                </>
              ) : (
                <>
                  No significant garbage reported at this location.
                  Area is currently clear.
                </>
              )}

            </div>


            {/* FOOTER */}

            <div className="hotspot-card-footer">

              <span>
                {spot.reports} citizen reports
              </span>

              <button>
                View location →
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default Hotspots