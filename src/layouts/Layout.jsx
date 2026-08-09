import { useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar"

function Layout() {
  const [role, setRole] = useState("ADMIN")

  const roleInfo = {
    ADMIN: {
      label: "Municipal Operations",
      title: "Community Waste Management",
      name: "City Admin",
      subtitle: "Waste Management Dept",
      avatar: "A"
    },

    CITIZEN: {
      label: "Citizen Portal",
      title: "My Waste Impact",
      name: "Citizen",
      subtitle: "Community Member",
      avatar: "C"
    },

    RECYCLER: {
      label: "Recycler Portal",
      title: "Recycling Marketplace",
      name: "Recycler",
      subtitle: "Marketplace Partner",
      avatar: "R"
    },
    COLLECTOR: {
  label: "Collection Operations",
  title: "Collector Dashboard",
  name: "Collection Team",
  subtitle: "Waste Collection Unit",
  avatar: "K"
}
  }

  const current = roleInfo[role]

  return (
    <div className="app-layout">

      <Sidebar
        role={role}
        setRole={setRole}
      />

      <main className="main-area">

        <header className="topbar">

          <div>
            <span className="topbar-label">
              {current.label}
            </span>

            <h2>
              {current.title}
            </h2>
          </div>

          <div className="user-area">

            <div className="notification">
              🔔
            </div>

            <div className="user-avatar">
              {current.avatar}
            </div>

            <div>
              <strong>
                {current.name}
              </strong>

              <span>
                {current.subtitle}
              </span>
            </div>

          </div>

        </header>

        <section className="page-content">
          <Outlet />
        </section>

      </main>

    </div>
  )
}

export default Layout