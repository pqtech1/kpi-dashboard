import { KPICard } from "@/components/shared/KPICard";
import { ChartCard } from "@/components/shared/ChartCard";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { GaugeChart } from "@/components/shared/GaugeChart";
import {
  ShieldCheck,
  Target,
  AlertTriangle,
  Clock,
  XCircle,
  RotateCcw,
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

const fpyTrend = [
  { week: "W1", fpy: 94.2, target: 95 },
  { week: "W2", fpy: 95.1, target: 95 },
  { week: "W3", fpy: 93.8, target: 95 },
  { week: "W4", fpy: 96.2, target: 95 },
  { week: "W5", fpy: 95.8, target: 95 },
  { week: "W6", fpy: 96.5, target: 95 },
];

const dpmoData = [
  { category: "Dimension", dpmo: 1250, target: 1000 },
  { category: "Surface", dpmo: 890, target: 1000 },
  { category: "Weight", dpmo: 650, target: 1000 },
  { category: "Finish", dpmo: 720, target: 1000 },
  { category: "Assembly", dpmo: 450, target: 1000 },
];

const rejectionReasons = [
  { name: "Dimension Error", value: 32, color: "hsl(var(--destructive))" },
  { name: "Surface Defect", value: 28, color: "hsl(var(--warning))" },
  { name: "Weight Variance", value: 22, color: "hsl(var(--primary))" },
  { name: "Finish Issue", value: 18, color: "hsl(var(--chart-4))" },
];

const customerReturns = [
  { month: "Jan", returns: 12, shipped: 2450 },
  { month: "Feb", returns: 8, shipped: 2680 },
  { month: "Mar", returns: 15, shipped: 2890 },
  { month: "Apr", returns: 6, shipped: 2720 },
  { month: "May", returns: 9, shipped: 2950 },
  { month: "Jun", returns: 5, shipped: 3100 },
];

const qcQueue = [
  {
    batch: "B-2045",
    items: 128,
    submitted: "30 min ago",
    priority: "high",
    inspector: "QC-01",
  },
  {
    batch: "B-2046",
    items: 115,
    submitted: "1 hr ago",
    priority: "medium",
    inspector: "QC-02",
  },
  {
    batch: "B-2044",
    items: 95,
    submitted: "2 hrs ago",
    priority: "low",
    inspector: "Pending",
  },
  {
    batch: "B-2043",
    items: 142,
    submitted: "3 hrs ago",
    priority: "medium",
    inspector: "QC-01",
  },
];

const inspectionResults = [
  { batch: "B-2042", total: 125, passed: 121, failed: 4, holdTime: "1.2 hrs" },
  { batch: "B-2041", total: 118, passed: 115, failed: 3, holdTime: "0.8 hrs" },
  { batch: "B-2040", total: 132, passed: 128, failed: 4, holdTime: "1.5 hrs" },
  { batch: "B-2039", total: 140, passed: 138, failed: 2, holdTime: "0.6 hrs" },
];

export default function QualityControl() {
  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex flex-col items-center text-center space-y-3">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Quality Control
        </h1>

        <p className="max-w-xl text-sm sm:text-base text-muted-foreground">
          Track product quality metrics before delivery
        </p>

        {/* Decorative divider */}
        <div className="mt-2 h-1 w-14 rounded-full bg-primary/60" />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KPICard
          title="FPY %"
          value="96.5"
          unit="%"
          trend={1.5}
          trendLabel="above target"
          icon={Target}
          variant="success"
        />
        <KPICard
          title="DPMO"
          value="792"
          trend={-18}
          trendLabel="reduction"
          icon={ShieldCheck}
          variant="success"
        />
        <KPICard
          title="Internal Rejection"
          value="3.5"
          unit="%"
          trend={-12}
          trendLabel="improvement"
          icon={XCircle}
          variant="success"
        />
        <KPICard
          title="Customer Returns"
          value="0.16"
          unit="%"
          trend={-25}
          trendLabel="reduction"
          icon={RotateCcw}
          variant="success"
        />
        <KPICard
          title="QC Hold Time"
          value="1.0"
          unit="hrs"
          trend={-20}
          trendLabel="faster"
          icon={Clock}
          variant="success"
        />
      </div>

      {/* FPY & DPMO */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard
          title="First Pass Yield Trend"
          subtitle="Weekly FPY vs target"
          className="lg:col-span-2"
        >
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={fpyTrend}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="week" className="text-xs" />
              <YAxis className="text-xs" domain={[92, 98]} />
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
                dataKey="fpy"
                stroke="hsl(var(--success))"
                fill="hsl(var(--success) / 0.2)"
                name="FPY %"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Quality Score">
          <div className="flex flex-col items-center space-y-4 py-4">
            <GaugeChart
              value={96}
              label="Overall Quality"
              size="lg"
              variant="success"
            />
            <div className="grid grid-cols-2 gap-4 w-full text-center">
              <div className="p-2 bg-muted/50 rounded-lg">
                <p className="text-lg font-bold text-success">99.84%</p>
                <p className="text-xs text-muted-foreground">
                  Outgoing Quality
                </p>
              </div>
              <div className="p-2 bg-muted/50 rounded-lg">
                <p className="text-lg font-bold text-primary">4.2σ</p>
                <p className="text-xs text-muted-foreground">Process Sigma</p>
              </div>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* DPMO & Rejection Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="DPMO by Category"
          subtitle="Defects per million opportunities"
        >
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={dpmoData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="category" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar dataKey="dpmo" fill="hsl(var(--primary))" name="DPMO" />
              <Line
                type="monotone"
                dataKey="target"
                stroke="hsl(var(--destructive))"
                name="Target"
                strokeDasharray="5 5"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard
          title="Internal Rejection Analysis"
          subtitle="Rejection reasons breakdown"
        >
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={220}>
              <PieChart>
                <Pie
                  data={rejectionReasons}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {rejectionReasons.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {rejectionReasons.map((item) => (
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
      </div>

      {/* Customer Returns & QC Queue */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="Customer Returns Trend"
          subtitle="Monthly returns vs shipments"
        >
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={customerReturns}>
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
                yAxisId="right"
                type="monotone"
                dataKey="shipped"
                stroke="hsl(var(--primary))"
                name="Shipped"
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="returns"
                stroke="hsl(var(--destructive))"
                name="Returns"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="QC Queue" subtitle="Batches awaiting inspection">
          <DataTable
            columns={[
              { key: "batch", label: "Batch" },
              { key: "items", label: "Items" },
              { key: "submitted", label: "Submitted" },
              {
                key: "priority",
                label: "Priority",
                render: (item) => (
                  <StatusBadge
                    status={
                      item.priority === "high"
                        ? "danger"
                        : item.priority === "medium"
                        ? "warning"
                        : "neutral"
                    }
                  >
                    {item.priority}
                  </StatusBadge>
                ),
              },
              { key: "inspector", label: "Inspector" },
            ]}
            data={qcQueue}
          />
        </ChartCard>
      </div>

      {/* Inspection Results */}
      <ChartCard
        title="Recent Inspection Results"
        subtitle="Batch-wise quality metrics"
      >
        <DataTable
          columns={[
            { key: "batch", label: "Batch" },
            { key: "total", label: "Total Items" },
            {
              key: "passed",
              label: "Passed",
              render: (item) => (
                <span className="text-success font-medium">{item.passed}</span>
              ),
            },
            {
              key: "failed",
              label: "Failed",
              render: (item) => (
                <span className="text-destructive font-medium">
                  {item.failed}
                </span>
              ),
            },
            {
              key: "passRate",
              label: "Pass Rate",
              render: (item) => {
                const rate = ((item.passed / item.total) * 100).toFixed(1);
                return (
                  <StatusBadge
                    status={
                      Number(rate) >= 97
                        ? "success"
                        : Number(rate) >= 95
                        ? "warning"
                        : "danger"
                    }
                  >
                    {rate}%
                  </StatusBadge>
                );
              },
            },
            { key: "holdTime", label: "Hold Time" },
          ]}
          data={inspectionResults}
        />
      </ChartCard>
    </div>
  );
}
