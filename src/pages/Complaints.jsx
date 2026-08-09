import {
  Search,
  MapPin,
  Clock3,
  AlertTriangle,
  CheckCircle2,
  Truck,
  Camera,
  ChevronRight,
  MessageSquareWarning
} from "lucide-react"

import { useState } from "react"

import "./Complaints.css"

function Complaints() {

  const [filter, setFilter] = useState("All")

  const complaints = [
    {
      id: "CMP-1042",
      title: "Overflowing Garbage Bin",
      location: "Sector 7 · Lake Road",
      time: "18 min ago",
      priority: "High",
      status: "Open",
      description:
        "Community bin has been overflowing since this morning.",
      reports: 4
    },
    {
      id: "CMP-1039",
      title: "Missed Waste Collection",
      location: "Sector 3 · Green Avenue",
      time: "42 min ago",
      priority: "Medium",
      status: "Assigned",
      description:
        "Scheduled collection vehicle did not arrive today.",
      reports: 2
    },
    {
      id: "CMP-1035",
      title: "Illegal Waste Dumping",
      location: "Sector 9 · Industrial Road",
      time: "1 hr ago",
      priority: "High",
      status: "In Progress",
      description:
        "Construction waste has been dumped beside the road.",
      reports: 6
    },
    {
      id: "CMP-1031",
      title: "Waste on Roadside",
      location: "Sector 5 · Market Street",
      time: "2 hrs ago",
      priority: "Low",
      status: "Resolved",
      description:
        "Mixed waste was reported near the market entrance.",
      reports: 1
    },
    {
      id: "CMP-1028",
      title: "Recycling Collection Issue",
      location: "Sector 2 · Park Lane",
      time: "3 hrs ago",
      priority: "Medium",
      status: "Assigned",
      description:
        "Recyclable material was not collected during the scheduled round.",
      reports: 3
    }
  ]

  const filtered =
    filter === "All"
      ? complaints
      : complaints.filter((item) => item.status === filter)

  return (
    <div className="complaints-page">

      {/* HEADER */}

      <div className="complaints-heading">

        <div>
          <span className="complaints-eyebrow">
            MUNICIPAL RESPONSE CENTER
          </span>

          <h1>
            Citizen Complaints
          </h1>

          <p>
            Review public waste complaints, assign response teams and track
            issues until they are resolved.
          </p>
        </div>

        <div className="complaints-date">
          Today
        </div>

      </div>


      {/* SUMMARY */}

      <div className="complaint-summary">

        <div className="complaint-stat">
          <span>OPEN</span>
          <strong>24</strong>
          <small>Needs attention</small>
        </div>

        <div className="complaint-stat urgent">
          <span>URGENT</span>
          <strong>8</strong>
          <small>High priority</small>
        </div>

        <div className="complaint-stat">
          <span>ASSIGNED</span>
          <strong>13</strong>
          <small>Teams responding</small>
        </div>

        <div className="complaint-stat success">
          <span>RESOLVED</span>
          <strong>61</strong>
          <small>This month</small>
        </div>

      </div>


      {/* TOOLBAR */}

      <div className="complaints-toolbar">

        <div className="complaint-search">
          <Search size={16} />

          <input
            placeholder="Search complaint, location or ID..."
          />
        </div>

        <div className="complaint-filters">

          {[
            "All",
            "Open",
            "Assigned",
            "In Progress",
            "Resolved"
          ].map((item) => (

            <button
              key={item}
              className={
                filter === item
                  ? "complaint-filter active"
                  : "complaint-filter"
              }
              onClick={() => setFilter(item)}
            >
              {item}
            </button>

          ))}

        </div>

      </div>


      {/* CONTENT */}

      <div className="complaints-layout">

        {/* LIST */}

        <section className="complaints-list">

          <div className="complaints-list-header">

            <div>
              <h2>
                Incoming Reports
              </h2>

              <span>
                {filtered.length} shown
              </span>
            </div>

            <button className="sort-button">
              Latest
            </button>

          </div>


          {filtered.map((complaint) => (

            <div
              className="complaint-card"
              key={complaint.id}
            >

              <div className="complaint-card-top">

                <div
                  className={`complaint-type-icon ${complaint.priority.toLowerCase()}`}
                >
                  {complaint.priority === "High" ? (
                    <AlertTriangle size={18} />
                  ) : (
                    <MessageSquareWarning size={18} />
                  )}
                </div>

                <div className="complaint-title">

                  <div>
                    <h3>
                      {complaint.title}
                    </h3>

                    <span>
                      {complaint.id}
                    </span>
                  </div>

                  <div
                    className={`priority-badge ${complaint.priority.toLowerCase()}`}
                  >
                    {complaint.priority}
                  </div>

                </div>

              </div>


              <p className="complaint-description">
                {complaint.description}
              </p>


              <div className="complaint-meta">

                <span>
                  <MapPin size={13} />
                  {complaint.location}
                </span>

                <span>
                  <Clock3 size={13} />
                  {complaint.time}
                </span>

                <span>
                  <Camera size={13} />
                  {complaint.reports} reports
                </span>

              </div>


              <div className="complaint-card-footer">

                <div className={`status ${complaint.status
                  .toLowerCase()
                  .replace(" ", "-")}`}
                >

                  {complaint.status === "Resolved" ? (
                    <CheckCircle2 size={14} />
                  ) : complaint.status === "In Progress" ? (
                    <Truck size={14} />
                  ) : (
                    <Clock3 size={14} />
                  )}

                  {complaint.status}

                </div>

                <button className="view-complaint">
                  View Complaint
                  <ChevronRight size={14} />
                </button>

              </div>

            </div>

          ))}

        </section>


        {/* RIGHT PANEL */}

        <aside className="complaints-side">

          <div className="response-panel">

            <div className="response-icon">
              <Truck size={20} />
            </div>

            <h3>
              Response Performance
            </h3>

            <p>
              How quickly municipal teams are handling citizen reports.
            </p>


            <div className="performance">

              <div>
                <span>Average response</span>
                <strong>42 min</strong>
              </div>

              <div>
                <span>Resolution rate</span>
                <strong>91%</strong>
              </div>

              <div>
                <span>Within SLA</span>
                <strong>87%</strong>
              </div>

            </div>

          </div>


          <div className="hotspot-panel">

            <div className="hotspot-heading">

              <div>
                <span>
                  MOST REPORTED
                </span>

                <h3>
                  Problem Areas
                </h3>
              </div>

              <MapPin size={18} />

            </div>


            <div className="problem-area">

              <div>
                <strong>
                  Sector 7
                </strong>

                <span>
                  14 complaints
                </span>
              </div>

              <b>
                High
              </b>

            </div>


            <div className="problem-area">

              <div>
                <strong>
                  Sector 9
                </strong>

                <span>
                  11 complaints
                </span>
              </div>

              <b>
                High
              </b>

            </div>


            <div className="problem-area">

              <div>
                <strong>
                  Sector 3
                </strong>

                <span>
                  8 complaints
                </span>
              </div>

              <b className="medium">
                Medium
              </b>

            </div>

          </div>

        </aside>

      </div>

    </div>
  )
}

export default Complaints