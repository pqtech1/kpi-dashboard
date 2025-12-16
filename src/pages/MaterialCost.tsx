import { KPICard } from "@/components/shared/KPICard";
import { ChartCard } from "@/components/shared/ChartCard";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Coins, Zap, Trash2, Droplets, TrendingDown, Package } from "lucide-react";
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
} from "recharts";

const costTrend = [
  { month: "Jan", costPerGram: 45.2, costPerPiece: 125 },
  { month: "Feb", costPerGram: 44.8, costPerPiece: 122 },
  { month: "Mar", costPerGram: 46.1, costPerPiece: 128 },
  { month: "Apr", costPerGram: 43.5, costPerPiece: 118 },
  { month: "May", costPerGram: 42.8, costPerPiece: 115 },
  { month: "Jun", costPerGram: 41.9, costPerPiece: 112 },
];

const energyConsumption = [
  { shift: "Morning", electricity: 450, gas: 120, water: 85 },
  { shift: "Afternoon", electricity: 480, gas: 135, water: 92 },
  { shift: "Night", electricity: 320, gas: 95, water: 68 },
];

const waxRejectionData = [
  { name: "Pattern Defect", value: 35, color: "hsl(var(--destructive))" },
  { name: "Surface Issue", value: 28, color: "hsl(var(--warning))" },
  { name: "Dimension Error", value: 22, color: "hsl(var(--primary))" },
  { name: "Other", value: 15, color: "hsl(var(--chart-4))" },
];

const materialUsage = [
  { material: "Gold (24K)", allocated: "500g", used: "485g", wastage: "3.0%", status: "normal" },
  { material: "Silver", allocated: "2kg", used: "1.92kg", wastage: "4.0%", status: "warning" },
  { material: "Wax", allocated: "10kg", used: "9.2kg", wastage: "8.0%", status: "danger" },
  { material: "Resin", allocated: "5L", used: "4.85L", wastage: "3.0%", status: "normal" },
  { material: "Plaster", allocated: "25kg", used: "24.5kg", wastage: "2.0%", status: "normal" },
];

const resinConsumption = [
  { week: "W1", standard: 1.2, actual: 1.35 },
  { week: "W2", standard: 1.2, actual: 1.28 },
  { week: "W3", standard: 1.2, actual: 1.18 },
  { week: "W4", standard: 1.2, actual: 1.22 },
];

export default function MaterialCost() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="page-header">Phase 2: Material & Cost Tracking</h1>
        <p className="text-muted-foreground">
          Monitor costs, wastage, and resource consumption
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Cost per Gram"
          value="₹41.9"
          trend={-2.1}
          trendLabel="vs last month"
          icon={Coins}
          variant="success"
        />
        <KPICard
          title="Energy Cost/Day"
          value="₹12,450"
          trend={5.2}
          trendLabel="vs avg"
          icon={Zap}
          variant="warning"
        />
        <KPICard
          title="Wax Rejection"
          value="4.2"
          unit="%"
          trend={-15}
          trendLabel="improvement"
          icon={Trash2}
          variant="success"
        />
        <KPICard
          title="Resin Usage"
          value="4.85"
          unit="L/day"
          trend={-3.5}
          trendLabel="vs standard"
          icon={Droplets}
          variant="default"
        />
      </div>

      {/* Cost Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Cost Trend Analysis" subtitle="Cost per gram & per piece over time">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={costTrend}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="month" className="text-xs" />
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
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="costPerGram"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                name="₹/gram"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="costPerPiece"
                stroke="hsl(var(--success))"
                strokeWidth={2}
                name="₹/piece"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Energy Consumption by Shift" subtitle="Electricity, Gas & Water usage">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={energyConsumption}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="shift" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="electricity" fill="hsl(var(--warning))" name="Electricity (kWh)" />
              <Bar dataKey="gas" fill="hsl(var(--primary))" name="Gas (units)" />
              <Bar dataKey="water" fill="hsl(var(--chart-6))" name="Water (L)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Wax Rejection & Resin */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Wax Rejection Analysis" subtitle="Rejection reasons breakdown">
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={220}>
              <PieChart>
                <Pie
                  data={waxRejectionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {waxRejectionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {waxRejectionData.map((item) => (
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
                <p className="text-xs text-muted-foreground">Total Rejections: 127 units</p>
              </div>
            </div>
          </div>
        </ChartCard>

        <ChartCard title="Resin Consumption" subtitle="Standard vs Actual usage">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={resinConsumption}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="week" className="text-xs" />
              <YAxis className="text-xs" domain={[0, 1.5]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="standard" fill="hsl(var(--muted-foreground))" name="Standard (L)" />
              <Bar dataKey="actual" fill="hsl(var(--primary))" name="Actual (L)" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Material Usage Table */}
      <ChartCard title="Material Usage Summary" subtitle="Allocation vs Actual consumption">
        <DataTable
          columns={[
            { key: "material", label: "Material" },
            { key: "allocated", label: "Allocated" },
            { key: "used", label: "Used" },
            {
              key: "wastage",
              label: "Wastage",
              render: (item) => (
                <span
                  className={
                    item.status === "normal"
                      ? "text-success font-medium"
                      : item.status === "warning"
                      ? "text-warning font-medium"
                      : "text-destructive font-medium"
                  }
                >
                  {item.wastage}
                </span>
              ),
            },
            {
              key: "status",
              label: "Status",
              render: (item) => (
                <StatusBadge
                  status={
                    item.status === "normal"
                      ? "success"
                      : item.status === "warning"
                      ? "warning"
                      : "danger"
                  }
                >
                  {item.status === "normal" ? "Within Limit" : item.status === "warning" ? "Review" : "High"}
                </StatusBadge>
              ),
            },
          ]}
          data={materialUsage}
        />
      </ChartCard>
    </div>
  );
}
