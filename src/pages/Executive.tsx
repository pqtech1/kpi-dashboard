import { KPICard } from "@/components/shared/KPICard";
import { ChartCard } from "@/components/shared/ChartCard";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import {
  TrendingUp,
  DollarSign,
  Percent,
  Activity,
  Package,
  AlertTriangle,
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
  ComposedChart,
} from "recharts";

const profitTrend = [
  { month: "Jan", revenue: 4500000, cost: 3800000, profit: 700000 },
  { month: "Feb", revenue: 4800000, cost: 3950000, profit: 850000 },
  { month: "Mar", revenue: 5200000, cost: 4200000, profit: 1000000 },
  { month: "Apr", revenue: 4900000, cost: 4000000, profit: 900000 },
  { month: "May", revenue: 5500000, cost: 4400000, profit: 1100000 },
  { month: "Jun", revenue: 5800000, cost: 4600000, profit: 1200000 },
];

const contributionMargin = [
  { product: "Rings", margin: 42, volume: 2500 },
  { product: "Pendants", margin: 38, volume: 1800 },
  { product: "Earrings", margin: 45, volume: 2200 },
  { product: "Bracelets", margin: 35, volume: 1200 },
  { product: "Necklaces", margin: 40, volume: 900 },
];

const bottleneckData = [
  { process: "Casting", waitTime: 45, utilization: 92 },
  { process: "Finishing", waitTime: 32, utilization: 88 },
  { process: "QC", waitTime: 18, utilization: 75 },
  { process: "Packaging", waitTime: 12, utilization: 65 },
  { process: "Design", waitTime: 28, utilization: 82 },
];

const capacityHeatmap = [
  { resource: "Furnace A", mon: 95, tue: 88, wed: 92, thu: 85, fri: 78 },
  { resource: "Furnace B", mon: 88, tue: 92, wed: 85, thu: 90, fri: 82 },
  { resource: "CNC Machine 1", mon: 75, tue: 82, wed: 78, thu: 85, fri: 72 },
  { resource: "CNC Machine 2", mon: 82, tue: 78, wed: 85, thu: 80, fri: 75 },
  { resource: "Polish Station", mon: 90, tue: 85, wed: 88, thu: 92, fri: 85 },
];

const liveOrders = [
  {
    orderId: "ORD-5621",
    customer: "ABC Jewelers",
    items: 250,
    value: "₹8,50,000",
    status: "In Production",
    eta: "2 days",
  },
  {
    orderId: "ORD-5622",
    customer: "Gold Palace",
    items: 180,
    value: "₹6,20,000",
    status: "QC Pending",
    eta: "1 day",
  },
  {
    orderId: "ORD-5623",
    customer: "Diamond House",
    items: 320,
    value: "₹12,80,000",
    status: "Casting",
    eta: "4 days",
  },
  {
    orderId: "ORD-5624",
    customer: "Silver Touch",
    items: 150,
    value: "₹4,50,000",
    status: "Finishing",
    eta: "1 day",
  },
  {
    orderId: "ORD-5625",
    customer: "Royal Gems",
    items: 420,
    value: "₹18,50,000",
    status: "Design",
    eta: "6 days",
  },
];

const getHeatmapColor = (value: number) => {
  if (value >= 90) return "bg-destructive/20 text-destructive";
  if (value >= 80) return "bg-warning/20 text-warning";
  if (value >= 70) return "bg-primary/20 text-primary";
  return "bg-success/20 text-success";
};

