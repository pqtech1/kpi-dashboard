import { KPICard } from "@/components/shared/KPICard";
import { ChartCard } from "@/components/shared/ChartCard";
import { GaugeChart } from "@/components/shared/GaugeChart";
import { StatusBadge } from "@/components/shared/StatusBadge";
import {
  Factory,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Package,
  Zap,
  Users,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const productionTrend = [
  { date: "Mon", actual: 1200, target: 1300 },
  { date: "Tue", actual: 1350, target: 1300 },
  { date: "Wed", actual: 1280, target: 1300 },
  { date: "Thu", actual: 1400, target: 1300 },
  { date: "Fri", actual: 1320, target: 1300 },
  { date: "Sat", actual: 980, target: 1000 },
  { date: "Sun", actual: 850, target: 800 },
];

const moduleStatus = [
  { name: "Production", efficiency: 87, status: "success" as const },
  { name: "Material", efficiency: 92, status: "success" as const },
  { name: "CAD/CAM", efficiency: 78, status: "warning" as const },
  { name: "Casting", efficiency: 85, status: "success" as const },
  { name: "Finishing", efficiency: 91, status: "success" as const },
  { name: "Quality", efficiency: 96, status: "success" as const },
];

const recentAlerts = [
  { id: 1, type: "warning", message: "Machine #3 maintenance due", time: "10 min ago" },
  { id: 2, type: "danger", message: "Quality threshold breach detected", time: "25 min ago" },
  { id: 3, type: "info", message: "New batch started on Line A", time: "45 min ago" },
  { id: 4, type: "success", message: "Daily target achieved for Line B", time: "1 hr ago" },
];

export default function Overview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="page-header">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Real-time manufacturing performance at a glance
        </p>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Daily Production"
          value="1,247"
          unit="units"
          trend={8.2}
          trendLabel="vs yesterday"
          icon={Factory}
          variant="success"
        />
        <KPICard
          title="Overall OEE"
          value="84.5"
          unit="%"
          trend={3.1}
          trendLabel="vs last week"
          icon={Zap}
          variant="default"
        />
        <KPICard
          title="Active Alerts"
          value="7"
          trend={-25}
          trendLabel="resolved today"
          icon={AlertTriangle}
          variant="warning"
        />
        <KPICard
          title="Quality Rate"
          value="98.2"
          unit="%"
          trend={0.8}
          trendLabel="improvement"
          icon={CheckCircle}
          variant="success"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard
          title="Production Trend"
          subtitle="Actual vs Target this week"
          className="lg:col-span-2"
        >
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={productionTrend}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Area
                type="monotone"
                dataKey="target"
                stroke="hsl(var(--muted-foreground))"
                fill="hsl(var(--muted))"
                strokeDasharray="5 5"
              />
              <Area
                type="monotone"
                dataKey="actual"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary) / 0.2)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="OEE Components">
          <div className="flex flex-col items-center space-y-4 py-4">
            <GaugeChart value={84} label="Overall OEE" size="lg" />
            <div className="grid grid-cols-3 gap-4 w-full">
              <div className="text-center">
                <p className="text-lg font-semibold text-success">92%</p>
                <p className="text-xs text-muted-foreground">Availability</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-primary">88%</p>
                <p className="text-xs text-muted-foreground">Performance</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold text-success">97%</p>
                <p className="text-xs text-muted-foreground">Quality</p>
              </div>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Module Status & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Module Efficiency">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={moduleStatus} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} className="text-xs" />
              <YAxis dataKey="name" type="category" className="text-xs" width={80} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Bar
                dataKey="efficiency"
                fill="hsl(var(--primary))"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Recent Alerts">
          <div className="space-y-3">
            {recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
              >
                <div className="mt-0.5">
                  {alert.type === "warning" && (
                    <AlertTriangle className="h-4 w-4 text-warning" />
                  )}
                  {alert.type === "danger" && (
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  )}
                  {alert.type === "info" && (
                    <Package className="h-4 w-4 text-primary" />
                  )}
                  {alert.type === "success" && (
                    <CheckCircle className="h-4 w-4 text-success" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="stat-card text-center">
          <Clock className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
          <p className="text-2xl font-bold">2.4</p>
          <p className="text-sm text-muted-foreground">Avg Cycle Time (min)</p>
        </div>
        <div className="stat-card text-center">
          <Package className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
          <p className="text-2xl font-bold">156</p>
          <p className="text-sm text-muted-foreground">WIP Items</p>
        </div>
        <div className="stat-card text-center">
          <Users className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
          <p className="text-2xl font-bold">24</p>
          <p className="text-sm text-muted-foreground">Active Operators</p>
        </div>
        <div className="stat-card text-center">
          <TrendingUp className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
          <p className="text-2xl font-bold">94.5%</p>
          <p className="text-sm text-muted-foreground">Target Achievement</p>
        </div>
      </div>
    </div>
  );
}
