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
  IndianRupee
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
  Cell
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
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">ICEGate Integration</h1>
            <p className="text-lg text-muted-foreground mt-1">
              Automated customs clearance and compliance with Indian Customs EDI Gateway
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
              <Globe className="w-5 h-5 text-primary" />
              What is ICEGate Integration?
            </CardTitle>
          </CardHeader>
          <CardContent className="prose max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              ICEGate (Indian Customs Electronic Gateway) is the national portal for customs electronic 
              data interchange. Our integration solution automates the entire customs filing process, 
              from document preparation to duty calculation and compliance verification. This eliminates 
              manual paperwork, reduces clearance times, and ensures 100% compliance with Indian customs 
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
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          { icon: Clock, title: "Clearance Time", value: "75%", desc: "Faster customs processing" },
          { icon: Shield, title: "Compliance Rate", value: "100%", desc: "Full regulatory compliance" },
          { icon: IndianRupee, title: "Cost Savings", value: "₹8L+", desc: "Annual penalty avoidance" },
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

      {/* Processing Time Comparison */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Processing Time Comparison (Minutes)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={processingTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="manual" name="Manual Process" fill="#ef4444" />
                  <Bar dataKey="automated" name="ICEGate Automated" fill="#22c55e" />
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
              {/* Without ICEGate */}
              <div className="p-6 rounded-xl bg-red-50 border border-red-200">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-6 h-6 text-red-500" />
                  <h3 className="text-lg font-semibold text-red-700">Without ICEGate Integration</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Manual document preparation",
                    "Physical visits to customs office",
                    "Delayed shipment clearances",
                    "High risk of compliance errors",
                    "Manual duty calculations",
                    "Unpredictable clearance times"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-red-700">
                      <AlertTriangle className="w-4 h-4 mt-1 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* With ICEGate */}
              <div className="p-6 rounded-xl bg-green-50 border border-green-200">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <h3 className="text-lg font-semibold text-green-700">With ICEGate Integration</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Automated document generation",
                    "Online filing from anywhere",
                    "Fast-track clearance process",
                    "Built-in compliance validation",
                    "Automatic duty calculation",
                    "Predictable processing times"
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
            <CardTitle>Compliance Rate Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={complianceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[90, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="compliance" name="Compliance %" stroke="#22c55e" strokeWidth={2} />
                  <Line type="monotone" dataKey="target" name="Target" stroke="#94a3b8" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cost Savings Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={costBreakdownData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${value}%`}
                  >
                    {costBreakdownData.map((entry, index) => (
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
              <Zap className="w-5 h-5" />
              Business Impact After Integration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Clearance Speed", value: "4x", sub: "Faster processing" },
                { label: "Compliance Score", value: "100%", sub: "Zero violations" },
                { label: "Annual Savings", value: "₹12L", sub: "Total cost reduction" },
                { label: "Documents/Day", value: "50+", sub: "Processing capacity" },
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

export default ICEGateSolution;
