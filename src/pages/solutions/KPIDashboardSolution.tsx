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
  Clock
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
  Area
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
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">KPI Dashboard Solution</h1>
            <p className="text-lg text-muted-foreground mt-1">
              Comprehensive production monitoring with real-time KPIs and analytics
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
              <Eye className="w-5 h-5 text-primary" />
              What is the KPI Dashboard Solution?
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              Our KPI Dashboard Solution provides a comprehensive, real-time view of your entire jewelry 
              manufacturing operation. From production tracking to quality metrics, material costs to 
              workforce efficiency, every critical metric is visualized in intuitive dashboards. This 
              solution enables data-driven decision making, early problem detection, and continuous 
              improvement across all production phases.
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
          { icon: Eye, title: "Visibility", value: "100%", desc: "Complete operational oversight" },
          { icon: Clock, title: "Decision Speed", value: "15x", desc: "Faster informed decisions" },
          { icon: Target, title: "Goal Achievement", value: "94%", desc: "KPI target hit rate" },
        ].map((benefit) => (
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

      {/* Decision Speed Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Decision Response Time (Minutes)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={decisionSpeedData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="before" name="Without Dashboard" fill="#ef4444" />
                  <Bar dataKey="after" name="With Dashboard" fill="#22c55e" />
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
              {/* Without Dashboard */}
              <div className="p-6 rounded-xl bg-red-50 border border-red-200">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-6 h-6 text-red-500" />
                  <h3 className="text-lg font-semibold text-red-700">Without KPI Dashboard</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Scattered data across spreadsheets",
                    "Weekly/monthly reports only",
                    "Reactive problem solving",
                    "No real-time visibility",
                    "Manual report compilation",
                    "Delayed performance insights"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-red-700">
                      <AlertTriangle className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* With Dashboard */}
              <div className="p-6 rounded-xl bg-green-50 border border-green-200">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <h3 className="text-lg font-semibold text-green-700">With KPI Dashboard</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Centralized data visualization",
                    "Real-time live metrics",
                    "Proactive issue detection",
                    "Complete operational visibility",
                    "Automated report generation",
                    "Instant performance insights"
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

      {/* Charts Row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <Card>
          <CardHeader>
            <CardTitle>Performance Improvement Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceImpactData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[60, 100]} />
                  <Tooltip />
                  <Legend />
                  <Area type="monotone" dataKey="efficiency" name="Efficiency" stroke="#3b82f6" fill="#93c5fd" />
                  <Area type="monotone" dataKey="oee" name="OEE" stroke="#22c55e" fill="#bbf7d0" />
                  <Area type="monotone" dataKey="quality" name="Quality" stroke="#8b5cf6" fill="#c4b5fd" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Operational Visibility Improvement (%)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={visibilityData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="metric" type="category" width={80} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="before" name="Before" fill="#ef4444" />
                  <Bar dataKey="after" name="After" fill="#22c55e" />
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
        <Card>
          <CardHeader>
            <CardTitle>Dashboard Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "Production Tracking", desc: "Real-time output monitoring" },
                { title: "Quality Metrics", desc: "Defect rate & QC pass rates" },
                { title: "Material Costing", desc: "Gold, silver, stone tracking" },
                { title: "OEE Monitoring", desc: "Equipment efficiency metrics" },
                { title: "Workforce Analytics", desc: "Productivity by department" },
                { title: "Trend Analysis", desc: "Historical pattern recognition" },
                { title: "Custom Alerts", desc: "Threshold-based notifications" },
                { title: "Export Reports", desc: "PDF & Excel generation" },
              ].map((feature) => (
                <div key={feature.title} className="p-4 bg-muted/50 rounded-xl">
                  <h4 className="font-semibold text-foreground">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
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
        <Card className="bg-gradient-to-r from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Business Impact After Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "OEE Improvement", value: "+25%", sub: "Overall equipment effectiveness" },
                { label: "Cost Reduction", value: "18%", sub: "Operational cost savings" },
                { label: "Quality Score", value: "95%", sub: "First-pass yield" },
                { label: "Response Time", value: "-85%", sub: "Issue resolution speed" },
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

export default KPIDashboardSolution;
