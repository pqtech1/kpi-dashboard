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
  TrendingUp
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
  Radar
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
    <div className="space-y-8">
      {/* Back Button & Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link to="/pq-offering">
          <Button variant="ghost" className="mb-4 gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Our Services
          </Button>
        </Link>

        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
            <Building2 className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Emperor, GATI, SAP and other ERP's Integration
            </h1>
            <p className="text-lg text-muted-foreground mt-1">
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link2 className="w-5 h-5 text-primary" />
              What is ERP Integration?
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-muted-foreground leading-relaxed">
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
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
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
            <CardContent className="pt-6">
              <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">{benefit.title}</h3>
              <p className="text-3xl font-bold text-primary my-2">
                {benefit.value}
              </p>
              <p className="text-sm text-muted-foreground">{benefit.desc}</p>
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
        <Card>
          <CardHeader>
            <CardTitle>
              Performance Metrics: Before vs After Integration (%)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={syncPerformanceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="metric" type="category" width={120} />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="before"
                    name="Before Integration"
                    fill="#ef4444"
                  />
                  <Bar
                    dataKey="after"
                    name="After Integration"
                    fill="#22c55e"
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
        <Card>
          <CardHeader>
            <CardTitle>Before & After Implementation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Without Integration */}
              <div className="p-6 rounded-xl bg-red-50 border border-red-200">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-6 h-6 text-red-500" />
                  <h3 className="text-lg font-semibold text-red-700">
                    Without ERP Integration
                  </h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Manual data entry between systems",
                    "Data discrepancies and conflicts",
                    "Delayed inventory updates",
                    "No real-time visibility",
                    "Duplicate data entry efforts",
                    "Slow order processing",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-red-700">
                      <AlertTriangle className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* With Integration */}
              <div className="p-6 rounded-xl bg-green-50 border border-green-200">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <h3 className="text-lg font-semibold text-green-700">
                    With ERP Integration
                  </h3>
                </div>
                <ul className="space-y-3">
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
                      className="flex items-start gap-2 text-green-700"
                    >
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
            <CardTitle>Data Processing Volume (Transactions/Day)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dataFlowData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="manual"
                    name="Manual Process"
                    stroke="#ef4444"
                    fill="#fecaca"
                  />
                  <Area
                    type="monotone"
                    dataKey="automated"
                    name="Automated"
                    stroke="#22c55e"
                    fill="#bbf7d0"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Capability Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={capabilityData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="With Integration"
                    dataKey="A"
                    stroke="#22c55e"
                    fill="#22c55e"
                    fillOpacity={0.5}
                  />
                  <Radar
                    name="Without Integration"
                    dataKey="B"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.3}
                  />
                  <Legend />
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
                  className="text-center p-4 bg-white rounded-xl shadow-sm"
                >
                  <p className="text-2xl font-bold text-primary">
                    {stat.value}
                  </p>
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

export default ERPIntegrationSolution;
