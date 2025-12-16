import { KPICard } from "@/components/shared/KPICard";
import { ChartCard } from "@/components/shared/ChartCard";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { GaugeChart } from "@/components/shared/GaugeChart";
import { Flame, Percent, TrendingDown, Clock, Recycle, AlertTriangle } from "lucide-react";
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
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const yieldTrend = [
  { week: "W1", yield: 92.5, target: 95 },
  { week: "W2", yield: 93.8, target: 95 },
  { week: "W3", yield: 91.2, target: 95 },
  { week: "W4", yield: 94.5, target: 95 },
  { week: "W5", yield: 95.2, target: 95 },
  { week: "W6", yield: 94.8, target: 95 },
];

const metalLossBreakdown = [
  { name: "Sprue/Runner", value: 35, color: "hsl(var(--primary))" },
  { name: "Flash", value: 25, color: "hsl(var(--warning))" },
  { name: "Porosity Reject", value: 22, color: "hsl(var(--destructive))" },
  { name: "Scale/Oxide", value: 18, color: "hsl(var(--chart-4))" },
];

const defectData = [
  { type: "Porosity", count: 12, percentage: 2.4 },
  { type: "Shrinkage", count: 8, percentage: 1.6 },
  { type: "Misrun", count: 5, percentage: 1.0 },
  { type: "Cold Shut", count: 3, percentage: 0.6 },
  { type: "Surface Defect", count: 7, percentage: 1.4 },
];

const furnaceStatus = [
  { furnace: "Furnace A", status: "Running", temp: 1150, utilization: 92, batch: "B-2045" },
  { furnace: "Furnace B", status: "Running", temp: 1145, utilization: 88, batch: "B-2046" },
  { furnace: "Furnace C", status: "Cooling", temp: 680, utilization: 65, batch: "B-2044" },
  { furnace: "Furnace D", status: "Idle", temp: 25, utilization: 0, batch: "-" },
];

const batchCycleTime = [
  { batch: "B-2040", cycleTime: 4.2, pieces: 120 },
  { batch: "B-2041", cycleTime: 4.5, pieces: 115 },
  { batch: "B-2042", cycleTime: 3.8, pieces: 125 },
  { batch: "B-2043", cycleTime: 4.1, pieces: 118 },
  { batch: "B-2044", cycleTime: 4.0, pieces: 122 },
  { batch: "B-2045", cycleTime: 3.9, pieces: 128 },
];

export default function Casting() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="page-header">Phase 4: Casting Module</h1>
        <p className="text-muted-foreground">
          Metal transformation efficiency and material recovery tracking
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <KPICard
          title="Yield %"
          value="94.8"
          unit="%"
          trend={1.2}
          trendLabel="vs target"
          icon={Percent}
          variant="success"
        />
        <KPICard
          title="Metal Loss"
          value="5.2"
          unit="%"
          trend={-8}
          trendLabel="reduction"
          icon={TrendingDown}
          variant="success"
        />
        <KPICard
          title="Defect Rate"
          value="3.2"
          unit="%"
          trend={-12}
          trendLabel="improvement"
          icon={AlertTriangle}
          variant="success"
        />
        <KPICard
          title="Furnace Util."
          value="82"
          unit="%"
          trend={5}
          trendLabel="vs last week"
          icon={Flame}
          variant="default"
        />
        <KPICard
          title="Batch Cycle"
          value="4.1"
          unit="hrs"
          trend={-6}
          trendLabel="faster"
          icon={Clock}
          variant="success"
        />
        <KPICard
          title="Remelt Ratio"
          value="8.5"
          unit="%"
          trend={-15}
          trendLabel="reduction"
          icon={Recycle}
          variant="success"
        />
      </div>

      {/* Yield & Metal Loss */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Yield Trend" subtitle="Weekly yield percentage vs target">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={yieldTrend}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="week" className="text-xs" />
              <YAxis className="text-xs" domain={[88, 98]} />
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
                dataKey="yield"
                stroke="hsl(var(--primary))"
                fill="hsl(var(--primary) / 0.2)"
                name="Actual Yield"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Metal Loss Breakdown" subtitle="Loss distribution by category">
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={240}>
              <PieChart>
                <Pie
                  data={metalLossBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {metalLossBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {metalLossBreakdown.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm">{item.name}</span>
                  <span className="text-sm font-semibold ml-auto">{item.value}%</span>
                </div>
              ))}
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">Total Loss: 245g today</p>
              </div>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Defect & Cycle Time */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Defect Analysis" subtitle="Defect types and occurrence">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={defectData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
              <XAxis type="number" className="text-xs" />
              <YAxis dataKey="type" type="category" className="text-xs" width={100} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number, name: string) => [
                  name === "count" ? `${value} pieces` : `${value}%`,
                  name === "count" ? "Count" : "Rate",
                ]}
              />
              <Bar dataKey="count" fill="hsl(var(--destructive))" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Batch Cycle Time" subtitle="Time per batch with output">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={batchCycleTime}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="batch" className="text-xs" />
              <YAxis yAxisId="left" className="text-xs" />
              <YAxis yAxisId="right" orientation="right" className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="cycleTime" fill="hsl(var(--primary))" name="Cycle Time (hrs)" />
              <Line yAxisId="right" type="monotone" dataKey="pieces" stroke="hsl(var(--success))" name="Pieces" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Furnace Status Table */}
      <ChartCard title="Furnace Status" subtitle="Real-time furnace monitoring">
        <DataTable
          columns={[
            { key: "furnace", label: "Furnace" },
            {
              key: "status",
              label: "Status",
              render: (item) => (
                <StatusBadge
                  status={
                    item.status === "Running"
                      ? "success"
                      : item.status === "Cooling"
                      ? "warning"
                      : "neutral"
                  }
                >
                  {item.status}
                </StatusBadge>
              ),
            },
            {
              key: "temp",
              label: "Temperature",
              render: (item) => (
                <span className={item.temp > 1000 ? "text-destructive font-medium" : ""}>
                  {item.temp}°C
                </span>
              ),
            },
            {
              key: "utilization",
              label: "Utilization",
              render: (item) => (
                <div className="flex items-center gap-2">
                  <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        item.utilization >= 80
                          ? "bg-success"
                          : item.utilization >= 50
                          ? "bg-warning"
                          : "bg-muted-foreground"
                      }`}
                      style={{ width: `${item.utilization}%` }}
                    />
                  </div>
                  <span className="text-sm">{item.utilization}%</span>
                </div>
              ),
            },
            { key: "batch", label: "Current Batch" },
          ]}
          data={furnaceStatus}
        />
      </ChartCard>
    </div>
  );
}
