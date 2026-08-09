import "./App.css"

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import Layout from "./layouts/Layout"

import Dashboard from "./pages/Dashboard"
import SmartBins from "./pages/SmartBins"
import CollectionRoutes from "./pages/Routes"
import WasteVerification from "./pages/WasteVerification"
import Rewards from "./pages/Rewards"
import Marketplace from "./pages/Marketplace"
import Hotspots from "./pages/Hotspots"
import EWaste from "./pages/EWaste"
import Complaints from "./pages/Complaints"
import Analytics from "./pages/Analytics"
import GarbageTruckTracker from "./pages/GarbageTruckTracker"

import Collector, {
  Leaderboards
} from "./pages/Collector"

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route element={<Layout />}>

          {/* MUNICIPAL */}

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/bins"
            element={<SmartBins />}
          />

          <Route
            path="/smart-bins"
            element={<SmartBins />}
          />

          <Route
            path="/hotspots"
            element={<Hotspots />}
          />

          {/* MUNICIPAL GARBAGE TRUCK TRACKER */}

          <Route
            path="/truck-tracker"
            element={<GarbageTruckTracker />}
          />

          <Route
            path="/routes"
            element={<CollectionRoutes />}
          />

          <Route
            path="/verification"
            element={<WasteVerification />}
          />

          <Route
            path="/waste-verification"
            element={<WasteVerification />}
          />

          <Route
            path="/e-waste"
            element={<EWaste />}
          />

          <Route
            path="/complaints"
            element={<Complaints />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />


          {/* CITIZEN */}

          <Route
            path="/rewards"
            element={<Rewards />}
          />

          <Route
            path="/marketplace"
            element={<Marketplace />}
          />

          <Route
            path="/leaderboards"
            element={<Leaderboards />}
          />


          {/* COLLECTOR */}

          <Route
            path="/collector"
            element={<Collector />}
          />

          <Route
            path="/collector/routes"
            element={<Collector />}
          />

          <Route
            path="/collector/map"
            element={<Collector />}
          />

          <Route
            path="/collector/pickups"
            element={<Collector />}
          />

          <Route
            path="/collector/feedback"
            element={<Collector />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App