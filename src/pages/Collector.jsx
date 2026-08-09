import {
  Navigation,
  Map,
  ClipboardCheck,
  MessageSquareWarning,
  CheckCircle2,
  Clock3,
  MapPin,
  Truck,
  Camera,
  Send,
  Trophy,
  Users
} from "lucide-react"

import { useLocation } from "react-router-dom"
import { useState } from "react"

function Collector() {

  const location = useLocation()

  const [feedback, setFeedback] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const path = location.pathname

  const page =
    path.includes("/routes")
      ? "routes"
      : path.includes("/map")
      ? "map"
      : path.includes("/pickups")
      ? "pickups"
      : path.includes("/feedback")
      ? "feedback"
      : "dashboard"


  const pickups = [
    {
      id: "BIN-A17",
      location: "Sector 7 · Lake Road",
      type: "Plastic",
      fill: "Full",
      time: "10:30 AM",
      status: "Pending"
    },
    {
      id: "BIN-B03",
      location: "Sector 7 · Market Road",
      type: "Organic",
      fill: "Full",
      time: "11:00 AM",
      status: "Pending"
    },
    {
      id: "BIN-C21",
      location: "Sector 8 · Park Avenue",
      type: "Paper",
      fill: "Full",
      time: "11:30 AM",
      status: "Completed"
    },
    {
      id: "BIN-D09",
      location: "Sector 8 · Station Road",
      type: "Metal",
      fill: "Full",
      time: "12:00 PM",
      status: "Pending"
    }
  ]


  /* DASHBOARD */

  if (page === "dashboard") {
    return (
      <CollectorShell
        eyebrow="COLLECTION OPERATIONS"
        title="Collector Dashboard"
        subtitle="Your assigned waste collection work for today."
      >

        <div className="collector-stat-grid">

          <CollectorStat
            icon={<Navigation size={19} />}
            value="12"
            label="Assigned Stops"
          />

          <CollectorStat
            icon={<CheckCircle2 size={19} />}
            value="5"
            label="Completed"
          />

          <CollectorStat
            icon={<Clock3 size={19} />}
            value="7"
            label="Remaining"
          />

          <CollectorStat
            icon={<Truck size={19} />}
            value="Active"
            label="Vehicle Status"
          />

        </div>


        <div className="collector-main-grid">

          <div className="collector-card">

            <div className="collector-card-heading">

              <div>
                <h2>
                  Today's Route
                </h2>

                <span>
                  Sector 7 → Sector 8
                </span>
              </div>

              <Navigation size={19} />

            </div>


            <div className="route-progress">

              <div className="route-progress-bar">
                <div
                  style={{
                    width: "42%"
                  }}
                />
              </div>

              <span>
                5 of 12 stops completed
              </span>

            </div>


            {pickups.slice(0, 3).map((pickup, index) => (

              <div
                className="collector-list-row"
                key={pickup.id}
              >

                <div className="collector-number">
                  {index + 1}
                </div>

                <div>
                  <strong>
                    {pickup.id}
                  </strong>

                  <span>
                    {pickup.location}
                  </span>
                </div>

                <b>
                  {pickup.time}
                </b>

              </div>

            ))}


            <button
              className="collector-primary-button"
              onClick={() => {
                window.location.href = "/collector/routes"
              }}
            >
              Open Today's Route
              <Navigation size={15} />
            </button>

          </div>


          <div className="collector-card">

            <div className="collector-card-heading">

              <div>
                <h2>
                  Area Condition
                </h2>

                <span>
                  Latest collector observations
                </span>
              </div>

              <MessageSquareWarning size={19} />

            </div>


            <div className="area-condition">

              <div>
                <strong>
                  Sector 7
                </strong>

                <span>
                  Mostly clear
                </span>
              </div>

              <b>
                Good
              </b>

            </div>


            <div className="area-condition">

              <div>
                <strong>
                  Sector 8
                </strong>

                <span>
                  Some roadside waste
                </span>
              </div>

              <b className="attention">
                Attention
              </b>

            </div>


            <button
              className="collector-secondary-button"
              onClick={() => {
                window.location.href = "/collector/feedback"
              }}
            >
              Submit Area Feedback
            </button>

          </div>

        </div>

      </CollectorShell>
    )
  }


  /* TODAY'S ROUTES */

  if (page === "routes") {
    return (
      <CollectorShell
        eyebrow="COLLECTION OPERATIONS"
        title="Today's Routes"
        subtitle="Follow your assigned collection sequence."
      >

        <div className="collector-route-header">

          <div>
            <strong>
              Route C-07
            </strong>

            <span>
              Sector 7 → Sector 8 → Sector 9
            </span>
          </div>

          <div className="route-status">
            5 / 12 completed
          </div>

        </div>


        <div className="collector-route-list">

          {pickups.map((pickup, index) => (

            <div
              className="collector-route-item"
              key={pickup.id}
            >

              <div className="route-number">
                {index + 1}
              </div>

              <div className="route-location">

                <strong>
                  {pickup.id}
                </strong>

                <span>
                  <MapPin size={12} />
                  {pickup.location}
                </span>

              </div>

              <div className="route-waste">
                {pickup.type}
              </div>

              <div className="route-time">
                {pickup.time}
              </div>

              <div
                className={
                  pickup.status === "Completed"
                    ? "route-completed"
                    : "route-pending"
                }
              >
                {pickup.status}
              </div>

            </div>

          ))}

        </div>

      </CollectorShell>
    )
  }


  /* LIVE MAP */

  if (page === "map") {
    return (
      <CollectorShell
        eyebrow="LIVE COLLECTION MAP"
        title="Live Map"
        subtitle="View your current route and collection points."
      >

        <div className="collector-map">

          <div className="map-road road-one" />
          <div className="map-road road-two" />
          <div className="map-road road-three" />

          <div className="map-area-label label-one">
            Sector 7
          </div>

          <div className="map-area-label label-two">
            Sector 8
          </div>

          <div className="map-area-label label-three">
            Sector 9
          </div>


          <div className="map-marker marker-one">
            <TrashIcon />
          </div>

          <div className="map-marker marker-two">
            <TrashIcon />
          </div>

          <div className="map-marker marker-three">
            <TrashIcon />
          </div>


          <div className="collector-location">
            <Truck size={17} />
          </div>


          <div className="map-legend">

            <span>
              <i className="legend-full" />
              Full
            </span>

            <span>
              <i className="legend-empty" />
              Empty
            </span>

            <span>
              <i className="legend-truck" />
              Your vehicle
            </span>

          </div>

        </div>


        <div className="map-bottom-info">

          <div>
            <strong>
              Current location
            </strong>

            <span>
              Sector 7 · Lake Road
            </span>
          </div>

          <div>
            <strong>
              Next pickup
            </strong>

            <span>
              BIN-B03 · 4 min away
            </span>
          </div>

          <button className="collector-primary-button">
            Start Navigation
            <Navigation size={15} />
          </button>

        </div>

      </CollectorShell>
    )
  }


  /* PICKUPS */

  if (page === "pickups") {
    return (
      <CollectorShell
        eyebrow="ASSIGNED WORK"
        title="Assigned Pickups"
        subtitle="Complete each pickup and update its status."
      >

        <div className="pickup-list">

          {pickups.map((pickup) => (

            <div
              className="pickup-card"
              key={pickup.id}
            >

              <div className="pickup-icon">
                <Truck size={18} />
              </div>

              <div className="pickup-info">

                <strong>
                  {pickup.id}
                </strong>

                <span>
                  <MapPin size={12} />
                  {pickup.location}
                </span>

                <small>
                  {pickup.type} · {pickup.time}
                </small>

              </div>

              <div
                className={
                  pickup.status === "Completed"
                    ? "pickup-completed"
                    : "pickup-pending"
                }
              >
                {pickup.status}
              </div>

              {pickup.status !== "Completed" && (

                <button className="pickup-complete-button">
                  Mark Collected
                </button>

              )}

            </div>

          ))}

        </div>

      </CollectorShell>
    )
  }


  /* FEEDBACK */

  if (page === "feedback") {
    return (
      <CollectorShell
        eyebrow="FIELD OBSERVATIONS"
        title="Area Feedback"
        subtitle="Report what you observe while collecting waste."
      >

        <div className="feedback-layout">

          <div className="feedback-card">

            <h2>
              Submit Area Feedback
            </h2>

            <p>
              Your observations help the municipality understand actual
              ground conditions.
            </p>


            <label>
              Area
            </label>

            <select>
              <option>Sector 7</option>
              <option>Sector 8</option>
              <option>Sector 9</option>
            </select>


            <label>
              Waste Condition
            </label>

            <div className="feedback-options">

              <button>
                Clean
              </button>

              <button>
                Mostly Clean
              </button>

              <button>
                Needs Attention
              </button>

            </div>


            <label>
              What did you notice?
            </label>

            <div className="feedback-checks">

              <label>
                <input type="checkbox" />
                Overflowing waste
              </label>

              <label>
                <input type="checkbox" />
                Illegal dumping
              </label>

              <label>
                <input type="checkbox" />
                Road/access issue
              </label>

              <label>
                <input type="checkbox" />
                Waste left outside collection point
              </label>

            </div>


            <label>
              Additional Notes
            </label>

            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Describe anything the municipality should know..."
            />


            <button
              className="collector-primary-button"
              onClick={() => {
                setSubmitted(true)
                setFeedback("")
              }}
            >
              {submitted ? "Feedback Submitted" : "Submit Area Feedback"}
              {submitted
                ? <CheckCircle2 size={15} />
                : <Send size={15} />
              }
            </button>

          </div>


          <div className="feedback-side">

            <div className="collector-card">

              <Camera size={20} />

              <h3>
                Add a Photo
              </h3>

              <p>
                Capture roadside dumping, blocked access or other conditions
                that need municipal attention.
              </p>

              <button className="collector-secondary-button">
                Add Photo
              </button>

            </div>


            <div className="collector-card">

              <MessageSquareWarning size={20} />

              <h3>
                Why your feedback matters
              </h3>

              <p>
                Collector observations can help identify recurring problem
                areas and improve future collection routes.
              </p>

            </div>

          </div>

        </div>

      </CollectorShell>
    )
  }


  return null
}


