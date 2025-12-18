import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  Factory,
  Coins,
  Palette,
  Flame,
  Sparkles,
  ShieldCheck,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const menuItems = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Production Tracking",
    icon: Factory,
    path: "/production",
    phase: 1,
  },
  {
    title: "Material & Cost",
    icon: Coins,
    path: "/material-cost",
    phase: 2,
  },
  {
    title: "Design & CAD/CAM",
    icon: Palette,
    path: "/design-cad",
    phase: 3,
  },
  {
    title: "Casting",
    icon: Flame,
    path: "/casting",
    phase: 4,
  },
  {
    title: "Finishing",
    icon: Sparkles,
    path: "/finishing",
    phase: 5,
  },
  {
    title: "Quality Control",
    icon: ShieldCheck,
    path: "/quality-control",
    phase: 6,
  },
  {
    title: "Executive",
    icon: TrendingUp,
    path: "/executive",
    phase: 7,
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside
      className={cn(
        "h-screen bg-sidebar sticky top-0 flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <span className="text-xl font-bold text-sidebar-foreground drop-shadow-[0_0_6px_rgba(255,215,0,0.6)]">
            💎 Jewel Integra
          </span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn("sidebar-item", isActive && "sidebar-item-active")}
              title={collapsed ? item.title : undefined}
            >
              <item.icon size={20} />
              {!collapsed && (
                <span className="flex-1 truncate">{item.title}</span>
              )}
              {!collapsed && item.phase && (
                <span className="text-xs px-1.5 py-0.5 rounded bg-sidebar-accent text-sidebar-muted">
                  P{item.phase}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User & Logout */}
      <div className="p-3 border-t border-sidebar-border">
        {!collapsed && user && (
          <div className="mb-2 px-2">
            <p className="text-sm font-medium text-sidebar-foreground truncate">{user.name}</p>
            <p className="text-xs text-sidebar-muted truncate">{user.username}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors",
            collapsed && "justify-center"
          )}
          title={collapsed ? "Logout" : undefined}
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
