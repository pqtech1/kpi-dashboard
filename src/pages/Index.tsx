import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { KPICard } from "@/components/dashboard/KPICard";
import { OEEGauge } from "@/components/dashboard/OEEGauge";
import { ProductionChart } from "@/components/dashboard/ProductionChart";
import { DowntimeChart } from "@/components/dashboard/DowntimeChart";
import { WIPTracker } from "@/components/dashboard/WIPTracker";
import { Factory, Target, Gauge, Clock, TrendingUp, Zap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Page Title */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Phase 1: Core Production Tracking
          </h2>
          <p className="text-muted-foreground">
            Capture production and efficiency metrics - the foundation for all performance tracking
          </p>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <KPICard
            title="Daily Production"
            value="1,247"
            unit="units"
            trend={8.2}
            trendLabel="vs yesterday"
            icon={Factory}
            variant="success"
            delay={0.1}
          />
          <KPICard
            title="Target Achievement"
            value="94.5"
            unit="%"
            trend={-2.1}
            trendLabel="vs target"
            icon={Target}
            variant="warning"
            delay={0.2}
          />
          <KPICard
            title="Line Efficiency"
            value="87.3"
            unit="%"
            trend={5.4}
            trendLabel="vs last week"
            icon={Gauge}
            variant="default"
            delay={0.3}
          />
          <KPICard
            title="Cycle Time"
            value="2.4"
            unit="min/unit"
            trend={-3.2}
            trendLabel="improvement"
            icon={Clock}
            variant="success"
            delay={0.4}
          />
        </div>

        {/* Main Charts Row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="xl:col-span-2">
            <ProductionChart delay={0.5} />
          </div>
          <div>
            <OEEGauge
              availability={92}
              performance={88}
              quality={97}
              delay={0.6}
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <WIPTracker delay={0.7} />
          <DowntimeChart delay={0.8} />
        </div>

        {/* Quick Stats Footer */}
        <div className="mt-6 sm:mt-8 p-4 sm:p-6 glass-card rounded-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Weekly Summary</p>
                <p className="text-lg font-semibold text-foreground">
                  Production up 12% with 3.2% quality improvement
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 border border-accent/20">
              <Zap className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">Next: Yield Analysis Module</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