/* LEADERBOARDS */

export function Leaderboards() {

  const citizens = [
    ["Ananya S.", "1,840 pts"],
    ["Rahul K.", "1,620 pts"],
    ["Priya M.", "1,490 pts"],
    ["Arjun R.", "1,310 pts"],
    ["Meera S.", "1,180 pts"]
  ]

  const areas = [
    ["Sector 4", "92% clean"],
    ["Sector 7", "88% clean"],
    ["Sector 2", "84% clean"],
    ["Sector 8", "81% clean"],
    ["Sector 9", "76% clean"]
  ]

  return (
    <CollectorShell
      eyebrow="COMMUNITY PERFORMANCE"
      title="Leaderboards"
      subtitle="See how citizens and local areas are contributing to a cleaner city."
    >

      <div className="leaderboard-grid">

        <div className="leaderboard-card">

          <div className="leaderboard-title">
            <Trophy size={19} />

            <div>
              <h2>
                Citizen Leaderboard
              </h2>

              <span>
                Verified recycling & waste contributions
              </span>
            </div>
          </div>


          {citizens.map(([name, points], index) => (

            <div
              className="leaderboard-row"
              key={name}
            >

              <div className="rank">
                {index + 1}
              </div>

              <strong>
                {name}
              </strong>

              <span>
                {points}
              </span>

            </div>

          ))}

        </div>


        <div className="leaderboard-card">

          <div className="leaderboard-title">
            <MapPinnedIcon />

            <div>
              <h2>
                Area Leaderboard
              </h2>

              <span>
                Based on collection & field feedback
              </span>
            </div>
          </div>


          {areas.map(([area, score], index) => (

            <div
              className="leaderboard-row"
              key={area}
            >

              <div className="rank">
                {index + 1}
              </div>

              <strong>
                {area}
              </strong>

              <span>
                {score}
              </span>

            </div>

          ))}

        </div>

      </div>

    </CollectorShell>
  )
}


