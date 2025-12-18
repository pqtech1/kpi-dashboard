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
  {
    title: "PQ Offering",
    icon: Package,
    path: "/pq-offering",
  },
];

function SidebarContent({ collapsed, onCollapse }: { collapsed: boolean; onCollapse?: () => void }) {
  const location = useLocation();

  return (
    <div className="h-full flex flex-col bg-sidebar">
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
        {!collapsed && (
          <span className="text-xl font-bold text-sidebar-foreground drop-shadow-[0_0_6px_rgba(255,215,0,0.6)]">
            💎 Jewel Integra
          </span>
        )}
        {collapsed && (
          <span className="text-xl">💎</span>
        )}
        {onCollapse && (
          <button
            onClick={onCollapse}
            className="p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/70 hover:text-sidebar-foreground transition-colors"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        )}
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
    </div>
  );
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile sidebar with Sheet
  if (isMobile) {
    return (
      <>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon" 
              className="fixed top-4 left-4 z-50 lg:hidden bg-white shadow-md"
            >
              <Menu size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent collapsed={false} />
          </SheetContent>
        </Sheet>
      </>
    );
  }

  // Desktop sidebar
  return (
    <aside
      className={cn(
        "h-screen sticky top-0 flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarContent collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)} />
    </aside>
  );
}
