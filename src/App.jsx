import { BrowserRouter, Routes, Route } from "react-router-dom"

import Layout from "./layouts/Layout"

import Dashboard from "./pages/Dashboard"
import SmartBins from "./pages/SmartBins"
import CollectionRoutes from "./pages/Routes"
import WasteVerification from "./pages/WasteVerification"
import Rewards from "./pages/Rewards"
import Marketplace from "./pages/Marketplace"
import Hotspots from "./pages/Hotspots"
import EWaste from "./pages/EWaste"

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route element={<Layout />}>

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
            path="/rewards"
            element={<Rewards />}
          />

          <Route
            path="/marketplace"
            element={<Marketplace />}
          />

        </Route>

      </Routes>

    </BrowserRouter>
  )
}

export default App