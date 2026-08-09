import {
  LayoutDashboard,
  Trash2,
  Truck,
  Recycle,
  Gift,
  Store,
  MapPinned,
  Smartphone,
  BarChart3,
  UserRound,
  MessageSquareWarning,
  Navigation,
  ClipboardCheck,
  Map,
  Trophy,
  Radio
} from "lucide-react"

import { NavLink } from "react-router-dom"

function Sidebar({ role, setRole }) {

  const municipalItems = [
    ["Dashboard", "/", LayoutDashboard],
    ["Smart Bins", "/bins", Trash2],
    ["Garbage Hotspots", "/hotspots", MapPinned],

    // NEW MUNICIPAL TRUCK TRACKER
    ["Garbage Truck Tracker", "/truck-tracker", Radio],

    ["Collection Routes", "/routes", Truck],
    ["Waste Verification", "/verification", Recycle],
    ["E-Waste Management", "/e-waste", Smartphone],
    ["Citizen Complaints", "/complaints", MessageSquareWarning],
    ["Reports & Analytics", "/analytics", BarChart3]
  ]


  const citizenItems = [
    ["Dashboard", "/", LayoutDashboard],
    ["Log Waste", "/verification", Recycle],
    ["E-Waste", "/e-waste", Smartphone],
    ["Rewards", "/rewards", Gift],
    ["Marketplace", "/marketplace", Store],
    ["Leaderboards", "/leaderboards", Trophy]
  ]


  const collectorItems = [
    ["Dashboard", "/collector", LayoutDashboard],
    ["Today's Routes", "/collector/routes", Navigation],
    ["Live Map", "/collector/map", Map],
    ["Assigned Pickups", "/collector/pickups", ClipboardCheck],
    ["Area Feedback", "/collector/feedback", MessageSquareWarning],
    ["Leaderboards", "/leaderboards", Trophy]
  ]


  const recyclerItems = [
    ["Dashboard", "/", LayoutDashboard],
    ["Collection Routes", "/routes", Truck],
    ["Waste Verification", "/verification", Recycle],
    ["Smart Bins", "/bins", Trash2],
    ["Marketplace", "/marketplace", Store]
  ]


  let items = municipalItems


  if (role === "CITIZEN") {
    items = citizenItems
  }


  if (role === "COLLECTOR") {
    items = collectorItems
  }


  if (role === "RECYCLER") {
    items = recyclerItems
  }


  return (

    <aside className="sidebar">

      {/* BRAND */}

      <div className="sidebar-brand">

        <div className="brand-mark">
          ♻
        </div>

        <div>
          <h2>CWMS</h2>
          <span>Waste Management</span>
        </div>

      </div>


      {/* ROLE SWITCHER */}

      <div
        style={{
          margin: "0 14px 14px",
          padding: "10px",
          borderRadius: "9px",
          background: "rgba(255,255,255,0.06)"
        }}
      >

        <span
          style={{
            display: "block",
            marginBottom: "6px",
            color: "#8da49c",
            fontSize: "9px",
            textTransform: "uppercase",
            letterSpacing: ".06em"
          }}
        >
          Current Role
        </span>


        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            width: "100%",
            height: "32px",
            borderRadius: "6px",
            background: "#123c31",
            color: "white",
            border: "1px solid rgba(255,255,255,.15)",
            padding: "0 7px",
            fontSize: "10px"
          }}
        >

          <option value="ADMIN">
            Municipal Authority
          </option>

          <option value="COLLECTOR">
            Waste Collector
          </option>

          <option value="CITIZEN">
            Citizen / User
          </option>

          <option value="RECYCLER">
            Recycling Partner
          </option>

        </select>

      </div>


      {/* NAVIGATION */}

      <nav className="sidebar-nav">

        {items.map(([name, path, Icon]) => (

          <NavLink
            key={name}
            to={path}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >

            <Icon size={19} />

            <span>
              {name}
            </span>

          </NavLink>

        ))}

      </nav>


      {/* USER INFO */}

      <div
        style={{
          marginTop: "auto",
          padding: "14px",
          borderTop: "1px solid rgba(255,255,255,.08)"
        }}
      >

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "9px"
          }}
        >

          <div
            style={{
              width: "31px",
              height: "31px",
              borderRadius: "50%",
              background: "#dff4ed",
              color: "#075b49",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >

            <UserRound size={16} />

          </div>


          <div>

            <strong
              style={{
                display: "block",
                color: "white",
                fontSize: "10px"
              }}
            >

              {role === "ADMIN"
                ? "City Admin"
                : role === "COLLECTOR"
                ? "Collection Team"
                : role === "RECYCLER"
                ? "Recycler Admin"
                : "Citizen"}

            </strong>


            <span
              style={{
                display: "block",
                marginTop: "2px",
                color: "#8da49c",
                fontSize: "8px"
              }}
            >

              {role === "ADMIN"
                ? "Municipal Authority"
                : role === "COLLECTOR"
                ? "Waste Collection Unit"
                : role === "RECYCLER"
                ? "Recycling Partner"
                : "Community Member"}

            </span>

          </div>

        </div>

      </div>


      {/* FOOTER */}

      <div className="sidebar-bottom">

        <span>
          Community Waste Management
        </span>

        <small>
          v1.0 Prototype
        </small>

      </div>

    </aside>
  )
}

export default Sidebar