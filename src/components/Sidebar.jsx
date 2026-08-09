import {
  LayoutDashboard,
  Trash2,
  Truck,
  Recycle,
  Gift,
  Store,
  MapPinned,
  Camera,
  Smartphone,
  Package
} from "lucide-react"

import { NavLink } from "react-router-dom"

function Sidebar({ role, setRole }) {

  const panels = {

    ADMIN: {
      title: "Municipal Operations",
      subtitle: "Waste Management Dept",

      items: [
        ["Dashboard", "/", LayoutDashboard],
        ["Smart Bins", "/bins", Trash2],
        ["Garbage Hotspots", "/hotspots", MapPinned],
        ["Collection Routes", "/routes", Truck],
        ["Waste Verification", "/verification", Recycle],
        ["E-Waste", "/e-waste", Smartphone],
        ["Rewards", "/rewards", Gift],
        ["Marketplace", "/marketplace", Store]
      ]
    },

    CITIZEN: {
      title: "Citizen Portal",
      subtitle: "Community Member",

      items: [
        ["Home", "/", LayoutDashboard],
        ["Log Waste", "/verification", Camera],
        ["E-Waste", "/e-waste", Smartphone],
        ["Rewards", "/rewards", Gift],
        ["Market", "/marketplace", Store]
      ]
    },

    RECYCLER: {
      title: "Recycler Portal",
      subtitle: "Marketplace Partner",

      items: [
        ["Dashboard", "/", LayoutDashboard],
        ["Browse Materials", "/marketplace", Store],
        ["My Listings", "/marketplace", Package],
        ["Collection Activity", "/routes", Truck]
      ]
    }

  }

  const panel = panels[role] || panels.ADMIN

  return (
    <aside className="sidebar">

      <div className="sidebar-brand">

        <div className="brand-mark">
          ♻
        </div>

        <div>
          <h2>CWMS</h2>
          <span>Waste Management</span>
        </div>

      </div>


      <div
        style={{
          padding: "14px 12px",
          borderBottom: "1px solid #dce1eb"
        }}
      >

        <label
          style={{
            display: "block",
            fontSize: "10px",
            fontWeight: "700",
            color: "#68736f",
            marginBottom: "6px",
            textTransform: "uppercase",
            letterSpacing: "0.06em"
          }}
        >
          View as
        </label>

        <select
          value={role}
          onChange={(event) => setRole(event.target.value)}
          style={{
            width: "100%",
            height: "36px",
            padding: "0 9px",
            borderRadius: "8px",
            border: "1px solid #cfd7d3",
            background: "#ffffff",
            color: "#063d33",
            fontSize: "12px",
            fontWeight: "600",
            outline: "none"
          }}
        >

          <option value="ADMIN">
            Municipal Admin
          </option>

          <option value="CITIZEN">
            Citizen
          </option>

          <option value="RECYCLER">
            Recycler
          </option>

        </select>

      </div>


      <div className="sidebar-role">

        <strong>
          {panel.title}
        </strong>

        <span>
          {panel.subtitle}
        </span>

      </div>


      <nav className="sidebar-nav">

        {panel.items.map(([label, path, Icon]) => (

          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `nav-item ${isActive ? "active" : ""}`
            }
          >

            <Icon size={19} />

            <span>
              {label}
            </span>

          </NavLink>

        ))}

      </nav>


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