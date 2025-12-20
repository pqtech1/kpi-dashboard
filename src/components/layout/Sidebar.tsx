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
  X,
  Building2,
  Database,
  Link2,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

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

const erpIntegrations = [
  { name: "Emperor ERP", color: "from-blue-500 to-blue-600" },
  { name: "GATI ERP", color: "from-emerald-500 to-emerald-600" },
  { name: "SAP ERP", color: "from-purple-500 to-purple-600" },
  { name: "Other ERP's", color: "from-gray-500 to-gray-600" },
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
              src={`${import.meta.env.BASE_URL}pq-jewel-pulse.png`}
              alt="Jewel INTEGRA Logo"
              className="h-8 w-8 object-contain"
            />
            <span className="text-xl font-bold text-sidebar-foreground whitespace-nowrap">
              Jewel INTEGRA
            </span>
          </div>
        ) : (
          <img
            src={`${import.meta.env.BASE_URL}pq-jewel-pulse.png`}
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

        {/* ERP INTEGRATIONS SECTION - Only show when not collapsed */}
        {!collapsed && (
          <div className="mt-6 pt-4 border-t border-sidebar-border">
            <div className="px-3">
              {/* Enhanced Heading */}
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <Link2 className="w-4 h-4 text-primary/80" />
                  <span className="text-xs font-medium uppercase tracking-wider text-white/90">
                    Custom Integrations
                  </span>
                </div>
                <div className="h-px w-full bg-gradient-to-r from-primary/30 via-primary/20 to-transparent mb-2" />
                <p className="text-xs text-white/60 italic">
                  Seamless connectivity with:
                </p>
              </div>

              <div className="space-y-2">
                {erpIntegrations.map((erp, index) => (
                  <div
                    key={erp.name}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200",
                      "bg-gradient-to-r from-sidebar-accent/20 to-transparent",
                      "hover:bg-sidebar-accent/40 hover:scale-[1.02]",
                      "border border-white/10 hover:border-primary/30"
                    )}
                  >
                    {/* Color indicator */}
                    <div
                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${erp.color}`}
                    />

                    {/* ERP Name with gradient text */}
                    <span
                      className={cn(
                        "text-sm font-medium whitespace-nowrap",
                        erp.name === "Emperor ERP" &&
                          "bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent",
                        erp.name === "GATI ERP" &&
                          "bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent",
                        erp.name === "SAP ERP" &&
                          "bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent",
                        erp.name === "Other ERP's" &&
                          "bg-gradient-to-r from-gray-400 to-gray-300 bg-clip-text text-transparent"
                      )}
                    >
                      {erp.name}
                    </span>

                    {/* Integration badge for last item */}
                    {erp.name === "Other ERP's" && (
                      <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-white/90 text-primary/100 border border-primary/30">
                        Integration
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Optional decorative element */}
              <div className="mt-3 pt-3 border-t border-white/10">
                <div className="flex items-center justify-center gap-1 text-xs text-white/60">
                  <Database className="w-3 h-3" />
                  <span>Real-time Data Sync</span>
                  <Database className="w-3 h-3" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Collapsed view for ERP integrations */}
        {collapsed && (
          <div className="mt-6 pt-4 border-t border-sidebar-border">
            <div className="flex items-center justify-center mb-3">
              <Link2 className="w-5 h-5 text-primary/80" />
            </div>
            <div className="space-y-1">
              {erpIntegrations.map((erp, index) => (
                <div
                  key={erp.name}
                  className="flex justify-center"
                  title={erp.name}
                >
                  <div
                    className={`w-2 h-2 rounded-full bg-gradient-to-r ${erp.color}`}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* ---------- BOTTOM LOGO ---------- */}
      <div
        className="h-16 shrink-0 flex items-center justify-center border-t border-sidebar-border cursor-pointer bg-white/90 hover:bg-white transition"
        onClick={() => openLink("https://positivequadrant.in/")}
      >
        {!collapsed ? (
          // Full logo when expanded
          <img
            src={`${import.meta.env.BASE_URL}pq-logo.png`}
            alt="Positive Quadrant Logo"
            className="h-10 w-auto object-contain px-2"
          />
        ) : (
          // Cropped logo when collapsed
          <img
            src={`${import.meta.env.BASE_URL}cropped-pq-logo.png`}
            alt="PQ Logo"
            className="h-8 w-8 object-contain"
          />
        )}
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
          {/* Custom Close Button */}
          <SheetClose className="absolute right-4 top-4 z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <X className="h-6 w-6 text-white" />
            <span className="sr-only">Close</span>
          </SheetClose>

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