function CollectorShell({
  eyebrow,
  title,
  subtitle,
  children
}) {
  return (
    <div className="collector-page">

      <div className="collector-heading">

        <div>

          <span className="collector-eyebrow">
            {eyebrow}
          </span>

          <h1>
            {title}
          </h1>

          <p>
            {subtitle}
          </p>

        </div>

      </div>

      {children}

      <style>{collectorStyles}</style>

    </div>
  )
}


function CollectorStat({
  icon,
  value,
  label
}) {
  return (
    <div className="collector-stat">

      <div className="collector-stat-icon">
        {icon}
      </div>

      <strong>
        {value}
      </strong>

      <span>
        {label}
      </span>

    </div>
  )
}


function TrashIcon() {
  return <TrashIconInner />
}

function TrashIconInner() {
  return (
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        background: "#08765c",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Truck size={14} />
    </div>
  )
}


function MapPinnedIcon() {
  return <MapPin size={19} />
}


const collectorStyles = `

.collector-page {
  max-width: 1180px;
  margin: 0 auto;
  padding: 8px 0 45px;
  color: #173d35;
}

.collector-heading {
  margin-bottom: 20px;
}

.collector-eyebrow {
  color: #08765c;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: .08em;
}

.collector-heading h1 {
  margin: 5px 0 6px;
  color: #063d33;
  font-size: 30px;
  letter-spacing: -.03em;
}

.collector-heading p {
  margin: 0;
  color: #71807b;
  font-size: 11px;
}

.collector-stat-grid {
  display: grid;
  grid-template-columns: repeat(4,1fr);
  gap: 11px;
  margin-bottom: 15px;
}

.collector-stat {
  padding: 15px;
  background: white;
  border: 1px solid #d7e0dd;
  border-radius: 11px;
}

.collector-stat-icon {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: #e7f5f0;
  color: #08765c;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 9px;
}

.collector-stat strong {
  display: block;
  font-size: 20px;
}

.collector-stat span {
  color: #7b8883;
  font-size: 8px;
}

.collector-main-grid {
  display: grid;
  grid-template-columns: 1.25fr .75fr;
  gap: 13px;
}

.collector-card {
  padding: 17px;
  background: white;
  border: 1px solid #d7e0dd;
  border-radius: 11px;
}

.collector-card-heading {
  display: flex;
  justify-content: space-between;
  color: #08765c;
}

.collector-card-heading h2 {
  margin: 0;
  color: #173d35;
  font-size: 14px;
}

.collector-card-heading span {
  display: block;
  margin-top: 4px;
  color: #87938f;
  font-size: 8px;
}

.route-progress {
  margin: 20px 0 13px;
}

.route-progress-bar {
  height: 7px;
  border-radius: 6px;
  background: #edf2f0;
}

.route-progress-bar div {
  height: 100%;
  border-radius: 6px;
  background: #08765c;
}

.route-progress span {
  display: block;
  margin-top: 5px;
  color: #7b8883;
  font-size: 8px;
}

.collector-list-row {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 10px 0;
  border-bottom: 1px solid #edf1ef;
}

.collector-number,
.route-number {
  width: 27px;
  height: 27px;
  border-radius: 7px;
  background: #e8f5f1;
  color: #08765c;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 800;
}

.collector-list-row div:nth-child(2) {
  flex: 1;
}

.collector-list-row strong,
.collector-list-row span {
  display: block;
}

.collector-list-row strong {
  font-size: 9px;
}

.collector-list-row span {
  margin-top: 3px;
  color: #84908c;
  font-size: 8px;
}

.collector-list-row b {
  font-size: 8px;
  color: #64736d;
}

.collector-primary-button,
.collector-secondary-button {
  margin-top: 14px;
  height: 35px;
  padding: 0 13px;
  border-radius: 7px;
  font-size: 8px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.collector-primary-button {
  border: none;
  background: #004d3c;
  color: white;
}

.collector-secondary-button {
  border: 1px solid #08765c;
  background: white;
  color: #08765c;
}

.area-condition {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid #edf1ef;
}

.area-condition strong,
.area-condition span {
  display: block;
}

.area-condition strong {
  font-size: 9px;
}

.area-condition span {
  margin-top: 3px;
  color: #84908c;
  font-size: 8px;
}

.area-condition b {
  padding: 4px 7px;
  border-radius: 5px;
  background: #e8f5f1;
  color: #08765c;
  font-size: 7px;
}

.area-condition b.attention {
  background: #fff3df;
  color: #b87520;
}

.collector-route-header {
  padding: 15px;
  margin-bottom: 12px;
  border: 1px solid #d7e0dd;
  border-radius: 10px;
  background: white;
  display: flex;
  justify-content: space-between;
}

.collector-route-header strong,
.collector-route-header span {
  display: block;
}

.collector-route-header strong {
  font-size: 12px;
}

.collector-route-header span {
  margin-top: 4px;
  color: #7b8883;
  font-size: 8px;
}

.route-status {
  padding: 6px 9px;
  border-radius: 6px;
  background: #e8f5f1;
  color: #08765c;
  font-size: 8px;
  font-weight: 700;
}

.collector-route-list {
  background: white;
  border: 1px solid #d7e0dd;
  border-radius: 11px;
  overflow: hidden;
}

.collector-route-item {
  min-height: 60px;
  padding: 10px 14px;
  display: grid;
  grid-template-columns: 35px 1fr 90px 75px 80px;
  align-items: center;
  gap: 10px;
  border-bottom: 1px solid #edf1ef;
}

.route-location strong,
.route-location span {
  display: flex;
  align-items: center;
  gap: 4px;
}

.route-location strong {
  font-size: 9px;
}

.route-location span {
  margin-top: 3px;
  color: #84908c;
  font-size: 8px;
}

.route-waste,
.route-time {
  color: #687771;
  font-size: 8px;
}

.route-completed,
.route-pending {
  font-size: 8px;
  font-weight: 700;
}

.route-completed {
  color: #08765c;
}

.route-pending {
  color: #b87520;
}

.collector-map {
  height: 420px;
  position: relative;
  overflow: hidden;
  border: 1px solid #d1dcd8;
  border-radius: 12px;
  background:
    linear-gradient(25deg, transparent 47%, #d9e2df 48%, #d9e2df 50%, transparent 51%),
    linear-gradient(115deg, transparent 47%, #d9e2df 48%, #d9e2df 50%, transparent 51%),
    #edf3f1;
}

.map-road {
  position: absolute;
  background: #ffffff;
  border: 1px solid #d5dfdc;
}

.road-one {
  width: 120%;
  height: 45px;
  left: -10%;
  top: 42%;
  transform: rotate(-8deg);
}

.road-two {
  width: 45px;
  height: 120%;
  left: 48%;
  top: -10%;
  transform: rotate(12deg);
}

.road-three {
  width: 90%;
  height: 35px;
  left: 5%;
  top: 72%;
  transform: rotate(5deg);
}

.map-area-label {
  position: absolute;
  color: #78908a;
  font-size: 12px;
  font-weight: 700;
}

.label-one {
  left: 14%;
  top: 22%;
}

.label-two {
  left: 58%;
  top: 30%;
}

.label-three {
  left: 70%;
  top: 73%;
}

.map-marker {
  position: absolute;
}

.marker-one {
  left: 28%;
  top: 39%;
}

.marker-two {
  left: 61%;
  top: 48%;
}

.marker-three {
  left: 72%;
  top: 68%;
}

.collector-location {
  position: absolute;
  left: 48%;
  top: 54%;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #004d3c;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid white;
  box-shadow: 0 2px 10px rgba(0,0,0,.15);
}

.map-legend {
  position: absolute;
  left: 15px;
  bottom: 15px;
  padding: 9px 11px;
  border-radius: 8px;
  background: white;
  display: flex;
  gap: 13px;
  box-shadow: 0 2px 8px rgba(0,0,0,.08);
}

.map-legend span {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 8px;
}

.map-legend i {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.legend-full {
  background: #08765c;
}

.legend-empty {
  background: #aebbb7;
}

.legend-truck {
  background: #004d3c;
}

.map-bottom-info {
  margin-top: 10px;
  padding: 12px 15px;
  border: 1px solid #d7e0dd;
  border-radius: 9px;
  background: white;
  display: flex;
  align-items: center;
  gap: 30px;
}

.map-bottom-info div {
  flex: 1;
}

.map-bottom-info strong,
.map-bottom-info span {
  display: block;
}

.map-bottom-info strong {
  font-size: 9px;
}

.map-bottom-info span {
  margin-top: 3px;
  color: #84908c;
  font-size: 8px;
}

.pickup-list {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.pickup-card {
  padding: 14px;
  border: 1px solid #d7e0dd;
  border-radius: 10px;
  background: white;
  display: flex;
  align-items: center;
  gap: 11px;
}

.pickup-icon {
  width: 38px;
  height: 38px;
  border-radius: 8px;
  background: #e8f5f1;
  color: #08765c;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pickup-info {
  flex: 1;
}

.pickup-info strong,
.pickup-info span,
.pickup-info small {
  display: block;
}

.pickup-info strong {
  font-size: 10px;
}

.pickup-info span {
  margin-top: 3px;
  display: flex;
  align-items: center;
  gap: 3px;
  color: #77847f;
  font-size: 8px;
}

.pickup-info small {
  margin-top: 4px;
  color: #9aa49f;
  font-size: 7px;
}

.pickup-completed,
.pickup-pending {
  font-size: 8px;
  font-weight: 700;
}

.pickup-completed {
  color: #08765c;
}

.pickup-pending {
  color: #b87520;
}

.pickup-complete-button {
  height: 31px;
  padding: 0 10px;
  border: 1px solid #08765c;
  border-radius: 6px;
  background: white;
  color: #08765c;
  font-size: 8px;
  font-weight: 700;
}

.feedback-layout {
  display: grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 13px;
}

.feedback-card {
  padding: 20px;
  border: 1px solid #d7e0dd;
  border-radius: 11px;
  background: white;
}

.feedback-card h2 {
  margin: 0;
  font-size: 17px;
}

.feedback-card p {
  margin: 5px 0 20px;
  color: #7b8883;
  font-size: 9px;
}

.feedback-card > label {
  display: block;
  margin: 13px 0 6px;
  color: #52635d;
  font-size: 9px;
  font-weight: 700;
}

.feedback-card select,
.feedback-card textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #d5dfdc;
  border-radius: 7px;
  background: white;
  padding: 9px;
  font-size: 9px;
  outline: none;
}

.feedback-options {
  display: flex;
  gap: 6px;
}

.feedback-options button {
  flex: 1;
  height: 34px;
  border: 1px solid #d5dfdc;
  border-radius: 6px;
  background: white;
  color: #52635d;
  font-size: 8px;
}

.feedback-checks {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.feedback-checks label {
  color: #687771;
  font-size: 8px;
}

.feedback-checks input {
  margin-right: 6px;
}

.feedback-card textarea {
  min-height: 90px;
  resize: vertical;
}

.feedback-side {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feedback-side .collector-card svg {
  color: #08765c;
}

.feedback-side h3 {
  margin: 10px 0 5px;
  font-size: 13px;
}

.feedback-side p {
  color: #7b8883;
  font-size: 9px;
  line-height: 1.5;
}

.leaderboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 13px;
}

.leaderboard-card {
  padding: 18px;
  border: 1px solid #d7e0dd;
  border-radius: 11px;
  background: white;
}

.leaderboard-title {
  display: flex;
  gap: 9px;
  color: #08765c;
  margin-bottom: 12px;
}

.leaderboard-title h2 {
  margin: 0;
  color: #173d35;
  font-size: 14px;
}

.leaderboard-title span {
  display: block;
  margin-top: 4px;
  color: #87938f;
  font-size: 8px;
}

.leaderboard-row {
  min-height: 45px;
  display: grid;
  grid-template-columns: 30px 1fr auto;
  align-items: center;
  gap: 9px;
  border-bottom: 1px solid #edf1ef;
}

.leaderboard-row:last-child {
  border-bottom: none;
}

.rank {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background: #e8f5f1;
  color: #08765c;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  font-weight: 800;
}

.leaderboard-row strong {
  font-size: 9px;
}

.leaderboard-row > span {
  color: #08765c;
  font-size: 8px;
  font-weight: 700;
}

@media (max-width: 850px) {
  .collector-stat-grid {
    grid-template-columns: repeat(2,1fr);
  }

  .collector-main-grid,
  .feedback-layout,
  .leaderboard-grid {
    grid-template-columns: 1fr;
  }

  .collector-route-item {
    grid-template-columns: 30px 1fr 70px;
  }

  .route-waste,
  .route-time {
    display: none;
  }
}

`
  
export default Collector