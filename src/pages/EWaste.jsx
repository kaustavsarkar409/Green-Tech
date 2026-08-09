import {
  Smartphone,
  Laptop,
  Monitor,
  Headphones,
  ShieldCheck,
  Camera,
  MapPin,
  CalendarDays,
  CheckCircle2,
  CircleSlash2
} from "lucide-react"

import { useState } from "react"

import "./EWaste.css"

function EWaste() {
  const [device, setDevice] = useState("Mobile")

  const devices = [
    {
      name: "Mobile",
      icon: Smartphone
    },
    {
      name: "Computer",
      icon: Laptop
    },
    {
      name: "TV / Monitor",
      icon: Monitor
    },
    {
      name: "Accessories",
      icon: Headphones
    }
  ]

  return (
    <div className="ewaste-page">

      {/* INTRO */}

      <div className="ewaste-intro">

        <span className="ewaste-kicker">
          SPECIAL WASTE RECYCLING
        </span>

        <h1>
          Responsible recycling for
          <br />
          electronics and more.
        </h1>

        <p>
          Safely dispose of unwanted electronics through verified recycling
          partners and earn rewards for responsible disposal.
        </p>

      </div>


      {/* WASTE TYPE OPTIONS */}

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "18px",
          flexWrap: "wrap"
        }}
      >

        {/* CURRENT */}

        <div
          style={{
            padding: "9px 14px",
            borderRadius: "9px",
            background: "#e8f7f2",
            border: "1px solid #b9e4d7",
            color: "#075b49",
            fontSize: "11px",
            fontWeight: "700",
            display: "flex",
            alignItems: "center",
            gap: "7px"
          }}
        >
          <Smartphone size={15} />
          E-Waste
          <span
            style={{
              fontSize: "9px",
              fontWeight: "600",
              color: "#628079"
            }}
          >
            Available
          </span>
        </div>


        {/* COMING SOON */}

        <div
          style={{
            padding: "9px 14px",
            borderRadius: "9px",
            background: "#f4f5f6",
            border: "1px dashed #c8cfcc",
            color: "#6e7975",
            fontSize: "11px",
            fontWeight: "700",
            display: "flex",
            alignItems: "center",
            gap: "7px",
            cursor: "not-allowed"
          }}
          title="Tyre waste recycling is coming soon"
        >
          <CircleSlash2 size={15} />

          Tyre Waste

          <span
            style={{
              padding: "3px 6px",
              borderRadius: "5px",
              background: "#e4e7e6",
              color: "#737d79",
              fontSize: "8px",
              fontWeight: "800",
              textTransform: "uppercase"
            }}
          >
            Coming Soon
          </span>

        </div>

      </div>


      {/* BONUS */}

      <div className="ewaste-bonus-bar">

        <div className="ewaste-bonus-icon">
          ♻
        </div>

        <div>
          <strong>
            E-Waste Bonus
          </strong>

          <span>
            &nbsp; Extra rewards for responsible disposal
          </span>
        </div>

        <span className="ewaste-bonus-points">
          +3× points this week
        </span>

      </div>


      {/* MAIN */}

      <div className="ewaste-main-grid">

        {/* PICKUP */}

        <section className="ewaste-panel ewaste-pickup">

          <div className="ewaste-panel-heading">

            <h2>
              Schedule a pickup
            </h2>

            <p>
              Tell us what you want to recycle and we'll take care of the rest.
            </p>

          </div>


          <div className="ewaste-field">

            <label className="ewaste-label">
              What are you recycling?
            </label>

            <div className="ewaste-devices">

              {devices.map((item) => {

                const Icon = item.icon

                return (
                  <button
                    key={item.name}
                    type="button"
                    className={`ewaste-device ${
                      device === item.name ? "active" : ""
                    }`}
                    onClick={() => setDevice(item.name)}
                  >

                    <Icon size={20} />

                    <span>
                      {item.name}
                    </span>

                  </button>
                )
              })}

            </div>

          </div>


          <div className="ewaste-field">

            <label className="ewaste-label">
              Device details
              <span
                style={{
                  color: "#8a9692",
                  fontWeight: 400
                }}
              >
                {" "}optional
              </span>
            </label>

            <input
              className="ewaste-input"
              type="text"
              placeholder="Example: Samsung TV, old laptop, broken phone..."
            />

            <p className="ewaste-help">
              Extra information helps the recycling partner prepare for your pickup.
            </p>

          </div>


          <div className="ewaste-field">

            <label className="ewaste-label">
              Condition photo
            </label>

            <div className="ewaste-upload">

              <div className="ewaste-upload-icon">
                <Camera size={20} />
              </div>

              <strong>
                Add a photo of the item
              </strong>

              <span>
                Optional · JPG or PNG up to 5MB
              </span>

            </div>

          </div>


          <button
            type="button"
            className="ewaste-schedule"
          >
            <CalendarDays size={16} />
            Continue to pickup details
          </button>

        </section>


        {/* RIGHT */}

        <div className="ewaste-right">

          {/* SECURITY */}

          <section className="ewaste-panel ewaste-info">

            <div className="ewaste-info-top">

              <div className="ewaste-info-icon">
                <ShieldCheck size={20} />
              </div>

              <div>

                <h3>
                  Your data stays protected
                </h3>

                <p>
                  Phones, computers and storage devices are securely handled.
                  Eligible devices go through data wiping before recycling.
                </p>

                <button
                  type="button"
                  className="ewaste-link"
                >
                  Learn about data protection →
                </button>

              </div>

            </div>

          </section>


          {/* RECYCLERS */}

          <section className="ewaste-panel ewaste-recyclers">

            <div className="ewaste-recyclers-heading">

              <h3>
                Certified recycling partners
              </h3>

            </div>


            <div className="ewaste-recycler">

              <div className="ewaste-recycler-icon">
                ♻
              </div>

              <div className="ewaste-recycler-info">

                <strong>
                  TechCycle Solutions
                </strong>

                <span>
                  <MapPin size={11} />
                  1.2 miles away
                </span>

              </div>

              <div className="ewaste-certified">
                <CheckCircle2 size={13} />
              </div>

            </div>


            <div className="ewaste-recycler">

              <div className="ewaste-recycler-icon">
                ♻
              </div>

              <div className="ewaste-recycler-info">

                <strong>
                  EcoElectro Hub
                </strong>

                <span>
                  <MapPin size={11} />
                  3.5 miles away
                </span>

              </div>

              <div className="ewaste-certified">
                <CheckCircle2 size={13} />
              </div>

            </div>


            <button
              type="button"
              className="ewaste-map"
            >
              <MapPin size={14} />
              View recycling partners on map
            </button>

          </section>

        </div>

      </div>


      {/* HOW IT WORKS */}

      <section className="ewaste-panel ewaste-how">

        <h2>
          What happens after you submit?
        </h2>

        <div className="ewaste-steps">

          <div className="ewaste-step">

            <div className="ewaste-step-number">
              1
            </div>

            <strong>
              Request pickup
            </strong>

            <p>
              Choose your device and provide the pickup details.
            </p>

          </div>


          <div className="ewaste-step">

            <div className="ewaste-step-number">
              2
            </div>

            <strong>
              Partner collects
            </strong>

            <p>
              A verified recycling partner collects the item.
            </p>

          </div>


          <div className="ewaste-step">

            <div className="ewaste-step-number">
              3
            </div>

            <strong>
              Secure handling
            </strong>

            <p>
              Eligible devices are checked and securely handled.
            </p>

          </div>


          <div className="ewaste-step">

            <div className="ewaste-step-number">
              4
            </div>

            <strong>
              Reuse or recycle
            </strong>

            <p>
              Working parts can be reused and remaining materials recycled.
            </p>

          </div>


          <div className="ewaste-step">

            <div className="ewaste-step-number">
              5
            </div>

            <strong>
              Earn rewards
            </strong>

            <p>
              Responsible disposal earns CWMS reward points.
            </p>

          </div>

        </div>

      </section>

    </div>
  )
}

export default EWaste