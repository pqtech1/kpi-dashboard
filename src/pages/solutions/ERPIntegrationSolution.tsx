import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Database,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Link2,
  Shield,
  TrendingUp,
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
  AreaChart,
  Area,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

const syncPerformanceData = [
  { metric: "Order Processing", before: 45, after: 95 },
  { metric: "Inventory Accuracy", before: 72, after: 99 },
  { metric: "Data Consistency", before: 65, after: 98 },
  { metric: "Reporting Speed", before: 40, after: 92 },
  { metric: "Error Rate", before: 85, after: 5 },
];

const dataFlowData = [
  { month: "Jan", manual: 1200, automated: 5400 },
  { month: "Feb", manual: 1400, automated: 6200 },
  { month: "Mar", manual: 1100, automated: 7100 },
  { month: "Apr", manual: 1300, automated: 7800 },
  { month: "May", manual: 1500, automated: 8500 },
  { month: "Jun", manual: 1200, automated: 9200 },
];

const capabilityData = [
  { subject: "Real-time Sync", A: 95, B: 30 },
  { subject: "Data Accuracy", A: 99, B: 72 },
  { subject: "Scalability", A: 90, B: 45 },
  { subject: "Automation", A: 88, B: 25 },
  { subject: "Reporting", A: 92, B: 55 },
  { subject: "Integration", A: 96, B: 40 },
];

const ERPIntegrationSolution = () => {
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
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
              <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                <span className="block sm:inline">Emperor, GATI, SAP</span>{" "}
                <span className="block sm:inline">
                  and other ERP's Integration
                </span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mt-1 sm:mt-2 max-w-3xl">
                Seamless connectivity with Emperor, GATI, SAP and other ERP's
                systems for unified data flow
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
                <Link2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                What is ERP Integration?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Our ERP Integration solution creates a seamless bridge between
                your jewelry manufacturing operations and enterprise resource
                planning systems like Emperor, GATI, SAP and other ERP's. This
                integration enables real-time data synchronization, eliminating
                manual data entry, reducing errors, and providing a unified view
                of your entire business operations. From inventory management to
                order processing, every transaction flows automatically between
                systems.
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
              icon: RefreshCw,
              title: "Real-time Sync",
              value: "24/7",
              desc: "Continuous data synchronization",
            },
            {
              icon: Database,
              title: "Data Accuracy",
              value: "99.9%",
              desc: "Elimination of manual errors",
            },
            {
              icon: Shield,
              title: "System Uptime",
              value: "99.95%",
              desc: "High availability guarantee",
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

        {/* Performance Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-border/50">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl">
                Performance Metrics: Before vs After Integration (%)
              </CardTitle>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={syncPerformanceData}
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
                      width={100}
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
                    <Bar
                      dataKey="before"
                      name="Before Integration"
                      fill="#ef4444"
                      radius={[0, 4, 4, 0]}
                    />
                    <Bar
                      dataKey="after"
                      name="After Integration"
                      fill="#22c55e"
                      radius={[0, 4, 4, 0]}
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
                {/* Without Integration */}
                <div className="p-4 sm:p-6 rounded-xl bg-red-50 border border-red-200">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                    <h3 className="text-base sm:text-lg font-semibold text-red-700">
                      Without ERP Integration
                    </h3>
                  </div>
                  <ul className="space-y-2 sm:space-y-3">
                    {[
                      "Manual data entry between systems",
                      "Data discrepancies and conflicts",
                      "Delayed inventory updates",
                      "No real-time visibility",
                      "Duplicate data entry efforts",
                      "Slow order processing",
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

                {/* With Integration */}
                <div className="p-4 sm:p-6 rounded-xl bg-green-50 border border-green-200">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                    <h3 className="text-base sm:text-lg font-semibold text-green-700">
                      With ERP Integration
                    </h3>
                  </div>
                  <ul className="space-y-2 sm:space-y-3">
                    {[
                      "Automatic bi-directional sync",
                      "Single source of truth for data",
                      "Real-time inventory tracking",
                      "Complete operational visibility",
                      "Zero duplicate entry needed",
                      "Instant order processing",
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
          {/* Data Processing Volume Chart */}
          <Card className="border-border/50">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl">
                Data Processing Volume (Transactions/Day)
              </CardTitle>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <div className="h-52 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={dataFlowData}
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
                      formatter={(value) => [`${value}`, "Transactions"]}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: "12px", marginTop: "10px" }}
                    />
                    <Area
                      type="monotone"
                      dataKey="manual"
                      name="Manual Process"
                      stroke="#ef4444"
                      fill="#fecaca"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="automated"
                      name="Automated"
                      stroke="#22c55e"
                      fill="#bbf7d0"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Capability Comparison Chart */}
          <Card className="border-border/50">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl">
                Capability Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <div className="h-52 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart
                    data={capabilityData}
                    margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                  >
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fontSize: 11 }}
                      stroke="#6b7280"
                    />
                    <PolarRadiusAxis
                      angle={30}
                      domain={[0, 100]}
                      stroke="#6b7280"
                      tick={{ fontSize: 10 }}
                    />
                    <Radar
                      name="With Integration"
                      dataKey="A"
                      stroke="#22c55e"
                      fill="#22c55e"
                      fillOpacity={0.5}
                      strokeWidth={2}
                    />
                    <Radar
                      name="Without Integration"
                      dataKey="B"
                      stroke="#ef4444"
                      fill="#ef4444"
                      fillOpacity={0.3}
                      strokeWidth={2}
                    />
                    <Legend
                      wrapperStyle={{
                        fontSize: "12px",
                        marginTop: "20px",
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
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
                    label: "Processing Speed",
                    value: "5x",
                    sub: "Faster operations",
                  },
                  {
                    label: "Cost Reduction",
                    value: "40%",
                    sub: "Operational savings",
                  },
                  {
                    label: "Data Accuracy",
                    value: "99.9%",
                    sub: "Near-perfect sync",
                  },
                  {
                    label: "Staff Efficiency",
                    value: "+65%",
                    sub: "Productivity gain",
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

export default ERPIntegrationSolution;
