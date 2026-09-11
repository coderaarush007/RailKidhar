import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SimulationProvider } from "./context/SimulationContext";

import PassengerLayout from "./layouts/PassengerLayout";
import AdminLayout from "./layouts/AdminLayout";

import Home from "./pages/passenger/Home";
import LiveTracking from "./pages/passenger/LiveTracking";
import MyTrains from "./pages/passenger/MyTrains";
import Alerts from "./pages/passenger/Alerts";
import Stations from "./pages/passenger/Stations";
import Settings from "./pages/passenger/Settings";
import PnrCheck from "./pages/passenger/PnrCheck";
import HelpSupport from "./pages/passenger/HelpSupport";

import Dashboard from "./pages/admin/Dashboard";
import LiveTrains from "./pages/admin/LiveTrains";
import TrainIntelligence from "./pages/admin/TrainIntelligence";
import Network from "./pages/admin/Network";
import AdminAlerts from "./pages/admin/AdminAlerts";
import Analytics from "./pages/admin/Analytics";

export default function App() {
  return (
    <SimulationProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PassengerLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/live-tracking" element={<LiveTracking />} />
            <Route path="/my-trains" element={<MyTrains />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/pnr-check" element={<PnrCheck />} />
            <Route path="/stations" element={<Stations />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<HelpSupport />} />
          </Route>

          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/live-trains" element={<LiveTrains />} />
            <Route path="/admin/live-trains/:trainNumber" element={<TrainIntelligence />} />
            <Route path="/admin/network" element={<Network />} />
            <Route path="/admin/alerts" element={<AdminAlerts />} />
            <Route path="/admin/stations" element={<Stations />} />
            <Route path="/admin/analytics" element={<Analytics />} />
            <Route path="/admin/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SimulationProvider>
  );
}
