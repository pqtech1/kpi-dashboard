import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Keyboard, 
  Building2, 
  Globe, 
  BarChart3,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const offerings = [
  {
    id: "autohotkey",
    title: "AutoHotkey Solutions",
    icon: Keyboard,
    description: "Powerful automation scripts for repetitive tasks and workflow optimization",
    color: "from-orange-500 to-red-500",
    features: ["Task Automation", "Keyboard Shortcuts", "Process Optimization", "Time Savings"]
  },
  {
    id: "erp-integration",
    title: "Emperor & GATI ERP Integration",
    icon: Building2,
    description: "Seamless integration with Emperor and GATI ERP systems for unified data flow",
    color: "from-blue-500 to-indigo-500",
    features: ["Data Sync", "Real-time Updates", "Inventory Management", "Order Processing"]
  },
  {
    id: "icegate",
    title: "ICEGate Integration",
    icon: Globe,
    description: "Automated customs clearance and compliance with Indian Customs EDI Gateway",
    color: "from-green-500 to-emerald-500",
    features: ["Customs Filing", "Document Automation", "Compliance", "Duty Calculation"]
  },
  {
    id: "kpi-dashboard",
    title: "KPI Dashboard Solution",
    icon: BarChart3,
    description: "Comprehensive production monitoring with real-time KPIs and analytics",
    color: "from-purple-500 to-pink-500",
    features: ["Real-time Metrics", "Custom Reports", "Trend Analysis", "Alerts"]
  }
];

const PQOffering = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
          PQ Offering Solutions
        </h1>
        <p className="text-lg text-muted-foreground">
          Enterprise-grade solutions tailored for jewelry manufacturing excellence. 
          Explore our comprehensive suite of integrations and tools.
        </p>
      </motion.div>

      {/* Offerings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offerings.map((offering, index) => (
          <motion.div
            key={offering.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/pq-offering/${offering.id}`}>
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group overflow-hidden">
                <CardHeader className="pb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${offering.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <offering.icon className="w-7 h-7 text-white" />
                  </div>
                  <CardTitle className="text-xl flex items-center gap-2">
                    {offering.title}
                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </CardTitle>
                  <CardDescription className="text-base">
                    {offering.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {offering.features.map((feature) => (
                      <div 
                        key={feature}
                        className="flex items-center gap-1.5 text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 text-center"
      >
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Need a Custom Solution?
        </h2>
        <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
          Our team specializes in creating tailored integrations for your unique business requirements. 
          Contact us to discuss your specific needs.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <span className="px-4 py-2 bg-white rounded-lg shadow-sm text-sm font-medium">
            Custom ERP Integration
          </span>
          <span className="px-4 py-2 bg-white rounded-lg shadow-sm text-sm font-medium">
            API Development
          </span>
          <span className="px-4 py-2 bg-white rounded-lg shadow-sm text-sm font-medium">
            Legacy System Migration
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default PQOffering;
