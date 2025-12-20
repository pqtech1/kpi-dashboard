import { NavLink, useLocation } from "react-router-dom";
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
  Package,
  Menu,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

/* ---------------- MENU CONFIG ---------------- */

const menuItems = [
  { title: "Overview", icon: LayoutDashboard, path: "/" },
  { title: "Production Tracking", icon: Factory, path: "/production" },
  { title: "Material & Cost", icon: Coins, path: "/material-cost" },
  { title: "Design & CAD/CAM", icon: Palette, path: "/design-cad" },
  { title: "Casting", icon: Flame, path: "/casting" },
  { title: "Finishing", icon: Sparkles, path: "/finishing" },
  { title: "Quality Control", icon: ShieldCheck, path: "/quality-control" },
  { title: "Executive", icon: TrendingUp, path: "/executive" },
  {
    title: "Our Expertise",
    icon: Package,
    path: "/pq-offering",
    type: "service",
  },
];

const openLink = (url: string) =>
  window.open(url, "_blank", "noopener,noreferrer");

/* ---------------- SIDEBAR CONTENT ---------------- */

function SidebarContent({
  collapsed,
  onCollapse,
}: {
  collapsed: boolean;
  onCollapse?: () => void;
}) {
  const location = useLocation();

  return (
    <div className="h-full flex flex-col bg-sidebar">
      {/* ---------- TOP LOGO ---------- */}
      <div className="h-16 shrink-0 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed ? (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => openLink("https://techupgrad.in/kpi/")}
          >
            <img
              src="/pq-jewel-pulse.png"
              alt="Jewel INTEGRA Logo"
              className="h-8 w-8 object-contain"
            />
            <span className="text-xl font-bold text-sidebar-foreground whitespace-nowrap">
              Jewel INTEGRA
            </span>
          </div>
        ) : (
          <img
            src="/pq-jewel-pulse.png"
            alt="Logo"
            className="h-8 w-8 object-contain mx-auto"
          />
        )}

        {onCollapse && (
          <button
            onClick={onCollapse}
            className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/70"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        )}
      </div>

      {/* ---------- NAVIGATION ---------- */}
      <nav className="flex-1 py-4 px-2 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-sidebar-accent scrollbar-track-transparent">
        {/* MAIN MENU */}
        <div className="space-y-1">
          {menuItems
            .filter((i) => i.type !== "service")
            .map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "sidebar-item min-w-0 w-full",
                    isActive && "sidebar-item-active",
                    collapsed && "justify-center px-2"
                  )}
                  title={collapsed ? item.title : undefined}
                >
                  <item.icon size={20} className="shrink-0" />
                  {!collapsed && (
                    <span className="flex-1 text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.title}
                    </span>
                  )}
                </NavLink>
              );
            })}
        </div>

        {/* SERVICES SECTION - White text and border */}
        <div className="mt-6 pt-4 border-t border-sidebar-border">
          {!collapsed && (
            <div className="px-3 mb-2 text-xs font-semibold uppercase text-white">
              Services
            </div>
          )}

          {menuItems
            .filter((i) => i.type === "service")
            .map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "relative flex items-center gap-3 px-3 py-2 rounded-lg transition-colors min-w-0 w-full border border-white/50",
                    "hover:bg-sidebar-accent/50",
                    isActive
                      ? "bg-white/10 text-white border border-white/30"
                      : "text-white/90",
                    collapsed && "justify-center px-2"
                  )}
                  title={collapsed ? item.title : undefined}
                >
                  <item.icon
                    size={20}
                    className={cn(
                      "shrink-0",
                      isActive ? "text-white" : "text-white/80"
                    )}
                  />

                  {!collapsed && (
                    <span className="flex-1 text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                      {item.title}
                    </span>
                  )}

                  {!collapsed && (
                    <span className="shrink-0 text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white border border-white/30">
                      Services
                    </span>
                  )}
                </NavLink>
              );
            })}
        </div>
      </nav>

      {/* ---------- BOTTOM LOGO ---------- */}
      <div
        className="h-16 shrink-0 flex items-center justify-center border-t border-sidebar-border cursor-pointer bg-white/90 hover:bg-white transition"
        onClick={() => openLink("https://techupgrad.in/kpi")}
      >
        <img
          src="/pq-logo.png"
          alt="Company Logo"
          className={cn(
            "object-contain transition-all",
            collapsed ? "h-6 w-6" : "h-8"
          )}
        />
      </div>
    </div>
  );
}

/* ---------------- MAIN SIDEBAR ---------------- */

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (isMobile) {
    return (
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 left-4 z-50 bg-white shadow-md"
          >
            <Menu size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent collapsed={false} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 transition-all duration-300 overflow-hidden",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarContent
        collapsed={collapsed}
        onCollapse={() => setCollapsed(!collapsed)}
      />
    </aside>
  );
}
