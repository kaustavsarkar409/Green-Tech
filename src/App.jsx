import { BrowserRouter, Routes, Route } from "react-router-dom"

import Layout from "./layouts/Layout"

import Dashboard from "./pages/Dashboard"
import SmartBins from "./pages/SmartBins"
import CollectionRoutes from "./pages/Routes"
import WasteVerification from "./pages/WasteVerification"
import Rewards from "./pages/Rewards"
import Marketplace from "./pages/Marketplace"

function App() {
  return (
    <BrowserRouter>
      <Layout>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/bins" element={<SmartBins />} />
          <Route path="/routes" element={<CollectionRoutes />} />
          <Route path="/verification" element={<WasteVerification />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/marketplace" element={<Marketplace />} />
        </Routes>

      </Layout>
    </BrowserRouter>
  )
}

export default App