import {
  Truck,
  MapPin,
  Navigation,
  Fuel,
  Leaf,
  Clock,
  Route as RouteIcon,
  CheckCircle2,
  Play,
  RotateCcw
} from "lucide-react"

const stops = [
  {
    order: 1,
    id: "BIN-A17",
    location: "Sector 4",
    fill: 94,
    type: "Plastic",
  },
  {
    order: 2,
    id: "BIN-D09",
    location: "Sector 5",
    fill: 79,
    type: "Metal",
  },
  {
    order: 3,
    id: "BIN-B03",
    location: "Sector 7",
    fill: 87,
    type: "Organic",
  },
  {
    order: 4,
    id: "BIN-C21",
    location: "Sector 2",
    fill: 81,
    type: "Paper",
  },
  {
    order: 5,
    id: "BIN-E12",
    location: "Sector 8",
    fill: 41,
    type: "E-waste",
  },
]

function Routes() {
  return (
    <div className="routes-page">

      {/* HEADER */}

      <div className="page-heading">
        <div>
          <span className="eyebrow">COLLECTION OPTIMIZATION</span>
          <h1>Collection Routes</h1>
          <p>
            Optimize collection paths using bin locations and fill levels.
          </p>
        </div>

        <button className="primary-button">
          <Navigation size={16} />
          Optimize New Route
        </button>
      </div>


      {/* ROUTE STATS */}

      <div className="route-stats">

        <div className="route-stat-card">
          <div className="route-stat-icon green">
            <Truck size={19} />
          </div>
          <div>
            <strong>12</strong>
            <span>Active Routes</span>
          </div>
        </div>

        <div className="route-stat-card">
          <div className="route-stat-icon blue">
            <MapPin size={19} />
          </div>
          <div>
            <strong>68</strong>
            <span>Stops Today</span>
          </div>
        </div>

        <div className="route-stat-card">
          <div className="route-stat-icon orange">
            <Fuel size={19} />
          </div>
          <div>
            <strong>142 km</strong>
            <span>Distance Today</span>
          </div>
        </div>

        <div className="route-stat-card">
          <div className="route-stat-icon teal">
            <Leaf size={19} />
          </div>
          <div>
            <strong>18.4 kg</strong>
            <span>CO₂ Saved</span>
          </div>
        </div>

      </div>


      {/* MAIN ROUTE */}

      <div className="route-main-grid">

        {/* ROUTE VISUALIZATION */}

        <div className="dashboard-card route-map-card">

          <div className="card-header">
            <div>
              <h3>Route #24</h3>
              <p>Optimized collection path</p>
            </div>

            <div className="route-status-badge">
              <span></span>
              IN PROGRESS
            </div>
          </div>


          {/* FAKE MAP / ROUTE VISUAL */}

          <div className="route-map">

            <div className="map-grid"></div>

            <div className="map-road road-one"></div>
            <div className="map-road road-two"></div>
            <div className="map-road road-three"></div>

            <svg
              className="route-line"
              viewBox="0 0 600 350"
              preserveAspectRatio="none"
            >
              <polyline
                points="75,275 190,205 320,120 455,175 520,75 75,275"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="map-marker depot">
              <Navigation size={15} />
            </div>

            <div className="map-marker marker-one">1</div>
            <div className="map-marker marker-two">2</div>
            <div className="map-marker marker-three">3</div>
            <div className="map-marker marker-four">4</div>
            <div className="map-marker marker-five">5</div>

            <div className="map-label depot-label">
              DEPOT
            </div>

          </div>


          {/* ROUTE SUMMARY */}

          <div className="route-metrics">

            <div>
              <Clock size={16} />
              <span>Estimated Time</span>
              <strong>38 min</strong>
            </div>

            <div>
              <RouteIcon size={16} />
              <span>Total Distance</span>
              <strong>14.8 km</strong>
            </div>

            <div>
              <Fuel size={16} />
              <span>Fuel Estimate</span>
              <strong>2.4 L</strong>
            </div>

          </div>

        </div>


        {/* STOP LIST */}

        <div className="dashboard-card stops-card">

          <div className="card-header">
            <div>
              <h3>Collection Stops</h3>
              <p>5 bins on this route</p>
            </div>
          </div>


          <div className="stops-list">

            {stops.map((stop, index) => (

              <div className="stop-item" key={stop.id}>

                <div className="stop-number">
                  {index === 0 ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    stop.order
                  )}
                </div>

                <div className="stop-details">
                  <strong>{stop.id}</strong>

                  <span>
                    <MapPin size={10} />
                    {stop.location} • {stop.type}
                  </span>
                </div>

                <div
                  className={
                    stop.fill >= 90
                      ? "stop-fill critical"
                      : stop.fill >= 75
                      ? "stop-fill warning"
                      : "stop-fill normal"
                  }
                >
                  {stop.fill}%
                </div>

              </div>

            ))}

          </div>


          <button className="start-route-button">
            <Play size={15} />
            Start Navigation
          </button>

        </div>

      </div>


      {/* OPTIMIZATION EXPLANATION */}

      <div className="dashboard-card optimization-card">

        <div className="optimization-icon">
          <RouteIcon size={20} />
        </div>

        <div className="optimization-content">
          <h3>Route optimized automatically</h3>

          <p>
            The system selects bins above the collection threshold and
            calculates an efficient visiting order using geographic distance.
          </p>

          <div className="optimization-tags">
            <span>Nearest-neighbor</span>
            <span>2-opt improvement</span>
            <span>Haversine distance</span>
          </div>
        </div>

        <div className="optimization-result">
          <span>Estimated saving</span>
          <strong>18.4 kg CO₂</strong>
          <small>vs. unoptimized route</small>
        </div>

      </div>


      {/* ROUTE HISTORY */}

      <div className="dashboard-card route-history">

        <div className="card-header">
          <div>
            <h3>Recent Routes</h3>
            <p>Collection activity</p>
          </div>

          <button className="view-button">
            View all
          </button>
        </div>


        <div className="history-table">

          <div className="history-row history-header">
            <span>Route</span>
            <span>Stops</span>
            <span>Distance</span>
            <span>CO₂</span>
            <span>Status</span>
          </div>

          <div className="history-row">
            <strong>#24</strong>
            <span>5</span>
            <span>14.8 km</span>
            <span>4.2 kg</span>
            <b className="completed">
              Completed
            </b>
          </div>

          <div className="history-row">
            <strong>#23</strong>
            <span>8</span>
            <span>21.4 km</span>
            <span>6.1 kg</span>
            <b className="completed">
              Completed
            </b>
          </div>

          <div className="history-row">
            <strong>#22</strong>
            <span>7</span>
            <span>18.2 km</span>
            <span>5.4 kg</span>
            <b className="progress-status">
              In Progress
            </b>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Routes