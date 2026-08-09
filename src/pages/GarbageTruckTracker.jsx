import {
  Truck,
  MapPin,
  Clock3,
  Navigation,
  CheckCircle2,
  PauseCircle,
  Radio,
  ChevronRight
} from "lucide-react"

const trucks = [
  {
    id: "CW-017",
    driver: "Collection Team 07",
    area: "Sector 7 → Sector 8",
    completed: 8,
    total: 12,
    next: "BIN-A17",
    status: "On Route",
    x: "27%",
    y: "38%"
  },
  {
    id: "CW-023",
    driver: "Collection Team 03",
    area: "Sector 3 → Sector 4",
    completed: 5,
    total: 9,
    next: "BIN-B03",
    status: "On Route",
    x: "55%",
    y: "47%"
  },
  {
    id: "CW-011",
    driver: "Collection Team 11",
    area: "Sector 1 → Sector 2",
    completed: 11,
    total: 11,
    next: "Route Complete",
    status: "Completed",
    x: "71%",
    y: "67%"
  },
  {
    id: "CW-029",
    driver: "Collection Team 05",
    area: "Sector 5",
    completed: 3,
    total: 10,
    next: "BIN-D09",
    status: "Idle",
    x: "43%",
    y: "70%"
  }
]

function GarbageTruckTracker() {
  return (
    <div className="truck-tracker-page">

      <div className="truck-tracker-heading">
        <div>
          <span className="truck-eyebrow">
            MUNICIPAL FLEET MONITORING
          </span>

          <h1>
            Garbage Truck Tracker
          </h1>

          <p>
            Monitor municipal collection vehicles and their active routes
            across the city.
          </p>
        </div>

        <div className="live-indicator">
          <span />
          LIVE
        </div>
      </div>


      {/* SUMMARY */}

      <div className="truck-summary">

        <div className="truck-summary-card">
          <div className="truck-summary-icon">
            <Truck size={18} />
          </div>

          <div>
            <strong>13</strong>
            <span>Total Trucks</span>
          </div>
        </div>


        <div className="truck-summary-card">
          <div className="truck-summary-icon">
            <Navigation size={18} />
          </div>

          <div>
            <strong>8</strong>
            <span>On Route</span>
          </div>
        </div>


        <div className="truck-summary-card">
          <div className="truck-summary-icon idle">
            <PauseCircle size={18} />
          </div>

          <div>
            <strong>3</strong>
            <span>Idle</span>
          </div>
        </div>


        <div className="truck-summary-card">
          <div className="truck-summary-icon completed">
            <CheckCircle2 size={18} />
          </div>

          <div>
            <strong>2</strong>
            <span>Completed</span>
          </div>
        </div>

      </div>


      {/* MAP + TRUCK LIST */}

      <div className="truck-tracker-grid">

        <section className="truck-map-panel">

          <div className="truck-panel-heading">

            <div>
              <h2>
                Live Fleet Map
              </h2>

              <span>
                Current municipal collection vehicles
              </span>
            </div>

            <Radio size={18} />

          </div>


          <div className="truck-map">

            {/* roads */}

            <div className="truck-road road-a" />
            <div className="truck-road road-b" />
            <div className="truck-road road-c" />
            <div className="truck-road road-d" />


            {/* area labels */}

            <span className="truck-area area-a">
              Sector 7
            </span>

            <span className="truck-area area-b">
              Sector 3
            </span>

            <span className="truck-area area-c">
              Sector 5
            </span>

            <span className="truck-area area-d">
              Sector 8
            </span>


            {/* truck markers */}

            {trucks.map((truck) => (

              <div
                key={truck.id}
                className={
                  truck.status === "Completed"
                    ? "truck-marker completed"
                    : truck.status === "Idle"
                    ? "truck-marker idle"
                    : "truck-marker"
                }
                style={{
                  left: truck.x,
                  top: truck.y
                }}
                title={truck.id}
              >
                <Truck size={15} />
              </div>

            ))}


            <div className="truck-map-legend">

              <span>
                <i className="legend-active" />
                On route
              </span>

              <span>
                <i className="legend-idle" />
                Idle
              </span>

              <span>
                <i className="legend-completed" />
                Completed
              </span>

            </div>

          </div>

        </section>


        {/* ACTIVE TRUCKS */}

        <section className="truck-list-panel">

          <div className="truck-panel-heading">

            <div>
              <h2>
                Active Trucks
              </h2>

              <span>
                Fleet status
              </span>
            </div>

            <Truck size={18} />

          </div>


          <div className="truck-list">

            {trucks.map((truck) => {

              const percentage =
                Math.round(
                  (truck.completed / truck.total) * 100
                )

              return (

                <div
                  className="truck-list-item"
                  key={truck.id}
                >

                  <div
                    className={
                      truck.status === "Completed"
                        ? "truck-list-icon completed"
                        : truck.status === "Idle"
                        ? "truck-list-icon idle"
                        : "truck-list-icon"
                    }
                  >
                    <Truck size={16} />
                  </div>


                  <div className="truck-list-info">

                    <div className="truck-list-title">

                      <strong>
                        {truck.id}
                      </strong>

                      <span
                        className={
                          truck.status === "Completed"
                            ? "truck-status completed"
                            : truck.status === "Idle"
                            ? "truck-status idle"
                            : "truck-status"
                        }
                      >
                        {truck.status}
                      </span>

                    </div>

                    <span>
                      {truck.area}
                    </span>


                    <div className="truck-progress">

                      <div>
                        <span
                          style={{
                            width: `${percentage}%`
                          }}
                        />
                      </div>

                      <small>
                        {truck.completed}/{truck.total} stops
                      </small>

                    </div>

                  </div>


                  <button className="truck-arrow">
                    <ChevronRight size={15} />
                  </button>

                </div>

              )
            })}

          </div>

        </section>

      </div>


      {/* DETAILS */}

      <section className="truck-details-panel">

        <div className="truck-panel-heading">

          <div>
            <h2>
              Fleet Overview
            </h2>

            <span>
              Current route progress and next collection points
            </span>
          </div>

        </div>


        <div className="truck-table">

          <div className="truck-table-head">
            <span>Truck</span>
            <span>Driver / Team</span>
            <span>Current Route</span>
            <span>Next Pickup</span>
            <span>Last Update</span>
          </div>


          {trucks.map((truck) => (

            <div
              className="truck-table-row"
              key={truck.id}
            >

              <strong>
                {truck.id}
              </strong>

              <span>
                {truck.driver}
              </span>

              <span>
                {truck.area}
              </span>

              <span className="next-pickup">
                <MapPin size={12} />
                {truck.next}
              </span>

              <span className="last-update">
                <Clock3 size={12} />
                2 min ago
              </span>

            </div>

          ))}

        </div>

      </section>


      <style>{truckTrackerStyles}</style>

    </div>
  )
}


