import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Keyboard,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
  Target,
  Users,
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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

const timeComparisonData = [
  { task: "Data Entry", manual: 45, automated: 5 },
  { task: "Report Gen", manual: 30, automated: 3 },
  { task: "Inventory Check", manual: 60, automated: 8 },
  { task: "Order Processing", manual: 25, automated: 4 },
  { task: "Email Tasks", manual: 20, automated: 2 },
];

const efficiencyData = [
  { month: "Jan", before: 65, after: 92 },
  { month: "Feb", before: 68, after: 94 },
  { month: "Mar", before: 62, after: 95 },
  { month: "Apr", before: 70, after: 96 },
  { month: "May", before: 66, after: 97 },
  { month: "Jun", before: 64, after: 98 },
];

const errorReductionData = [
  { name: "Human Errors Eliminated", value: 85, color: "#22c55e" },
  { name: "Remaining Manual Tasks", value: 15, color: "#ef4444" },
];

const AutoHotkeySolution = () => {
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
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
              <Keyboard className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
                AutoHotkey Solutions
              </h1>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mt-1 sm:mt-2 max-w-3xl">
                Powerful automation scripts for repetitive tasks and workflow
                optimization
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
                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                What is AutoHotkey Integration?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                AutoHotkey is a powerful scripting language designed for Windows
                automation. Our custom AutoHotkey solutions transform your
                repetitive manual tasks into automated workflows, dramatically
                reducing time spent on mundane activities while eliminating
                human errors. From keyboard shortcuts to complex multi-step
                processes, we create tailored automation scripts that integrate
                seamlessly with your existing jewelry manufacturing systems.
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
              title: "Time Savings",
              value: "85%",
              desc: "Reduction in manual task time",
            },
            {
              icon: TrendingUp,
              title: "Productivity Boost",
              value: "3x",
              desc: "Increase in daily output",
            },
            {
              icon: Zap,
              title: "Error Reduction",
              value: "95%",
              desc: "Fewer data entry mistakes",
            },
          ].map((benefit, index) => (
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

        {/* Comparison Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-border/50">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl">
                Time Comparison: Manual vs Automated (Minutes)
              </CardTitle>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <div className="h-60 sm:h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={timeComparisonData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="task"
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
                      contentStyle={{ fontSize: "12px", borderRadius: "8px" }}
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
                      name="Automated"
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
                {/* Without AutoHotkey */}
                <div className="p-4 sm:p-6 rounded-xl bg-red-50 border border-red-200">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                    <h3 className="text-base sm:text-lg font-semibold text-red-700">
                      Without AutoHotkey
                    </h3>
                  </div>
                  <ul className="space-y-2 sm:space-y-3">
                    {[
                      "Manual data entry taking 24 hours daily",
                      "High error rate in repetitive tasks",
                      "Inconsistent process execution",
                      "Employee fatigue from monotonous work",
                      "Delayed report generation",
                      "Limited scalability",
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

                {/* With AutoHotkey */}
                <div className="p-4 sm:p-6 rounded-xl bg-green-50 border border-green-200">
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                    <h3 className="text-base sm:text-lg font-semibold text-green-700">
                      With AutoHotkey
                    </h3>
                  </div>
                  <ul className="space-y-2 sm:space-y-3">
                    {[
                      "Automated data entry in under 24 minutes",
                      "Near-zero error rate with validation",
                      "Standardized, repeatable processes",
                      "Employees focus on high-value tasks",
                      "Instant report generation on demand",
                      "Easily scalable automation",
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

        {/* Efficiency Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
        >
          {/* Efficiency Chart */}
          <Card className="border-border/50">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl">
                Efficiency Improvement Over Time
              </CardTitle>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <div className="h-52 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={efficiencyData}
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
                      domain={[50, 100]}
                      fontSize={12}
                      tickLine={false}
                      axisLine={{ stroke: "#e5e7eb" }}
                    />
                    <Tooltip
                      contentStyle={{ fontSize: "12px", borderRadius: "8px" }}
                    />
                    <Legend
                      wrapperStyle={{ fontSize: "12px", marginTop: "10px" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="before"
                      name="Before"
                      stroke="#ef4444"
                      strokeWidth={2}
                      dot={{ strokeWidth: 2, r: 3 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="after"
                      name="After"
                      stroke="#22c55e"
                      strokeWidth={2}
                      dot={{ strokeWidth: 2, r: 3 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Error Reduction Chart */}
          <Card className="border-border/50">
            <CardHeader className="pb-3 sm:pb-4">
              <CardTitle className="text-lg sm:text-xl">
                Error Reduction Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="px-2 sm:px-6">
              <div className="h-52 sm:h-64 flex flex-col">
                <div className="flex-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={errorReductionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, value }) => `${value}%`}
                      >
                        {errorReductionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ fontSize: "12px", borderRadius: "8px" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {errorReductionData.map((item, index) => (
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
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                Business Impact After Integration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {[
                  {
                    label: "ROI Achievement",
                    value: "300%",
                    sub: "Within 6 months",
                  },
                  {
                    label: "Cost Savings",
                    value: "₹15L",
                    sub: "Monthly savings",
                  },
                  {
                    label: "Employee Satisfaction",
                    value: "92%",
                    sub: "Survey results",
                  },
                  {
                    label: "Process Speed",
                    value: "10x",
                    sub: "Faster execution",
                  },
                ].map((stat, index) => (
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

export default AutoHotkeySolution;
