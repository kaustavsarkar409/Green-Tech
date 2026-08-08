import {
  Users,
  Trash2,
  Recycle,
  Leaf,
  AlertTriangle,
  Truck,
  ArrowUpRight,
  ArrowDownRight,
  Package
} from "lucide-react"

function Dashboard() {
  return (
    <div className="dashboard">

      {/* PAGE HEADER */}
      <div className="dashboard-header">
        <div>
          <span className="eyebrow">MUNICIPAL OPERATIONS</span>
          <h1>Good evening, Admin 👋</h1>
          <p>
            Here's what's happening across your waste network today.
          </p>
        </div>

        <div className="status-pill">
          <span></span>
          System Operational
        </div>
      </div>


      {/* KPI CARDS */}
      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon green">
              <Users size={20} />
            </div>
            <span className="trend positive">
              <ArrowUpRight size={14} />
              12.4%
            </span>
          </div>

          <div className="stat-value">1,248</div>
          <div className="stat-label">Registered Citizens</div>
        </div>


        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon blue">
              <Trash2 size={20} />
            </div>
            <span className="trend positive">
              <ArrowUpRight size={14} />
              8.2%
            </span>
          </div>

          <div className="stat-value">86</div>
          <div className="stat-label">Smart Bins Active</div>
        </div>


        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon orange">
              <Recycle size={20} />
            </div>
            <span className="trend positive">
              <ArrowUpRight size={14} />
              4.7%
            </span>
          </div>

          <div className="stat-value">87.4%</div>
          <div className="stat-label">Segregation Accuracy</div>
        </div>


        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon teal">
              <Leaf size={20} />
            </div>
            <span className="trend positive">
              <ArrowUpRight size={14} />
              16.8%
            </span>
          </div>

          <div className="stat-value">1.82 t</div>
          <div className="stat-label">Estimated CO₂ Saved</div>
        </div>

      </div>


      {/* MAIN GRID */}
      <div className="dashboard-grid">

        {/* WASTE DISTRIBUTION */}
        <div className="dashboard-card waste-card">

          <div className="card-header">
            <div>
              <h3>Waste Recovery</h3>
              <p>Collected recyclable material</p>
            </div>

            <button className="period-button">
              This month
            </button>
          </div>


          <div className="waste-content">

            <div className="waste-total">
              <strong>2,840</strong>
              <span>kg recovered</span>
            </div>


            <div className="waste-bars">

              <div className="waste-row">
                <div className="waste-label">
                  <span>Plastic</span>
                  <strong>1,240 kg</strong>
                </div>

                <div className="progress">
                  <div
                    className="progress-fill plastic"
                    style={{ width: "82%" }}
                  ></div>
                </div>
              </div>


              <div className="waste-row">
                <div className="waste-label">
                  <span>Paper</span>
                  <strong>720 kg</strong>
                </div>

                <div className="progress">
                  <div
                    className="progress-fill paper"
                    style={{ width: "58%" }}
                  ></div>
                </div>
              </div>


              <div className="waste-row">
                <div className="waste-label">
                  <span>Metal</span>
                  <strong>480 kg</strong>
                </div>

                <div className="progress">
                  <div
                    className="progress-fill metal"
                    style={{ width: "42%" }}
                  ></div>
                </div>
              </div>


              <div className="waste-row">
                <div className="waste-label">
                  <span>E-waste</span>
                  <strong>260 kg</strong>
                </div>

                <div className="progress">
                  <div
                    className="progress-fill ewaste"
                    style={{ width: "25%" }}
                  ></div>
                </div>
              </div>


              <div className="waste-row">
                <div className="waste-label">
                  <span>Other</span>
                  <strong>140 kg</strong>
                </div>

                <div className="progress">
                  <div
                    className="progress-fill other"
                    style={{ width: "15%" }}
                  ></div>
                </div>
              </div>

            </div>
          </div>
        </div>


        {/* BIN ALERTS */}
        <div className="dashboard-card">

          <div className="card-header">
            <div>
              <h3>Bin Alerts</h3>
              <p>Bins requiring attention</p>
            </div>

            <div className="alert-count">
              4 alerts
            </div>
          </div>


          <div className="bin-alert-list">

            <div className="bin-alert">
              <div className="bin-status critical">
                <Trash2 size={17} />
              </div>

              <div className="bin-info">
                <strong>BIN-A17</strong>
                <span>Plastic • Sector 4</span>
              </div>

              <div className="fill-level critical-text">
                94%
              </div>
            </div>


            <div className="bin-alert">
              <div className="bin-status warning">
                <Trash2 size={17} />
              </div>

              <div className="bin-info">
                <strong>BIN-B03</strong>
                <span>Organic • Sector 7</span>
              </div>

              <div className="fill-level warning-text">
                87%
              </div>
            </div>


            <div className="bin-alert">
              <div className="bin-status warning">
                <Trash2 size={17} />
              </div>

              <div className="bin-info">
                <strong>BIN-C21</strong>
                <span>Paper • Sector 2</span>
              </div>

              <div className="fill-level warning-text">
                81%
              </div>
            </div>


            <div className="bin-alert">
              <div className="bin-status warning">
                <Trash2 size={17} />
              </div>

              <div className="bin-info">
                <strong>BIN-D09</strong>
                <span>Metal • Sector 5</span>
              </div>

              <div className="fill-level warning-text">
                79%
              </div>
            </div>

          </div>

          <button className="view-button">
            View all bins
            <ArrowUpRight size={15} />
          </button>

        </div>

      </div>


      {/* BOTTOM GRID */}
      <div className="bottom-grid">

        {/* COLLECTION */}
        <div className="dashboard-card collection-card">

          <div className="card-header">
            <div>
              <h3>Collection Operations</h3>
              <p>Today's optimized routes</p>
            </div>

            <Truck size={20} />
          </div>


          <div className="route-summary">

            <div>
              <strong>12</strong>
              <span>Active routes</span>
            </div>

            <div>
              <strong>68</strong>
              <span>Bins scheduled</span>
            </div>

            <div>
              <strong>142 km</strong>
              <span>Total distance</span>
            </div>

          </div>


          <div className="route-progress">

            <div className="route-progress-header">
              <span>Today's collection</span>
              <strong>76%</strong>
            </div>

            <div className="progress">
              <div
                className="progress-fill route"
                style={{ width: "76%" }}
              ></div>
            </div>

          </div>


          <div className="route-status">
            <span className="live-dot"></span>
            9 routes completed • 3 in progress
          </div>

        </div>


        {/* CIRCULAR ECONOMY */}
        <div className="dashboard-card impact-card">

          <div className="card-header">
            <div>
              <h3>Circular Economy Impact</h3>
              <p>Where recovered waste goes</p>
            </div>

            <Leaf size={20} />
          </div>


          <div className="impact-flow">

            <div className="impact-step">
              <div className="impact-icon">
                <Trash2 size={17} />
              </div>
              <span>Collected</span>
              <strong>2.84 t</strong>
            </div>

            <div className="flow-arrow">→</div>

            <div className="impact-step">
              <div className="impact-icon">
                <Recycle size={17} />
              </div>
              <span>Recovered</span>
              <strong>2.31 t</strong>
            </div>

            <div className="flow-arrow">→</div>

            <div className="impact-step">
              <div className="impact-icon">
                <Leaf size={17} />
              </div>
              <span>CO₂ Saved</span>
              <strong>1.82 t</strong>
            </div>

          </div>


          <div className="impact-note">
            <Package size={16} />
            <span>
              Recyclable materials are routed toward verified recovery partners.
            </span>
          </div>

        </div>

      </div>


      {/* ACTIVITY */}
      <div className="dashboard-card activity-card">

        <div className="card-header">
          <div>
            <h3>System Activity</h3>
            <p>Recent events across the platform</p>
          </div>

          <button className="view-button">
            View activity
            <ArrowUpRight size={15} />
          </button>
        </div>


        <div className="activity-list">

          <div className="activity-item">
            <div className="activity-icon green">
              <Recycle size={16} />
            </div>

            <div>
              <strong>Waste verification completed</strong>
              <span>Plastic correctly segregated • Citizen #1042</span>
            </div>

            <time>2 min ago</time>
          </div>


          <div className="activity-item">
            <div className="activity-icon orange">
              <AlertTriangle size={16} />
            </div>

            <div>
              <strong>Bin fill alert triggered</strong>
              <span>BIN-A17 reached 94% capacity</span>
            </div>

            <time>8 min ago</time>
          </div>


          <div className="activity-item">
            <div className="activity-icon blue">
              <Truck size={16} />
            </div>

            <div>
              <strong>Collection route completed</strong>
              <span>Route #24 • 5 bins collected</span>
            </div>

            <time>21 min ago</time>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Dashboard