const truckTrackerStyles = `

.truck-tracker-page {
  max-width: 1180px;
  margin: 0 auto;
  padding: 8px 0 40px;
}

.truck-tracker-heading {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 19px;
}

.truck-eyebrow {
  color: #08765c;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: .08em;
}

.truck-tracker-heading h1 {
  margin: 5px 0 7px;
  color: #063d33;
  font-size: 29px;
  letter-spacing: -.03em;
}

.truck-tracker-heading p {
  margin: 0;
  color: #71807b;
  font-size: 10px;
}

.live-indicator {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 10px;
  border: 1px solid #cfe5dd;
  border-radius: 7px;
  background: #f2faf7;
  color: #08765c;
  font-size: 8px;
  font-weight: 800;
}

.live-indicator span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #08765c;
}


/* SUMMARY */

.truck-summary {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 11px;
  margin-bottom: 14px;
}

.truck-summary-card {
  min-height: 72px;
  padding: 13px;
  border: 1px solid #d7e0dd;
  border-radius: 10px;
  background: white;
  display: flex;
  align-items: center;
  gap: 10px;
}

.truck-summary-icon {
  width: 35px;
  height: 35px;
  border-radius: 8px;
  background: #e8f5f1;
  color: #08765c;
  display: flex;
  align-items: center;
  justify-content: center;
}

.truck-summary-icon.idle {
  background: #f3f1e9;
  color: #8b7b43;
}

.truck-summary-icon.completed {
  background: #edf5f1;
  color: #477b67;
}

.truck-summary-card strong {
  display: block;
  color: #173d35;
  font-size: 19px;
}

.truck-summary-card span {
  display: block;
  margin-top: 2px;
  color: #7b8883;
  font-size: 8px;
}


/* MAIN */

.truck-tracker-grid {
  display: grid;
  grid-template-columns: 1.35fr .65fr;
  gap: 13px;
  margin-bottom: 13px;
}

.truck-map-panel,
.truck-list-panel,
.truck-details-panel {
  padding: 16px;
  border: 1px solid #d7e0dd;
  border-radius: 11px;
  background: white;
}

.truck-panel-heading {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  color: #08765c;
}

.truck-panel-heading h2 {
  margin: 0;
  color: #173d35;
  font-size: 13px;
}

.truck-panel-heading span {
  display: block;
  margin-top: 4px;
  color: #87938f;
  font-size: 8px;
}


/* MAP */

.truck-map {
  position: relative;
  height: 370px;
  margin-top: 15px;
  overflow: hidden;
  border-radius: 9px;
  background:
    linear-gradient(135deg, transparent 48%, #dbe5e1 49%, #dbe5e1 51%, transparent 52%),
    linear-gradient(45deg, transparent 48%, #dbe5e1 49%, #dbe5e1 51%, transparent 52%),
    #edf3f1;
}

.truck-road {
  position: absolute;
  background: white;
  border: 1px solid #d5dfdc;
}

.road-a {
  width: 120%;
  height: 40px;
  left: -10%;
  top: 36%;
  transform: rotate(-8deg);
}

.road-b {
  width: 45px;
  height: 120%;
  left: 46%;
  top: -10%;
  transform: rotate(12deg);
}

.road-c {
  width: 80%;
  height: 32px;
  left: 10%;
  top: 69%;
  transform: rotate(4deg);
}

.road-d {
  width: 32px;
  height: 80%;
  left: 75%;
  top: 10%;
  transform: rotate(-18deg);
}

.truck-area {
  position: absolute;
  color: #7d9089;
  font-size: 10px;
  font-weight: 700;
}

.area-a {
  left: 14%;
  top: 20%;
}

.area-b {
  left: 58%;
  top: 22%;
}

.area-c {
  left: 19%;
  top: 72%;
}

.area-d {
  left: 67%;
  top: 67%;
}

.truck-marker {
  position: absolute;
  width: 31px;
  height: 31px;
  margin-left: -15px;
  margin-top: -15px;
  border-radius: 50%;
  background: #08765c;
  color: white;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(0,0,0,.16);
  display: flex;
  align-items: center;
  justify-content: center;
}

.truck-marker.idle {
  background: #8b7b43;
}

.truck-marker.completed {
  background: #6d8980;
}

.truck-map-legend {
  position: absolute;
  left: 12px;
  bottom: 12px;
  padding: 8px 10px;
  border-radius: 7px;
  background: white;
  display: flex;
  gap: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,.08);
}

.truck-map-legend span {
  display: flex;
  align-items: center;
  gap: 5px;
  color: #60716b;
  font-size: 7px;
}

.truck-map-legend i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.legend-active {
  background: #08765c;
}

.legend-idle {
  background: #8b7b43;
}

.legend-completed {
  background: #6d8980;
}


/* TRUCK LIST */

.truck-list {
  margin-top: 14px;
}

.truck-list-item {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 11px 0;
  border-bottom: 1px solid #edf1ef;
}

.truck-list-item:last-child {
  border-bottom: none;
}

.truck-list-icon {
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  border-radius: 8px;
  background: #e8f5f1;
  color: #08765c;
  display: flex;
  align-items: center;
  justify-content: center;
}

.truck-list-icon.idle {
  background: #f3f1e9;
  color: #8b7b43;
}

.truck-list-icon.completed {
  background: #edf5f1;
  color: #6d8980;
}

.truck-list-info {
  min-width: 0;
  flex: 1;
}

.truck-list-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.truck-list-title strong {
  color: #173d35;
  font-size: 9px;
}

.truck-list-info > span {
  display: block;
  margin-top: 3px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #87938f;
  font-size: 7px;
}

.truck-status {
  color: #08765c;
  font-size: 7px;
  font-weight: 700;
}

.truck-status.idle {
  color: #8b7b43;
}

.truck-status.completed {
  color: #6d8980;
}

.truck-progress {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 7px;
}

.truck-progress > div {
  flex: 1;
  height: 4px;
  border-radius: 4px;
  background: #edf2f0;
  overflow: hidden;
}

.truck-progress > div > span {
  display: block;
  height: 100%;
  border-radius: 4px;
  background: #08765c;
}

.truck-progress small {
  color: #87938f;
  font-size: 6px;
}

.truck-arrow {
  border: none;
  background: transparent;
  color: #87938f;
}


/* TABLE */

.truck-details-panel {
  margin-bottom: 20px;
}

.truck-table {
  margin-top: 14px;
}

.truck-table-head,
.truck-table-row {
  display: grid;
  grid-template-columns: .7fr 1fr 1.25fr 1fr .8fr;
  align-items: center;
  gap: 10px;
}

.truck-table-head {
  padding: 8px 10px;
  background: #f4f7f5;
  border-radius: 6px;
  color: #84908c;
  font-size: 7px;
  font-weight: 800;
  text-transform: uppercase;
}

.truck-table-row {
  min-height: 48px;
  padding: 6px 10px;
  border-bottom: 1px solid #edf1ef;
  color: #687771;
  font-size: 8px;
}

.truck-table-row strong {
  color: #173d35;
  font-size: 9px;
}

.next-pickup,
.last-update {
  display: flex;
  align-items: center;
  gap: 4px;
}

.next-pickup {
  color: #08765c;
}

.last-update {
  color: #899590;
}


@media (max-width: 900px) {

  .truck-summary {
    grid-template-columns: repeat(2, 1fr);
  }

  .truck-tracker-grid {
    grid-template-columns: 1fr;
  }

  .truck-table-head,
  .truck-table-row {
    grid-template-columns: .7fr 1fr 1fr;
  }

  .truck-table-head span:nth-child(4),
  .truck-table-head span:nth-child(5),
  .truck-table-row > span:nth-child(4),
  .truck-table-row > span:nth-child(5) {
    display: none;
  }

}

`
  
export default GarbageTruckTracker