import {
  BarChart3,
  TrendingUp,
  Trash2,
  Recycle,
  Truck,
  AlertTriangle
} from "lucide-react"

import "./Analytics.css"

function Analytics() {
  return (
    <div className="analytics-page">

      <div className="analytics-heading">
        <div>
          <span className="analytics-eyebrow">
            MUNICIPAL INTELLIGENCE
          </span>

          <h1>Reports & Analytics</h1>

          <p>
            Monitor waste collection performance, recycling activity and
            municipal operations across the city.
          </p>
        </div>

        <select className="analytics-period">
          <option>This Month</option>
          <option>Last Month</option>
          <option>Last 3 Months</option>
        </select>
      </div>


      <div className="analytics-stats">

        <div className="analytics-stat">
          <div className="analytics-stat-icon">
            <Trash2 size={19} />
          </div>

          <span>Total Waste Collected</span>
          <strong>1,284 t</strong>
          <small>↑ 8.4% from last month</small>
        </div>


        <div className="analytics-stat">
          <div className="analytics-stat-icon">
            <Recycle size={19} />
          </div>

          <span>Recycling Rate</span>
          <strong>68.4%</strong>
          <small>↑ 4.2% from last month</small>
        </div>


        <div className="analytics-stat">
          <div className="analytics-stat-icon">
            <Truck size={19} />
          </div>

          <span>Collection Efficiency</span>
          <strong>91.2%</strong>
          <small>↑ 2.8% this month</small>
        </div>


        <div className="analytics-stat">
          <div className="analytics-stat-icon">
            <AlertTriangle size={19} />
          </div>

          <span>Open Incidents</span>
          <strong>24</strong>
          <small>8 require urgent action</small>
        </div>

      </div>


      <div className="analytics-grid">

        <section className="analytics-panel large">

          <div className="analytics-panel-heading">
            <div>
              <h2>Waste Collection Trend</h2>
              <span>Collected waste over the last 6 months</span>
            </div>

            <BarChart3 size={19} />
          </div>


          <div className="bar-chart">

            <div className="bar-group">
              <div className="bar-value">182</div>
              <div className="bar" style={{ height: "52%" }} />
              <span>Mar</span>
            </div>

            <div className="bar-group">
              <div className="bar-value">201</div>
              <div className="bar" style={{ height: "61%" }} />
              <span>Apr</span>
            </div>

            <div className="bar-group">
              <div className="bar-value">218</div>
              <div className="bar" style={{ height: "68%" }} />
              <span>May</span>
            </div>

            <div className="bar-group">
              <div className="bar-value">231</div>
              <div className="bar" style={{ height: "74%" }} />
              <span>Jun</span>
            </div>

            <div className="bar-group">
              <div className="bar-value">239</div>
              <div className="bar" style={{ height: "82%" }} />
              <span>Jul</span>
            </div>

            <div className="bar-group">
              <div className="bar current" style={{ height: "91%" }} />
              <div className="bar-value">244</div>
              <span>Aug</span>
            </div>

          </div>

        </section>


        <section className="analytics-panel">

          <div className="analytics-panel-heading">
            <div>
              <h2>Waste Composition</h2>
              <span>Current collection mix</span>
            </div>
          </div>


          <div className="composition">

            <div className="composition-row">
              <span>Organic</span>
              <strong>42%</strong>

              <div className="composition-track">
                <div style={{ width: "42%" }} />
              </div>
            </div>


            <div className="composition-row">
              <span>Plastic</span>
              <strong>24%</strong>

              <div className="composition-track">
                <div style={{ width: "24%" }} />
              </div>
            </div>


            <div className="composition-row">
              <span>Paper</span>
              <strong>17%</strong>

              <div className="composition-track">
                <div style={{ width: "17%" }} />
              </div>
            </div>


            <div className="composition-row">
              <span>Metal</span>
              <strong>9%</strong>

              <div className="composition-track">
                <div style={{ width: "9%" }} />
              </div>
            </div>


            <div className="composition-row">
              <span>Other</span>
              <strong>8%</strong>

              <div className="composition-track">
                <div style={{ width: "8%" }} />
              </div>
            </div>

          </div>

        </section>

      </div>


      <div className="analytics-bottom-grid">

        <section className="analytics-panel">

          <div className="analytics-panel-heading">
            <div>
              <h2>Zone Performance</h2>
              <span>Collection efficiency by sector</span>
            </div>
          </div>


          <div className="zone-list">

            <div className="zone-row">
              <strong>Sector 1</strong>
              <span>96%</span>
              <div>
                <i style={{ width: "96%" }} />
              </div>
            </div>

            <div className="zone-row">
              <strong>Sector 2</strong>
              <span>91%</span>
              <div>
                <i style={{ width: "91%" }} />
              </div>
            </div>

            <div className="zone-row">
              <strong>Sector 3</strong>
              <span>87%</span>
              <div>
                <i style={{ width: "87%" }} />
              </div>
            </div>

            <div className="zone-row">
              <strong>Sector 4</strong>
              <span>82%</span>
              <div>
                <i style={{ width: "82%" }} />
              </div>
            </div>

          </div>

        </section>


        <section className="analytics-panel insight-panel">

          <div className="insight-icon">
            <TrendingUp size={20} />
          </div>

          <span className="analytics-eyebrow">
            SYSTEM INSIGHT
          </span>

          <h2>
            Recycling performance is improving.
          </h2>

          <p>
            The city's recycling rate has increased by 4.2% this month.
            Sector 1 currently has the highest collection efficiency.
          </p>

          <button>
            View detailed report →
          </button>

        </section>

      </div>

    </div>
  )
}

export default Analytics