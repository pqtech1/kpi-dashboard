import { KPICard } from "@/components/shared/KPICard";
import { ChartCard } from "@/components/shared/ChartCard";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import {
  Sparkles,
  TrendingUp,
  RefreshCw,
  Users,
  Clock,
  Scale,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

const throughputData = [
  { hour: "8AM", output: 45, target: 50 },
  { hour: "9AM", output: 52, target: 50 },
  { hour: "10AM", output: 48, target: 50 },
  { hour: "11AM", output: 55, target: 50 },
  { hour: "12PM", output: 38, target: 40 },
  { hour: "1PM", output: 50, target: 50 },
  { hour: "2PM", output: 53, target: 50 },
  { hour: "3PM", output: 49, target: 50 },
  { hour: "4PM", output: 47, target: 50 },
  { hour: "5PM", output: 44, target: 50 },
];

const polishingLoss = [
  { process: "Grinding", input: 100, output: 97.5, loss: 2.5 },
  { process: "Sanding", input: 97.5, output: 96.2, loss: 1.3 },
  { process: "Buffing", input: 96.2, output: 95.4, loss: 0.8 },
  { process: "Final Polish", input: 95.4, output: 95.0, loss: 0.4 },
];

const reworkReasons = [
  { name: "Scratch Marks", value: 35, color: "hsl(var(--destructive))" },
  { name: "Uneven Surface", value: 28, color: "hsl(var(--warning))" },
  { name: "Dimension Issue", value: 22, color: "hsl(var(--primary))" },
  { name: "Other", value: 15, color: "hsl(var(--chart-4))" },
];

const operatorPerformance = [
  {
    operator: "Ravi K.",
    completed: 125,
    rework: 3,
    efficiency: 96,
    idleTime: 15,
  },
  {
    operator: "Sanjay M.",
    completed: 118,
    rework: 5,
    efficiency: 92,
    idleTime: 22,
  },
  {
    operator: "Deepa R.",
    completed: 132,
    rework: 2,
    efficiency: 98,
    idleTime: 12,
  },
  {
    operator: "Arjun S.",
    completed: 115,
    rework: 6,
    efficiency: 89,
    idleTime: 28,
  },
  {
    operator: "Meera P.",
    completed: 128,
    rework: 4,
    efficiency: 94,
    idleTime: 18,
  },
];

const idleTimeBreakdown = [
  { reason: "Material Wait", minutes: 45 },
  { reason: "Tool Change", minutes: 32 },
  { reason: "Break", minutes: 60 },
  { reason: "Machine Issue", minutes: 18 },
  { reason: "QC Hold", minutes: 25 },
];

export default function Finishing() {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col items-center text-center space-y-3">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Finishing Module
        </h1>

        <p className="max-w-xl text-sm sm:text-base text-muted-foreground">
          Track productivity and losses during finishing operations{" "}
        </p>

        {/* Decorative divider */}
        <div className="mt-2 h-1 w-14 rounded-full bg-primary/60" />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          title="Throughput"
          value="481"
          unit="pcs/day"
          trend={6.5}
          trendLabel="vs yesterday"
          icon={TrendingUp}
          variant="success"
        />
        <KPICard
          title="Polishing Loss"
          value="5.0"
          unit="%"
          trend={-8}
          trendLabel="reduction"
          icon={Scale}
          variant="success"
        />
        <KPICard
          title="Rework Count"
          value="20"
          unit="pcs"
          trend={-15}
          trendLabel="reduction"
          icon={RefreshCw}
          variant="success"
        />
        <KPICard
          title="Operator Efficiency"
          value="93.8"
          unit="%"
          trend={2.1}
          trendLabel="improvement"
          icon={Users}
          variant="default"
        />
        <KPICard
          title="Idle Time"
          value="95"
          unit="min/shift"
          trend={-12}
          trendLabel="reduction"
          icon={Clock}
          variant="success"
        />
      </div>

      {/* Throughput & Polishing Loss */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="Hourly Throughput"
          subtitle="Output vs target by hour"
        >
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={throughputData}>
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
              <Area
                type="monotone"
                dataKey="target"
                stroke="hsl(var(--muted-foreground))"
                fill="hsl(var(--muted))"
                strokeDasharray="5 5"
                name="Target"
              />
              <Area
                type="monotone"
                dataKey="output"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary) / 0.2)"
                name="Output"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Polishing Loss by Process"
          subtitle="Material loss at each stage"
        >
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={polishingLoss}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="process" className="text-xs" />
              <YAxis className="text-xs" domain={[94, 101]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar
                dataKey="input"
                fill="hsl(var(--muted-foreground))"
                name="Input %"
              />
              <Bar
                dataKey="output"
                fill="hsl(var(--primary))"
                name="Output %"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Rework & Idle Time */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Rework Analysis" subtitle="Reasons for rework">
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={220}>
              <PieChart>
                <Pie
                  data={reworkReasons}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {reworkReasons.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {reworkReasons.map((item) => (
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
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">
                  Total Rework: 20 pieces
                </p>
              </div>
            </div>
          </div>
        </ChartCard>

        <ChartCard
          title="Idle Time Breakdown"
          subtitle="Non-productive time by reason"
        >
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={idleTimeBreakdown} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-muted"
                horizontal={false}
              />
              <XAxis type="number" className="text-xs" />
              <YAxis
                dataKey="reason"
                type="category"
                className="text-xs"
                width={90}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [`${value} min`, "Duration"]}
              />
              <Bar
                dataKey="minutes"
                fill="hsl(var(--warning))"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Operator Performance Table */}
      <ChartCard
        title="Operator Productivity"
        subtitle="Individual performance metrics"
      >
        <DataTable
          columns={[
            { key: "operator", label: "Operator" },
            { key: "completed", label: "Completed" },
            {
              key: "rework",
              label: "Rework",
              render: (item) => (
                <span
                  className={
                    item.rework > 4 ? "text-destructive font-medium" : ""
                  }
                >
                  {item.rework}
                </span>
              ),
            },
            {
              key: "efficiency",
              label: "Efficiency",
              render: (item) => (
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        item.efficiency >= 95
                          ? "bg-success"
                          : item.efficiency >= 90
                          ? "bg-warning"
                          : "bg-destructive"
                      }`}
                      style={{ width: `${item.efficiency}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {item.efficiency}%
                  </span>
                </div>
              ),
            },
            {
              key: "idleTime",
              label: "Idle Time",
              render: (item) => (
                <span
                  className={
                    item.idleTime > 20 ? "text-warning font-medium" : ""
                  }
                >
                  {item.idleTime} min
                </span>
              ),
            },
            {
              key: "status",
              label: "Status",
              render: (item) => (
                <StatusBadge
                  status={
                    item.efficiency >= 95
                      ? "success"
                      : item.efficiency >= 90
                      ? "warning"
                      : "danger"
                  }
                >
                  {item.efficiency >= 95
                    ? "Excellent"
                    : item.efficiency >= 90
                    ? "Good"
                    : "Needs Review"}
                </StatusBadge>
              ),
            },
          ]}
          data={operatorPerformance}
        />
      </ChartCard>
    </div>
  );
}
