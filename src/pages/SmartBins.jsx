import {
  Search,
  Plus,
  Trash2,
  BatteryMedium,
  MapPin,
  Activity,
  MoreVertical
} from "lucide-react"

const bins = [
  {
    id: "BIN-A17",
    type: "Plastic",
    sector: "Sector 4",
    fill: 94,
    battery: 82,
    status: "critical"
  },
  {
    id: "BIN-B03",
    type: "Organic",
    sector: "Sector 7",
    fill: 67,
    battery: 91,
    status: "warning"
  },
  {
    id: "BIN-C21",
    type: "Paper",
    sector: "Sector 2",
    fill: 32,
    battery: 76,
    status: "normal"
  },
  {
    id: "BIN-D09",
    type: "Metal",
    sector: "Sector 5",
    fill: 79,
    battery: 88,
    status: "warning"
  },
  {
    id: "BIN-E12",
    type: "E-waste",
    sector: "Sector 8",
    fill: 41,
    battery: 94,
    status: "normal"
  },
  {
    id: "BIN-F06",
    type: "Plastic",
    sector: "Sector 1",
    fill: 24,
    battery: 67,
    status: "normal"
  }
]

function SmartBins() {
  return (
    <div className="bins-page">

      <div className="page-heading">
        <div>
          <span className="eyebrow">IOT MONITORING</span>
          <h1>Smart Bin Network</h1>
          <p>Real-time fill levels and sensor health across the city.</p>
        </div>

        <button className="primary-button">
          <Plus size={17} />
          Add New Bin
        </button>
      </div>


      {/* SUMMARY */}

      <div className="bin-summary">

        <div className="bin-summary-card">
          <div className="summary-icon green">
            <Activity size={19} />
          </div>
          <div>
            <strong>86</strong>
            <span>Active Bins</span>
          </div>
        </div>

        <div className="bin-summary-card">
          <div className="summary-icon red">
            <Trash2 size={19} />
          </div>
          <div>
            <strong>4</strong>
            <span>Critical</span>
          </div>
        </div>

        <div className="bin-summary-card">
          <div className="summary-icon orange">
            <Trash2 size={19} />
          </div>
          <div>
            <strong>12</strong>
            <span>Needs Collection</span>
          </div>
        </div>

        <div className="bin-summary-card">
          <div className="summary-icon blue">
            <BatteryMedium size={19} />
          </div>
          <div>
            <strong>91%</strong>
            <span>Avg. Battery</span>
          </div>
        </div>

      </div>


      {/* FILTER BAR */}

      <div className="bin-toolbar">

        <div className="search-box">
          <Search size={17} />
          <input
            type="text"
            placeholder="Search bin ID, sector or waste type..."
          />
        </div>

        <select>
          <option>All Waste Types</option>
          <option>Plastic</option>
          <option>Paper</option>
          <option>Metal</option>
          <option>E-waste</option>
          <option>Organic</option>
        </select>

        <select>
          <option>All Fill Levels</option>
          <option>Critical</option>
          <option>Warning</option>
          <option>Normal</option>
        </select>

      </div>


      {/* BIN GRID */}

      <div className="bins-grid">

        {bins.map((bin) => (

          <div className="bin-card" key={bin.id}>

            <div className="bin-card-header">

              <div className={`bin-card-icon ${bin.status}`}>
                <Trash2 size={20} />
              </div>

              <div className="bin-card-title">
                <strong>{bin.id}</strong>
                <span>
                  <MapPin size={11} />
                  {bin.sector}
                </span>
              </div>

              <button className="icon-button">
                <MoreVertical size={17} />
              </button>

            </div>


            <div className="fill-section">

              <div className="fill-header">
                <span>Fill Level</span>

                <strong className={`${bin.status}-text`}>
                  {bin.fill}%
                </strong>
              </div>

              <div className="large-progress">
                <div
                  className={`large-progress-fill ${bin.status}`}
                  style={{ width: `${bin.fill}%` }}
                ></div>
              </div>

              <span className="capacity-text">
                {bin.fill >= 90
                  ? "Collection required immediately"
                  : bin.fill >= 75
                  ? "Collection recommended"
                  : "Operating normally"}
              </span>

            </div>


            <div className="bin-card-footer">

              <div>
                <span>Waste Type</span>
                <strong>{bin.type}</strong>
              </div>

              <div className="battery-info">
                <BatteryMedium size={15} />
                <strong>{bin.battery}%</strong>
              </div>

            </div>


            <button className="bin-details-button">
              View bin details
            </button>

          </div>

        ))}

      </div>

    </div>
  )
}

export default SmartBins