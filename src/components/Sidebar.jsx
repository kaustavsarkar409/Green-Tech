import {
  LayoutDashboard,
  Trash2,
  Truck,
  Recycle,
  Gift,
  Store
} from "lucide-react"

import { NavLink } from "react-router-dom"

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-brand">
        <div className="brand-mark">♻</div>

        <div>
          <h2>CWMS</h2>
          <span>Waste Management</span>
        </div>
      </div>

      <nav className="sidebar-nav">

        <NavLink to="/" className="nav-item">
          <LayoutDashboard size={19} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/bins" className="nav-item">
          <Trash2 size={19} />
          <span>Smart Bins</span>
        </NavLink>

        <NavLink to="/routes" className="nav-item">
          <Truck size={19} />
          <span>Collection Routes</span>
        </NavLink>

        <NavLink to="/verification" className="nav-item">
          <Recycle size={19} />
          <span>Waste Verification</span>
        </NavLink>

        <NavLink to="/rewards" className="nav-item">
          <Gift size={19} />
          <span>Rewards</span>
        </NavLink>

        <NavLink to="/marketplace" className="nav-item">
          <Store size={19} />
          <span>Marketplace</span>
        </NavLink>

      </nav>

      <div className="sidebar-bottom">
        <span>Community Waste Management</span>
        <small>v1.0 Prototype</small>
      </div>

    </aside>
  )
}

export default Sidebar