import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  BarChart3,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  Target,
  Zap,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
} from "recharts";

const decisionSpeedData = [
  { category: "Production Issues", before: 240, after: 15 },
  { category: "Quality Alerts", before: 180, after: 5 },
  { category: "Inventory Decisions", before: 120, after: 10 },
  { category: "Resource Allocation", before: 300, after: 20 },
  { category: "Cost Analysis", before: 480, after: 30 },
];

const performanceImpactData = [
  { month: "Jan", efficiency: 72, oee: 68, quality: 85 },
  { month: "Feb", efficiency: 78, oee: 74, quality: 87 },
  { month: "Mar", efficiency: 82, oee: 78, quality: 89 },
  { month: "Apr", efficiency: 85, oee: 82, quality: 91 },
  { month: "May", efficiency: 88, oee: 85, quality: 93 },
  { month: "Jun", efficiency: 92, oee: 89, quality: 95 },
];

const visibilityData = [
  { metric: "Production", before: 35, after: 95 },
  { metric: "Quality", before: 45, after: 98 },
  { metric: "Inventory", before: 50, after: 92 },
  { metric: "Cost", before: 30, after: 90 },
  { metric: "Workforce", before: 40, after: 88 },
];

const KPIDashboardSolution = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        {/* Back Button & Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Link to="/pq-offering">
            <Button
              variant="ghost"
              className="mb-4 sm:mb-6 gap-2 text-sm sm:text-base"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Our Services</span>
              <span className="sm:hidden">Back</span>
            </Button>
          </Link>

          <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
              <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                KPI Dashboard Solution
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mt-1 sm:mt-2 max-w-3xl">
                Comprehensive production monitoring with real-time KPIs and
                analytics
              </p>
            </div>
          </div>
        </motion.div>

        {/* Overview Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-border/50">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                What is the KPI Dashboard Solution?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Our KPI Dashboard Solution provides a comprehensive, real-time
                view of your entire jewelry manufacturing operation. From
                production tracking to quality metrics, material costs to
                workforce efficiency, every critical metric is visualized in
                intuitive dashboards. This solution enables data-driven decision
                making, early problem detection, and continuous improvement
                across all production phases.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
        >
          {[
            {
              icon: Eye,
              title: "Visibility",
              value: "100%",
              desc: "Complete operational oversight",
            },
            {
              icon: Clock,
              title: "Decision Speed",
              value: "15x",
              desc: "Faster informed decisions",
            },
            {
              icon: Target,
              title: "Goal Achievement",
              value: "94%",
              desc: "KPI target hit rate",
            },
          ].map((benefit) => (
            <Card key={benefit.title} className="text-center">
              <CardContent className="p-4 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm sm:text-base">
                  {benefit.title}
                </h3>
                <p className="text-2xl sm:text-3xl font-bold text-primary my-2">
                  {benefit.value}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {benefit.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Decision Speed Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-border/50">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl">
                Decision Response Time (Minutes)
              </CardTitle>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={decisionSpeedData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="category"
                      fontSize={12}
                      tickLine={false}
                      axisLine={{ stroke: "#e5e7eb" }}
                    />
                    <YAxis
                      fontSize={12}
                      tickLine={false}
                      axisLine={{ stroke: "#e5e7eb" }}
                    />
                    <Tooltip
                      contentStyle={{
                        fontSize: "12px",
                        borderRadius: "8px",
                        padding: "8px 12px",
                      }}
                      formatter={(value) => [`${value} mins`, "Time"]}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: "12px", marginTop: "10px" }}
                    />
                    <Bar
                      dataKey="before"
                      name="Without Dashboard"
                      fill="#ef4444"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="after"
                      name="With Dashboard"
                      fill="#22c55e"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Before vs After Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-border/50">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl">
                Before & After Implementation
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Without Dashboard */}
                <div className="p-4 sm:p-6 rounded-xl bg-red-50 border border-red-200">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                    <h3 className="text-base sm:text-lg font-semibold text-red-700">
                      Without KPI Dashboard
                    </h3>
                  </div>
                  <ul className="space-y-2 sm:space-y-3">
                    {[
                      "Scattered data across spreadsheets",
                      "Weekly/monthly reports only",
                      "Reactive problem solving",
                      "No real-time visibility",
                      "Manual report compilation",
                      "Delayed performance insights",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm sm:text-base text-red-700"
                      >
                        <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* With Dashboard */}
                <div className="p-4 sm:p-6 rounded-xl bg-green-50 border border-green-200">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                    <h3 className="text-base sm:text-lg font-semibold text-green-700">
                      With KPI Dashboard
                    </h3>
                  </div>
                  <ul className="space-y-2 sm:space-y-3">
                    {[
                      "Centralized data visualization",
                      "Real-time live metrics",
                      "Proactive issue detection",
                      "Complete operational visibility",
                      "Automated report generation",
                      "Instant performance insights",
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm sm:text-base text-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
        >
          {/* Performance Chart */}
          <Card className="border-border/50">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl">
                Performance Improvement Over Time
              </CardTitle>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <div className="h-52 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={performanceImpactData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="month"
                      fontSize={12}
                      tickLine={false}
                      axisLine={{ stroke: "#e5e7eb" }}
                    />
                    <YAxis
                      domain={[60, 100]}
                      fontSize={12}
                      tickLine={false}
                      axisLine={{ stroke: "#e5e7eb" }}
                    />
                    <Tooltip
                      contentStyle={{
                        fontSize: "12px",
                        borderRadius: "8px",
                        padding: "8px 12px",
                      }}
                      formatter={(value) => [`${value}%`, "Score"]}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: "12px", marginTop: "10px" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="efficiency"
                      name="Efficiency"
                      stroke="#3b82f6"
                      fill="#93c5fd"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="oee"
                      name="OEE"
                      stroke="#22c55e"
                      fill="#bbf7d0"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="quality"
                      name="Quality"
                      stroke="#8b5cf6"
                      fill="#c4b5fd"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Visibility Chart */}
          <Card className="border-border/50">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl">
                Operational Visibility Improvement (%)
              </CardTitle>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <div className="h-52 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={visibilityData}
                    layout="vertical"
                    margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="#f0f0f0"
                      horizontal={false}
                    />
                    <XAxis
                      type="number"
                      domain={[0, 100]}
                      fontSize={12}
                      tickLine={false}
                      axisLine={{ stroke: "#e5e7eb" }}
                    />
                    <YAxis
                      dataKey="metric"
                      type="category"
                      width={80}
                      fontSize={12}
                      tickLine={false}
                      axisLine={{ stroke: "#e5e7eb" }}
                    />
                    <Tooltip
                      contentStyle={{
                        fontSize: "12px",
                        borderRadius: "8px",
                        padding: "8px 12px",
                      }}
                      formatter={(value) => [`${value}%`, "Visibility"]}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: "12px", marginTop: "10px" }}
                    />
                    <Bar
                      dataKey="before"
                      name="Before"
                      fill="#ef4444"
                      radius={[0, 4, 4, 0]}
                    />
                    <Bar
                      dataKey="after"
                      name="After"
                      fill="#22c55e"
                      radius={[0, 4, 4, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
        >
          <Card className="border-border/50">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl">
                Dashboard Features
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                {[
                  {
                    title: "Production Tracking",
                    desc: "Real-time output monitoring",
                  },
                  {
                    title: "Quality Metrics",
                    desc: "Defect rate & QC pass rates",
                  },
                  {
                    title: "Material Costing",
                    desc: "Gold, silver, stone tracking",
                  },
                  {
                    title: "OEE Monitoring",
                    desc: "Equipment efficiency metrics",
                  },
                  {
                    title: "Workforce Analytics",
                    desc: "Productivity by department",
                  },
                  {
                    title: "Trend Analysis",
                    desc: "Historical pattern recognition",
                  },
                  {
                    title: "Custom Alerts",
                    desc: "Threshold-based notifications",
                  },
                  {
                    title: "Export Reports",
                    desc: "PDF & Excel generation",
                  },
                ].map((feature, index) => (
                  <div
                    key={feature.title}
                    className="p-3 sm:p-4 bg-muted/50 rounded-xl hover:bg-muted/70 transition-colors"
                  >
                    <h4 className="font-semibold text-foreground text-sm sm:text-base">
                      {feature.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Business Impact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-border/50">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                Business Impact After Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {[
                  {
                    label: "OEE Improvement",
                    value: "+25%",
                    sub: "Overall equipment effectiveness",
                  },
                  {
                    label: "Cost Reduction",
                    value: "18%",
                    sub: "Operational cost savings",
                  },
                  {
                    label: "Quality Score",
                    value: "95%",
                    sub: "First-pass yield",
                  },
                  {
                    label: "Response Time",
                    value: "-85%",
                    sub: "Issue resolution speed",
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="text-center p-3 sm:p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white"
                  >
                    <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary">
                      {stat.value}
                    </p>
                    <p className="font-medium text-foreground text-sm sm:text-base mt-1">
                      {stat.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.sub}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default KPIDashboardSolution;
