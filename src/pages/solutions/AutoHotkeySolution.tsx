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
  Users
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
  Legend
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
    <div className="space-y-8">
      {/* Back Button & Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link to="/pq-offering">
          <Button variant="ghost" className="mb-4 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to PQ Offering
          </Button>
        </Link>
        
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
            <Keyboard className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">AutoHotkey Solutions</h1>
            <p className="text-lg text-muted-foreground mt-1">
              Powerful automation scripts for repetitive tasks and workflow optimization
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              What is AutoHotkey Integration?
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              AutoHotkey is a powerful scripting language designed for Windows automation. Our custom AutoHotkey 
              solutions transform your repetitive manual tasks into automated workflows, dramatically reducing 
              time spent on mundane activities while eliminating human errors. From keyboard shortcuts to complex 
              multi-step processes, we create tailored automation scripts that integrate seamlessly with your 
              existing jewelry manufacturing systems.
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Benefits Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          { icon: Clock, title: "Time Savings", value: "85%", desc: "Reduction in manual task time" },
          { icon: TrendingUp, title: "Productivity Boost", value: "3x", desc: "Increase in daily output" },
          { icon: Zap, title: "Error Reduction", value: "95%", desc: "Fewer data entry mistakes" },
        ].map((benefit, index) => (
          <Card key={benefit.title} className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">{benefit.title}</h3>
              <p className="text-3xl font-bold text-primary my-2">{benefit.value}</p>
              <p className="text-sm text-muted-foreground">{benefit.desc}</p>
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
        <Card>
          <CardHeader>
            <CardTitle>Time Comparison: Manual vs Automated (Minutes)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="task" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="manual" name="Manual Process" fill="#ef4444" />
                  <Bar dataKey="automated" name="Automated" fill="#22c55e" />
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
        <Card>
          <CardHeader>
            <CardTitle>Before & After Implementation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Without AutoHotkey */}
              <div className="p-6 rounded-xl bg-red-50 border border-red-200">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-6 h-6 text-red-500" />
                  <h3 className="text-lg font-semibold text-red-700">Without AutoHotkey</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Manual data entry taking 4+ hours daily",
                    "High error rate in repetitive tasks",
                    "Inconsistent process execution",
                    "Employee fatigue from monotonous work",
                    "Delayed report generation",
                    "Limited scalability"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-red-700">
                      <AlertTriangle className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* With AutoHotkey */}
              <div className="p-6 rounded-xl bg-green-50 border border-green-200">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <h3 className="text-lg font-semibold text-green-700">With AutoHotkey</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Automated data entry in under 30 minutes",
                    "Near-zero error rate with validation",
                    "Standardized, repeatable processes",
                    "Employees focus on high-value tasks",
                    "Instant report generation on demand",
                    "Easily scalable automation"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-green-700">
                      <CheckCircle className="w-4 h-4 mt-1 flex-shrink-0" />
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
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <Card>
          <CardHeader>
            <CardTitle>Efficiency Improvement Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={efficiencyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[50, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="before" name="Before" stroke="#ef4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="after" name="After" stroke="#22c55e" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Error Reduction Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={errorReductionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${value}%`}
                  >
                    {errorReductionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
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
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Business Impact After Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "ROI Achievement", value: "300%", sub: "Within 6 months" },
                { label: "Cost Savings", value: "₹15L", sub: "Annual savings" },
                { label: "Employee Satisfaction", value: "92%", sub: "Survey results" },
                { label: "Process Speed", value: "10x", sub: "Faster execution" },
              ].map((stat) => (
                <div key={stat.label} className="text-center p-4 bg-white rounded-xl shadow-sm">
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className="font-medium text-foreground">{stat.label}</p>
                  <p className="text-xs text-muted-foreground">{stat.sub}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AutoHotkeySolution;
