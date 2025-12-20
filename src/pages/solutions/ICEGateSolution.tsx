import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Globe,
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Shield,
  Zap,
  IndianRupee,
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
  PieChart,
  Pie,
  Cell,
} from "recharts";

const processingTimeData = [
  { stage: "Document Prep", manual: 180, automated: 15 },
  { stage: "Filing", manual: 120, automated: 5 },
  { stage: "Verification", manual: 240, automated: 30 },
  { stage: "Duty Calc", manual: 60, automated: 2 },
  { stage: "Approval Wait", manual: 480, automated: 120 },
];

const complianceData = [
  { month: "Jan", compliance: 92, target: 100 },
  { month: "Feb", compliance: 95, target: 100 },
  { month: "Mar", compliance: 97, target: 100 },
  { month: "Apr", compliance: 99, target: 100 },
  { month: "May", compliance: 99.5, target: 100 },
  { month: "Jun", compliance: 99.8, target: 100 },
];

const costBreakdownData = [
  { name: "Duty Savings", value: 45, color: "#22c55e" },
  { name: "Time Savings", value: 30, color: "#3b82f6" },
  { name: "Error Prevention", value: 15, color: "#f59e0b" },
  { name: "Compliance Benefits", value: 10, color: "#8b5cf6" },
];

const ICEGateSolution = () => {
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
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
              <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                <span className="block sm:inline">IMEXIO and ICEGate</span>{" "}
                <span className="block sm:inline">Integration</span>
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mt-1 sm:mt-2 max-w-3xl">
                Automated customs clearance and compliance with Indian Customs
                EDI Gateway
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
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                What is IMEXIO and ICEGate Integration?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                ICEGate (Indian Customs Electronic Gateway) is the national
                portal for customs electronic data interchange. Our integration
                solution automates the entire customs filing process, from
                document preparation to duty calculation and compliance
                verification. This eliminates manual paperwork, reduces
                clearance times, and ensures 100% compliance with Indian customs
                regulations for jewelry import/export operations.
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
              icon: Clock,
              title: "Clearance Time",
              value: "75%",
              desc: "Faster customs processing",
            },
            {
              icon: Shield,
              title: "Compliance Rate",
              value: "100%",
              desc: "Full regulatory compliance",
            },
            {
              icon: IndianRupee,
              title: "Cost Savings",
              value: "₹8L+",
              desc: "Annual penalty avoidance",
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

        {/* Processing Time Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-border/50">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl">
                Processing Time Comparison (Minutes)
              </CardTitle>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <div className="h-64 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={processingTimeData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="stage"
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
                      dataKey="manual"
                      name="Manual Process"
                      fill="#ef4444"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="automated"
                      name="ICEGate Automated"
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
                {/* Without ICEGate */}
                <div className="p-4 sm:p-6 rounded-xl bg-red-50 border border-red-200">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                    <h3 className="text-base sm:text-lg font-semibold text-red-700">
                      Without ICEGate Integration
                    </h3>
                  </div>
                  <ul className="space-y-2 sm:space-y-3">
                    {[
                      "Manual document preparation",
                      "Physical visits to customs office",
                      "Delayed shipment clearances",
                      "High risk of compliance errors",
                      "Manual duty calculations",
                      "Unpredictable clearance times",
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

                {/* With ICEGate */}
                <div className="p-4 sm:p-6 rounded-xl bg-green-50 border border-green-200">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                    <h3 className="text-base sm:text-lg font-semibold text-green-700">
                      With ICEGate Integration
                    </h3>
                  </div>
                  <ul className="space-y-2 sm:space-y-3">
                    {[
                      "Automated document generation",
                      "Online filing from anywhere",
                      "Fast-track clearance process",
                      "Built-in compliance validation",
                      "Automatic duty calculation",
                      "Predictable processing times",
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
          {/* Compliance Rate Chart */}
          <Card className="border-border/50">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl">
                Compliance Rate Improvement
              </CardTitle>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <div className="h-52 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={complianceData}
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
                      domain={[90, 100]}
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
                      formatter={(value) => [`${value}%`, "Compliance"]}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: "12px", marginTop: "10px" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="compliance"
                      name="Compliance %"
                      stroke="#22c55e"
                      strokeWidth={2}
                      dot={{ strokeWidth: 2, r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="target"
                      name="Target"
                      stroke="#94a3b8"
                      strokeDasharray="5 5"
                      strokeWidth={1}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Cost Savings Breakdown */}
          <Card className="border-border/50">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl">
                Cost Savings Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <div className="h-52 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={costBreakdownData}
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
                      fontSize={12}
                      tickLine={false}
                      axisLine={{ stroke: "#e5e7eb" }}
                    />
                    <YAxis
                      type="category"
                      dataKey="name"
                      fontSize={12}
                      tickLine={false}
                      axisLine={{ stroke: "#e5e7eb" }}
                      width={90}
                    />
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Savings"]}
                      contentStyle={{
                        fontSize: "12px",
                        borderRadius: "8px",
                        padding: "8px 12px",
                      }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {costBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              {/* Color Legend */}
              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4">
                {costBreakdownData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs sm:text-sm text-muted-foreground">
                      {item.name}
                    </span>
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
                <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
                Business Impact After Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {[
                  {
                    label: "Clearance Speed",
                    value: "4x",
                    sub: "Faster processing",
                  },
                  {
                    label: "Compliance Score",
                    value: "100%",
                    sub: "Zero violations",
                  },
                  {
                    label: "Monthly Savings",
                    value: "₹15L",
                    sub: "Total cost reduction",
                  },
                  {
                    label: "Documents/Day",
                    value: "50+",
                    sub: "Processing capacity",
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

export default ICEGateSolution;
