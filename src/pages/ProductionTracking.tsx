import { KPICard } from "@/components/shared/KPICard";
import { ChartCard } from "@/components/shared/ChartCard";
import { GaugeChart } from "@/components/shared/GaugeChart";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import {
  Factory,
  Target,
  Gauge,
  Clock,
  AlertTriangle,
  Play,
  Pause,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const hourlyProduction = [
  { hour: "6AM", actual: 85, target: 100 },
  { hour: "7AM", actual: 92, target: 100 },
  { hour: "8AM", actual: 98, target: 100 },
  { hour: "9AM", actual: 105, target: 100 },
  { hour: "10AM", actual: 95, target: 100 },
  { hour: "11AM", actual: 88, target: 100 },
  { hour: "12PM", actual: 75, target: 80 },
  { hour: "1PM", actual: 90, target: 100 },
  { hour: "2PM", actual: 102, target: 100 },
  { hour: "3PM", actual: 96, target: 100 },
  { hour: "4PM", actual: 91, target: 100 },
  { hour: "5PM", actual: 85, target: 100 },
];

const downtimeData = [
  { name: "Planned", value: 45, color: "hsl(var(--primary))" },
  { name: "Breakdown", value: 25, color: "hsl(var(--destructive))" },
  { name: "Changeover", value: 18, color: "hsl(var(--warning))" },
  { name: "Material Wait", value: 12, color: "hsl(var(--chart-4))" },
];

const wipData = [
  { stage: "Raw Material", count: 320, time: "2.1 hrs" },
  { stage: "In Process", count: 156, time: "4.5 hrs" },
  { stage: "QC Pending", count: 48, time: "1.2 hrs" },
  { stage: "Finished", count: 892, time: "N/A" },
];

const lineStatus = [
  {
    line: "Line A",
    status: "Running",
    output: 245,
    efficiency: 94,
    operator: "John D.",
  },
  {
    line: "Line B",
    status: "Running",
    output: 232,
    efficiency: 89,
    operator: "Sarah M.",
  },
  {
    line: "Line C",
    status: "Idle",
    output: 180,
    efficiency: 72,
    operator: "Mike R.",
  },
  {
    line: "Line D",
    status: "Running",
    output: 258,
    efficiency: 97,
    operator: "Lisa K.",
  },
  {
    line: "Line E",
    status: "Maintenance",
    output: 0,
    efficiency: 0,
    operator: "Tom W.",
  },
];

export default function ProductionTracking() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-3">       

        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Production Tracking
        </h1>

        <p className="max-w-xl text-sm sm:text-base text-muted-foreground">
          Core production metrics and efficiency tracking
        </p>

        {/* Decorative divider */}
        <div className="mt-2 h-1 w-14 rounded-full bg-primary/60" />
      </div>

      {/* KPI Cards */}
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
          title="Target Achievement"
          value="94.5"
          unit="%"
          trend={-2.1}
          trendLabel="vs target"
          icon={Target}
          variant="warning"
        />
        <KPICard
          title="Line Efficiency"
          value="87.3"
          unit="%"
          trend={5.4}
          trendLabel="vs last week"
          icon={Gauge}
          variant="default"
        />
        <KPICard
          title="Cycle Time"
          value="2.4"
          unit="min/unit"
          trend={-3.2}
          trendLabel="improvement"
          icon={Clock}
          variant="success"
        />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard
          title="Hourly Production vs Target"
          subtitle="Today's production performance"
          className="lg:col-span-2"
        >
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={hourlyProduction}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="hour" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="target"
                stroke="hsl(var(--muted-foreground))"
                strokeDasharray="5 5"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="OEE Breakdown">
          <div className="space-y-6 py-4">
            <GaugeChart value={84} label="Overall OEE" size="lg" />
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Availability
                </span>
                <span className="font-semibold text-success">92%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-success rounded-full"
                  style={{ width: "92%" }}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Performance
                </span>
                <span className="font-semibold text-primary">88%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: "88%" }}
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Quality</span>
                <span className="font-semibold text-success">97%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-success rounded-full"
                  style={{ width: "97%" }}
                />
              </div>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Downtime & WIP */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="Downtime Analysis"
          subtitle="System vs Manual downtime breakdown"
        >
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie
                  data={downtimeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {downtimeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {downtimeData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}</span>
                  <span className="text-sm font-semibold ml-auto">
                    {item.value}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </ChartCard>

        <ChartCard
          title="WIP Turnaround Time"
          subtitle="Work-in-progress by stage"
        >
          <div className="space-y-3">
            {wipData.map((item) => (
              <div
                key={item.stage}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-sm">{item.stage}</p>
                  <p className="text-xs text-muted-foreground">
                    Avg TAT: {item.time}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{item.count}</p>
                  <p className="text-xs text-muted-foreground">items</p>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Line Status Table */}
      <ChartCard
        title="Production Line Status"
        subtitle="Real-time line performance"
      >
        <DataTable
          columns={[
            { key: "line", label: "Line" },
            {
              key: "status",
              label: "Status",
              render: (item) => (
                <div className="flex items-center gap-2">
                  {item.status === "Running" && (
                    <Play className="h-3 w-3 text-success" />
                  )}
                  {item.status === "Idle" && (
                    <Pause className="h-3 w-3 text-warning" />
                  )}
                  {item.status === "Maintenance" && (
                    <AlertTriangle className="h-3 w-3 text-destructive" />
                  )}
                  <StatusBadge
                    status={
                      item.status === "Running"
                        ? "success"
                        : item.status === "Idle"
                        ? "warning"
                        : "danger"
                    }
                  >
                    {item.status}
                  </StatusBadge>
                </div>
              ),
            },
            { key: "output", label: "Output" },
            {
              key: "efficiency",
              label: "Efficiency",
              render: (item) => (
                <span
                  className={
                    item.efficiency >= 90
                      ? "text-success font-medium"
                      : item.efficiency >= 75
                      ? "text-warning font-medium"
                      : "text-destructive font-medium"
                  }
                >
                  {item.efficiency}%
                </span>
              ),
            },
            { key: "operator", label: "Operator" },
          ]}
          data={lineStatus}
        />
      </ChartCard>
    </div>
  );
}
