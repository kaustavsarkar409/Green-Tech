import Sidebar from "../components/Sidebar"

function Layout({ children }) {
  return (
    <div className="app-layout">

      <Sidebar />

      <main className="main-area">

        <header className="topbar">
          <div>
            <span className="topbar-label">Municipal Operations</span>
            <h2>Community Waste Management</h2>
          </div>

          <div className="user-area">
            <div className="notification">🔔</div>

            <div className="user-avatar">
              A
            </div>

            <div>
              <strong>Admin</strong>
              <span>Municipal Authority</span>
            </div>
          </div>
        </header>

        <section className="page-content">
          {children}
        </section>

      </main>

    </div>
  )
}

export default Layout