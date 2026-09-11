import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import TopBar from "../components/common/TopBar";
import MobileTabBar from "../components/common/MobileTabBar";
import SimModeBadge from "../components/common/SimModeBadge";
import Icon from "../components/common/Icon";
import BrandPromoCard from "../components/common/BrandPromoCard";
import { useSimulation } from "../context/SimulationContext";
import "./AdminLayout.css";

const NAV_ITEMS = [
  { to: "/admin", label: "Dashboard", icon: "home", end: true },
  { to: "/admin/live-trains", label: "Live Trains", icon: "train" },
  { to: "/admin/network", label: "Network", icon: "route" },
  { to: "/admin/alerts", label: "Alerts", icon: "bell" },
  { to: "/admin/stations", label: "Stations", icon: "mappin" },
  { to: "/admin/analytics", label: "Analytics", icon: "barChart" },
  { to: "/admin/settings", label: "Settings", icon: "settings" },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const { isRunning, lastUpdated } = useSimulation();
  const secondsAgo = Math.floor((Date.now() - lastUpdated) / 1000);

  const handleSearch = (query) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/admin/live-trains?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="rk-app-shell">
      <Sidebar
        subtitle="Operations Control"
        navItems={NAV_ITEMS}
        footer={
          <div className="rk-sidebar-footer-stack">
            <BrandPromoCard title="Safer Trains, Smoother Journeys" subtitle="A Stronger India" />
            <SimModeBadge />
          </div>
        }
      />
      <div className="rk-app-main">
        <TopBar
          searchPlaceholder="Search train number, station or section... (e.g. 12951, Vadodara)"
          onSearchSubmit={handleSearch}
          isRunning={isRunning}
          secondsAgo={secondsAgo}
        >
          <button type="button" className="rk-icon-btn" aria-label="Alerts" onClick={() => navigate("/admin/alerts")}>
            <Icon name="bell" size={18} />
          </button>
          <div className="rk-admin-profile">
            <div className="rk-profile-chip">AS</div>
            <div className="rk-admin-profile-text rk-hide-tablet">
              <p>Admin</p>
              <span>Western Railway</span>
            </div>
          </div>
        </TopBar>
        <main className="rk-app-content">
          <Outlet />
        </main>
      </div>
      <MobileTabBar navItems={NAV_ITEMS} />
    </div>
  );
}
