import {
  MapPin,
  Camera,
  AlertTriangle,
  Clock,
  Eye,
  Navigation
} from "lucide-react"

const hotspots = [
  {
    location: "Sector 5 — Market Road",
    level: "High",
    reports: 18,
    lastSeen: "Today, 2:15 PM",
    type: "Mixed waste",
    note: "Repeated dumping near roadside"
  },
  {
    location: "Sector 7 — Bus Stand",
    level: "Moderate",
    reports: 11,
    lastSeen: "Today, 11:40 AM",
    type: "Plastic waste",
    note: "Waste accumulating around entrance"
  },
  {
    location: "Sector 2 — Park Entrance",
    level: "Low",
    reports: 5,
    lastSeen: "Yesterday, 5:20 PM",
    type: "General waste",
    note: "Occasional dumping reported"
  },
  {
    location: "Sector 8 — Service Lane",
    level: "Moderate",
    reports: 9,
    lastSeen: "Yesterday, 3:10 PM",
    type: "Construction waste",
    note: "Debris observed along service road"
  }
]

function getLevelClass(level) {
  if (level === "High") return "critical"
  if (level === "Moderate") return "warning"
  return "normal"
}

function Hotspots() {
  return (
    <div>

      {/* HEADER */}

      <div className="page-heading">

        <div>
          <span className="eyebrow">
            AREA MONITORING
          </span>

          <h1>
            Garbage Hotspots
          </h1>

          <p>
            Identify locations where waste repeatedly accumulates
            and prioritize field action.
          </p>
        </div>

        <button className="primary-button">
          <Camera size={17} />
          Report Hotspot
        </button>

      </div>


      {/* SUMMARY */}

      <div className="bin-summary">

        <div className="bin-summary-card">

          <div className="summary-icon red">
            <AlertTriangle size={19} />
          </div>

          <div>
            <strong>1</strong>
            <span>High Priority</span>
          </div>

        </div>


        <div className="bin-summary-card">

          <div className="summary-icon orange">
            <MapPin size={19} />
          </div>

          <div>
            <strong>2</strong>
            <span>Moderate</span>
          </div>

        </div>


        <div className="bin-summary-card">

          <div className="summary-icon green">
            <Eye size={19} />
          </div>

          <div>
            <strong>1</strong>
            <span>Low Activity</span>
          </div>

        </div>


        <div className="bin-summary-card">

          <div className="summary-icon blue">
            <Navigation size={19} />
          </div>

          <div>
            <strong>4</strong>
            <span>Areas Monitored</span>
          </div>

        </div>

      </div>


      {/* MAP-STYLE AREA */}

      <div
        style={{
          height: "280px",
          borderRadius: "14px",
          marginBottom: "24px",
          position: "relative",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, #eef3ef 25%, #e3e9e5 25%, #e3e9e5 50%, #eef3ef 50%, #eef3ef 75%, #e3e9e5 75%)",
          backgroundSize: "80px 80px",
          border: "1px solid #dfe5e1"
        }}
      >

        {/* Road lines */}

        <div
          style={{
            position: "absolute",
            left: "15%",
            top: "-20%",
            width: "12px",
            height: "150%",
            background: "#ffffff",
            transform: "rotate(28deg)"
          }}
        />

        <div
          style={{
            position: "absolute",
            left: "55%",
            top: "-20%",
            width: "12px",
            height: "150%",
            background: "#ffffff",
            transform: "rotate(-35deg)"
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "45%",
            left: "-10%",
            width: "120%",
            height: "12px",
            background: "#ffffff",
            transform: "rotate(-8deg)"
          }}
        />


        {/* Hotspot markers */}

        {hotspots.map((spot, index) => {

          const positions = [
            { left: "25%", top: "38%" },
            { left: "63%", top: "30%" },
            { left: "42%", top: "70%" },
            { left: "78%", top: "68%" }
          ]

          return (
            <div
              key={spot.location}
              style={{
                position: "absolute",
                ...positions[index],
                transform: "translate(-50%, -50%)"
              }}
            >

              <div
                className={`bin-card-icon ${getLevelClass(
                  spot.level
                )}`}
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 3px 10px rgba(0,0,0,0.15)"
                }}
              >
                <MapPin size={21} />
              </div>

            </div>
          )
        })}


        <div
          style={{
            position: "absolute",
            left: "18px",
            bottom: "15px",
            background: "white",
            padding: "10px 14px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}
        >
          <strong>
            Hotspot monitoring area
          </strong>

          <div style={{ fontSize: "12px", marginTop: "3px" }}>
            4 locations currently tracked
          </div>
        </div>

      </div>


      {/* HOTSPOT LIST */}

      <div className="bins-grid">

        {hotspots.map((spot) => {

          const levelClass = getLevelClass(spot.level)

          return (
            <div
              className="bin-card"
              key={spot.location}
            >

              <div className="bin-card-header">

                <div
                  className={`bin-card-icon ${levelClass}`}
                >
                  <MapPin size={20} />
                </div>

                <div className="bin-card-title">

                  <strong>
                    {spot.location}
                  </strong>

                  <span>
                    <Clock size={11} />
                    {spot.lastSeen}
                  </span>

                </div>

              </div>


              <div className="fill-section">

                <div className="fill-header">

                  <span>
                    Activity Level
                  </span>

                  <strong
                    className={`${levelClass}-text`}
                  >
                    {spot.level}
                  </strong>

                </div>


                <div className="large-progress">

                  <div
                    className={`large-progress-fill ${levelClass}`}
                    style={{
                      width:
                        spot.level === "High"
                          ? "90%"
                          : spot.level === "Moderate"
                          ? "60%"
                          : "30%"
                    }}
                  />

                </div>


                <span className="capacity-text">
                  {spot.note}
                </span>

              </div>


              <div className="bin-card-footer">

                <div>

                  <span>
                    Waste Type
                  </span>

                  <strong>
                    {spot.type}
                  </strong>

                </div>


                <div>

                  <span>
                    Reports
                  </span>

                  <strong>
                    {spot.reports}
                  </strong>

                </div>

              </div>


              <button className="bin-details-button">
                View hotspot details
              </button>

            </div>
          )

        })}

      </div>

    </div>
  )
}

export default Hotspots