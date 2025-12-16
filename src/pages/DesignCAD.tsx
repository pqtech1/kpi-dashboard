import { KPICard } from "@/components/shared/KPICard";
import { ChartCard } from "@/components/shared/ChartCard";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { GaugeChart } from "@/components/shared/GaugeChart";
import { Palette, Printer, AlertTriangle, Clock, CheckCircle, XCircle } from "lucide-react";
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

const cadCycleTime = [
  { designer: "Amit", avgTime: 2.5, designs: 45 },
  { designer: "Priya", avgTime: 2.2, designs: 52 },
  { designer: "Rahul", avgTime: 3.1, designs: 38 },
  { designer: "Sneha", avgTime: 2.8, designs: 41 },
  { designer: "Vikram", avgTime: 2.4, designs: 48 },
];

const printerUtilization = [
  { printer: "Printer 1", utilization: 87, prints: 156, failures: 3 },
  { printer: "Printer 2", utilization: 92, prints: 168, failures: 2 },
  { printer: "Printer 3", utilization: 78, prints: 142, failures: 8 },
  { printer: "Printer 4", utilization: 85, prints: 152, failures: 4 },
];

const failureReasons = [
  { name: "Layer Adhesion", value: 32, color: "hsl(var(--destructive))" },
  { name: "Support Failure", value: 28, color: "hsl(var(--warning))" },
  { name: "Material Issue", value: 22, color: "hsl(var(--primary))" },
  { name: "Calibration", value: 18, color: "hsl(var(--chart-4))" },
];

const approvalTrend = [
  { week: "W1", submitted: 45, approved: 42, rejected: 3 },
  { week: "W2", submitted: 52, approved: 48, rejected: 4 },
  { week: "W3", submitted: 48, approved: 45, rejected: 3 },
  { week: "W4", submitted: 56, approved: 51, rejected: 5 },
];

const pendingApprovals = [
  { id: "CAD-1245", design: "Ring Model A", designer: "Priya", submitted: "2 hrs ago", priority: "high" },
  { id: "CAD-1246", design: "Pendant Design B", designer: "Amit", submitted: "4 hrs ago", priority: "medium" },
  { id: "CAD-1247", design: "Bracelet Pattern C", designer: "Rahul", submitted: "6 hrs ago", priority: "low" },
  { id: "CAD-1248", design: "Earring Set D", designer: "Sneha", submitted: "8 hrs ago", priority: "medium" },
];

export default function DesignCAD() {
  return (
    <div className="space-y-6">
      {/* Header */}     

      <div className="flex flex-col items-center text-center space-y-3">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
          Design & CAD/CAM
        </h1>

        <p className="max-w-xl text-sm sm:text-base text-muted-foreground">
          Track design-to-print efficiency and workflow{" "}
        </p>

        {/* Decorative divider */}
        <div className="mt-2 h-1 w-14 rounded-full bg-primary/60" />
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="Avg CAD Cycle Time"
          value="2.6"
          unit="hrs/design"
          trend={-8.5}
          trendLabel="improvement"
          icon={Clock}
          variant="success"
        />
        <KPICard
          title="3D Printer Utilization"
          value="85.5"
          unit="%"
          trend={3.2}
          trendLabel="vs last week"
          icon={Printer}
          variant="default"
        />
        <KPICard
          title="Print Failure Rate"
          value="2.8"
          unit="%"
          trend={-22}
          trendLabel="reduction"
          icon={AlertTriangle}
          variant="success"
        />
        <KPICard
          title="Approval Lead Time"
          value="4.2"
          unit="hrs"
          trend={-15}
          trendLabel="faster"
          icon={Palette}
          variant="success"
        />
      </div>

      {/* CAD Performance & Printer Utilization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="CAD Cycle Time by Designer"
          subtitle="Average hours per design"
        >
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={cadCycleTime} layout="vertical">
              <CartesianGrid
                strokeDasharray="3 3"
                className="stroke-muted"
                horizontal={false}
              />
              <XAxis type="number" className="text-xs" domain={[0, 4]} />
              <YAxis
                dataKey="designer"
                type="category"
                className="text-xs"
                width={60}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
                formatter={(value: number) => [`${value} hrs`, "Avg Time"]}
              />
              <Bar
                dataKey="avgTime"
                fill="hsl(var(--primary))"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="3D Printer Status" subtitle="Real-time utilization">
          <div className="grid grid-cols-2 gap-4">
            {printerUtilization.map((printer) => (
              <div key={printer.printer} className="p-3 bg-muted/50 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-medium text-sm">{printer.printer}</span>
                  <StatusBadge
                    status={
                      printer.utilization >= 85
                        ? "success"
                        : printer.utilization >= 70
                        ? "warning"
                        : "danger"
                    }
                  >
                    {printer.utilization}%
                  </StatusBadge>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden mb-2">
                  <div
                    className={`h-full rounded-full ${
                      printer.utilization >= 85
                        ? "bg-success"
                        : printer.utilization >= 70
                        ? "bg-warning"
                        : "bg-destructive"
                    }`}
                    style={{ width: `${printer.utilization}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{printer.prints} prints</span>
                  <span>{printer.failures} failures</span>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Print Failures & Approval Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="Print Failure Analysis"
          subtitle="Root cause breakdown"
        >
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={220}>
              <PieChart>
                <Pie
                  data={failureReasons}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {failureReasons.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {failureReasons.map((item) => (
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
          title="Design Approval Trend"
          subtitle="Weekly submission & approval rate"
        >
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={approvalTrend}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="week" className="text-xs" />
              <YAxis className="text-xs" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar
                dataKey="approved"
                fill="hsl(var(--success))"
                name="Approved"
                stackId="a"
              />
              <Bar
                dataKey="rejected"
                fill="hsl(var(--destructive))"
                name="Rejected"
                stackId="a"
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Pending Approvals Table */}
      <ChartCard
        title="Pending Design Approvals"
        subtitle="Designs awaiting review"
      >
        <DataTable
          columns={[
            { key: "id", label: "ID" },
            { key: "design", label: "Design Name" },
            { key: "designer", label: "Designer" },
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
            {
              key: "actions",
              label: "Actions",
              render: () => (
                <div className="flex gap-2">
                  <button className="p-1 rounded hover:bg-success/10 text-success">
                    <CheckCircle size={16} />
                  </button>
                  <button className="p-1 rounded hover:bg-destructive/10 text-destructive">
                    <XCircle size={16} />
                  </button>
                </div>
              ),
            },
          ]}
          data={pendingApprovals}
        />
      </ChartCard>
    </div>
  );
}