export default function Executive() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-center text-center space-y-3">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Executive Dashboard
        </h1>

        <p className="max-w-xl text-sm sm:text-base text-muted-foreground">
          Top management insights and profitability analysis{" "}
        </p>

        {/* Decorative divider */}
        <div className="mt-2 h-1 w-14 rounded-full bg-primary/60" />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Monthly Profit"
          value="₹12.0L"
          trend={9.1}
          trendLabel="vs last month"
          icon={DollarSign}
          variant="success"
        />
        <KPICard
          title="Contribution Margin"
          value="40.2"
          unit="%"
          trend={2.5}
          trendLabel="improvement"
          icon={Percent}
          variant="success"
        />
        <KPICard
          title="Bottleneck Index"
          value="Casting"
          trend={-15}
          trendLabel="wait time"
          icon={AlertTriangle}
          variant="warning"
        />
        <KPICard
          title="Capacity Utilization"
          value="84"
          unit="%"
          trend={5}
          trendLabel="vs target"
          icon={Activity}
          variant="default"
        />
      </div>

      {/* Profit Trend */}
      <ChartCard
        title="Profit Analysis"
        subtitle="Monthly revenue, cost, and profit trend"
      >
        <ResponsiveContainer width="100%" height={320}>
          <ComposedChart data={profitTrend}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis dataKey="month" className="text-xs" />
            <YAxis
              className="text-xs"
              tickFormatter={(value) => `₹${(value / 100000).toFixed(0)}L`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
              formatter={(value: number) => [
                `₹${(value / 100000).toFixed(1)}L`,
                "",
              ]}
            />
            <Legend />
            <Bar dataKey="revenue" fill="hsl(var(--primary))" name="Revenue" />
            <Bar
              dataKey="cost"
              fill="hsl(var(--muted-foreground))"
              name="Cost"
            />
            <Line
              type="monotone"
              dataKey="profit"
              stroke="hsl(var(--success))"
              strokeWidth={3}
              name="Profit"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Contribution Margin & Bottleneck */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="Contribution Margin by Product"
          subtitle="Margin % and volume"
        >
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={contributionMargin}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="product" className="text-xs" />
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
              <Bar
                yAxisId="left"
                dataKey="margin"
                fill="hsl(var(--success))"
                name="Margin %"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="volume"
                stroke="hsl(var(--primary))"
                name="Volume"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Bottleneck Index"
          subtitle="Process wait time and utilization"
        >
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={bottleneckData} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-muted"
                horizontal={false}
              />
              <XAxis type="number" className="text-xs" />
              <YAxis
                dataKey="process"
                type="category"
                className="text-xs"
                width={70}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar
                dataKey="waitTime"
                fill="hsl(var(--warning))"
                name="Wait Time (min)"
              />
              <Bar
                dataKey="utilization"
                fill="hsl(var(--primary))"
                name="Utilization %"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Capacity Heatmap */}
      <ChartCard
        title="Capacity Heatmap"
        subtitle="Resource utilization by day (%)"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-3 text-sm font-medium text-muted-foreground">
                  Resource
                </th>
                <th className="text-center py-2 px-3 text-sm font-medium text-muted-foreground">
                  Mon
                </th>
                <th className="text-center py-2 px-3 text-sm font-medium text-muted-foreground">
                  Tue
                </th>
                <th className="text-center py-2 px-3 text-sm font-medium text-muted-foreground">
                  Wed
                </th>
                <th className="text-center py-2 px-3 text-sm font-medium text-muted-foreground">
                  Thu
                </th>
                <th className="text-center py-2 px-3 text-sm font-medium text-muted-foreground">
                  Fri
                </th>
              </tr>
            </thead>
            <tbody>
              {capacityHeatmap.map((row) => (
                <tr key={row.resource} className="border-b">
                  <td className="py-2 px-3 text-sm font-medium">
                    {row.resource}
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${getHeatmapColor(
                        row.mon
                      )}`}
                    >
                      {row.mon}%
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${getHeatmapColor(
                        row.tue
                      )}`}
                    >
                      {row.tue}%
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${getHeatmapColor(
                        row.wed
                      )}`}
                    >
                      {row.wed}%
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${getHeatmapColor(
                        row.thu
                      )}`}
                    >
                      {row.thu}%
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-medium ${getHeatmapColor(
                        row.fri
                      )}`}
                    >
                      {row.fri}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>

      {/* Live Order Status */}
      <ChartCard title="Live Order Status" subtitle="Real-time order tracking">
        <DataTable
          columns={[
            { key: "orderId", label: "Order ID" },
            { key: "customer", label: "Customer" },
            { key: "items", label: "Items" },
            { key: "value", label: "Value" },
            {
              key: "status",
              label: "Status",
              render: (item) => (
                <StatusBadge
                  status={
                    item.status === "QC Pending" || item.status === "Finishing"
                      ? "warning"
                      : item.status === "In Production" ||
                        item.status === "Casting"
                      ? "info"
                      : "neutral"
                  }
                >
                  {item.status}
                </StatusBadge>
              ),
            },
            {
              key: "eta",
              label: "ETA",
              render: (item) => (
                <span
                  className={
                    item.eta === "1 day" ? "text-success font-medium" : ""
                  }
                >
                  {item.eta}
                </span>
              ),
            },
          ]}
          data={liveOrders}
        />
      </ChartCard>
    </div>
  );
}
