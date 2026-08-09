import {
  Search,
  Plus,
  Trash2,
  BatteryMedium,
  MapPin,
  Activity,
  MoreVertical,
  Route
} from "lucide-react"

const bins = [
  {
    id: "BIN-A17",
    type: "Plastic",
    sector: "Sector 4",
    fill: 94,
    battery: 82
  },
  {
    id: "BIN-B03",
    type: "Organic",
    sector: "Sector 7",
    fill: 67,
    battery: 91
  },
  {
    id: "BIN-C21",
    type: "Paper",
    sector: "Sector 2",
    fill: 32,
    battery: 76
  },
  {
    id: "BIN-D09",
    type: "Metal",
    sector: "Sector 5",
    fill: 79,
    battery: 88
  },
  {
    id: "BIN-E12",
    type: "E-waste",
    sector: "Sector 8",
    fill: 41,
    battery: 94
  },
  {
    id: "BIN-F06",
    type: "Plastic",
    sector: "Sector 1",
    fill: 24,
    battery: 67
  }
]

function getFillStatus(fill) {
  if (fill >= 96) {
    return {
      label: "Full",
      status: "critical",
      action: "Collection needed"
    }
  }

  if (fill >= 81) {
    return {
      label: "Nearly Full",
      status: "critical",
      action: "Collect soon"
    }
  }

  if (fill >= 61) {
    return {
      label: "Mostly Full",
      status: "warning",
      action: "Add to collection route"
    }
  }

  if (fill >= 41) {
    return {
      label: "Half Full",
      status: "normal",
      action: "Monitor"
    }
  }

  if (fill >= 21) {
    return {
      label: "Low",
      status: "normal",
      action: "No collection needed"
    }
  }

  return {
    label: "Nearly Empty",
    status: "normal",
    action: "No collection needed"
  }
}

function SmartBins() {

  const urgentBins = bins
    .map((bin) => ({
      ...bin,
      ...getFillStatus(bin.fill)
    }))
    .filter((bin) => bin.fill >= 61)
    .sort((a, b) => b.fill - a.fill)

  return (
    <div>

      {/* PAGE HEADING */}

      <div className="page-heading">

        <div>
          <span className="eyebrow">
            IOT MONITORING
          </span>

          <h1>
            Smart Bin Network
          </h1>

          <p>
            Monitor bin conditions and plan collections based on current waste levels.
          </p>
        </div>

        <button className="primary-button">
          <Plus size={17} />
          Add New Bin
        </button>

      </div>


      {/* COLLECTION INTELLIGENCE */}

      <div
        style={{
          marginBottom: "24px",
          padding: "20px",
          borderRadius: "14px",
          background: "#f8faf9",
          border: "1px solid #e4e9e6"
        }}
      >

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px"
          }}
        >

          <div>
            <span className="eyebrow">
              COLLECTION INTELLIGENCE
            </span>

            <h2 style={{ margin: "4px 0" }}>
              Recommended Collection
            </h2>

            <p style={{ margin: 0 }}>
              Prioritize fuller bins while grouping nearby collection points.
            </p>
          </div>

          <Route size={24} />

        </div>


        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap"
          }}
        >

          {urgentBins.map((bin) => (

            <div
              key={bin.id}
              style={{
                padding: "12px 15px",
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: "10px",
                minWidth: "150px"
              }}
            >

              <strong>
                {bin.id}
              </strong>

              <div style={{ marginTop: "5px" }}>
                {bin.label}
              </div>

              <small>
                {bin.sector}
              </small>

            </div>

          ))}

        </div>


        <div style={{ marginTop: "16px" }}>

          <strong>
            Suggested order:
          </strong>

          {" "}

          {urgentBins
            .map((bin) => bin.id)
            .join(" → ")}

        </div>

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
            <strong>
              {bins.filter((bin) => bin.fill >= 81).length}
            </strong>

            <span>Nearly Full</span>
          </div>

        </div>


        <div className="bin-summary-card">

          <div className="summary-icon orange">
            <Trash2 size={19} />
          </div>

          <div>
            <strong>
              {bins.filter((bin) => bin.fill >= 61).length}
            </strong>

            <span>Collection Suggested</span>
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

          <option>
            All Waste Types
          </option>

          <option>Plastic</option>
          <option>Paper</option>
          <option>Metal</option>
          <option>E-waste</option>
          <option>Organic</option>

        </select>


        <select>

          <option>
            All Fill Levels
          </option>

          <option>Nearly Empty</option>
          <option>Low</option>
          <option>Half Full</option>
          <option>Mostly Full</option>
          <option>Nearly Full</option>
          <option>Full</option>

        </select>

      </div>


      {/* BIN GRID */}

      <div className="bins-grid">

        {bins.map((bin) => {

          const fillStatus = getFillStatus(bin.fill)

          return (

            <div
              className="bin-card"
              key={bin.id}
            >

              <div className="bin-card-header">

                <div
                  className={`bin-card-icon ${fillStatus.status}`}
                >
                  <Trash2 size={20} />
                </div>


                <div className="bin-card-title">

                  <strong>
                    {bin.id}
                  </strong>

                  <span>
                    <MapPin size={11} />
                    {bin.sector}
                  </span>

                </div>


                <button className="icon-button">
                  <MoreVertical size={17} />
                </button>

              </div>


              {/* FILL */}

              <div className="fill-section">

                <div className="fill-header">

                  <span>
                    Fill Level
                  </span>

                  <strong
                    className={`${fillStatus.status}-text`}
                  >
                    {fillStatus.label}
                  </strong>

                </div>


                <div className="large-progress">

                  <div
                    className={`large-progress-fill ${fillStatus.status}`}
                    style={{
                      width: `${bin.fill}%`
                    }}
                  />

                </div>


                <span className="capacity-text">
                  {fillStatus.action}
                </span>

              </div>


              {/* FOOTER */}

              <div className="bin-card-footer">

                <div>

                  <span>
                    Waste Type
                  </span>

                  <strong>
                    {bin.type}
                  </strong>

                </div>


                <div className="battery-info">

                  <BatteryMedium size={15} />

                  <strong>
                    {bin.battery}%
                  </strong>

                </div>

              </div>


              <button className="bin-details-button">
                View bin details
              </button>

            </div>

          )

        })}

      </div>

    </div>
  )
}

export default SmartBins