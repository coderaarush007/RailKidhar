import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import TopBar from "../components/common/TopBar";
import MobileTabBar from "../components/common/MobileTabBar";
import SimModeBadge from "../components/common/SimModeBadge";
import Icon from "../components/common/Icon";
import LanguageSwitcher from "../components/common/LanguageSwitcher";
import BrandPromoCard from "../components/common/BrandPromoCard";
import { useSimulation } from "../context/SimulationContext";
import "./PassengerLayout.css";

const NAV_ITEMS = [
  { to: "/", label: "Home", icon: "home", end: true },
  { to: "/live-tracking", label: "Live Tracking", icon: "radar" },
  { to: "/my-trains", label: "My Trains", icon: "ticket" },
  { to: "/alerts", label: "Alerts", icon: "bell" },
  { to: "/pnr-check", label: "PNR Check", icon: "search" },
  { to: "/stations", label: "Stations", icon: "mappin" },
  { to: "/settings", label: "Settings", icon: "settings" },
  { to: "/help", label: "Help & Support", icon: "lifeBuoy" },
];

export default function PassengerLayout() {
  const navigate = useNavigate();
  const { isRunning, lastUpdated } = useSimulation();
  const secondsAgo = Math.floor((Date.now() - lastUpdated) / 1000);

  const handleSearch = (query) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/live-tracking?train=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="rk-app-shell">
      <Sidebar
        subtitle="Track Smarter. Travel Safer."
        navItems={NAV_ITEMS}
        footer={
          <div className="rk-sidebar-footer-stack">
            <BrandPromoCard title="Bharat ki Rail," subtitle="Aapke Haath." />
            <SimModeBadge />
          </div>
        }
      />
      <div className="rk-app-main">
        <TopBar
          searchPlaceholder="Search train number or name (e.g. 12951 Rajdhani)"
          onSearchSubmit={handleSearch}
          isRunning={isRunning}
          secondsAgo={secondsAgo}
        >
          <LanguageSwitcher />
          <button type="button" className="rk-icon-btn" aria-label="Alerts" onClick={() => navigate("/alerts")}>
            <Icon name="bell" size={18} />
          </button>
          <button type="button" className="rk-icon-btn" aria-label="My Trains" onClick={() => navigate("/my-trains")}>
            <Icon name="ticket" size={18} />
          </button>
          <div className="rk-profile-chip" aria-label="Aarush, signed in passenger">
            AS
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
