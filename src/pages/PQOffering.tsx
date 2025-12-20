import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Keyboard,
  Building2,
  Globe,
  BarChart3,
  ArrowRight,
  CheckCircle,
  ExternalLink,
  Phone,
  Mail,
  Network,
  Cpu,
  LineChart,
  Boxes,
  Zap,
  Factory,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const offerings = [
  {
    id: "autohotkey",
    title: "AutoHotkey Solutions",
    icon: Keyboard,
    description:
      "Powerful automation scripts for repetitive tasks and workflow optimization",
    color: "from-orange-500 to-red-500",
    features: ["Task Automation", "Keyboard Shortcuts", "Process Optimization"],
  },
  {
    id: "erp-integration",
    title: "ERP Integration",
    icon: Building2,
    description:
      "Seamless integration with Emperor, GATI, SAP and other ERP systems",
    color: "from-blue-500 to-indigo-500",
    features: ["Real-time Sync", "Inventory Flow", "Order Automation"],
  },
  {
    id: "icegate",
    title: "IMEXIO & ICEGATE Automation",
    icon: Globe,
    description: "Automated export filing and customs compliance with ICEGATE",
    color: "from-green-500 to-emerald-500",
    features: ["Export Filing", "Compliance", "Duty Calculation"],
  },
  {
    id: "kpi-dashboard",
    title: "KPI Dashboard Solutions",
    icon: BarChart3,
    description: "Real-time production KPIs and decision-ready analytics",
    color: "from-purple-500 to-pink-500",
    features: ["Live Metrics", "Alerts", "Production Planning"],
  },
];

const PQOffering = () => {
  return (
    <div className="space-y-16">
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-5xl mx-auto"
      >
        <div className="flex items-center justify-center gap-4 mb-3">
          <img
            src={`${import.meta.env.BASE_URL}cropped-pq-logo.png`}
            alt="Positive Quadrant"
            className="h-12 w-12 object-contain"
          />
          <div className="text-left">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
              Positive Quadrant Technologies LLP
            </h1>
          </div>
        </div>

        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Enterprise-grade ERP integrations and AI-powered digital solutions
          purpose-built for the jewelry manufacturing & retail ecosystem.
        </p>
      </motion.div>

      {/* ================= OFFERINGS GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offerings.map((offering, index) => (
          <motion.div
            key={offering.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
          >
            <Link to={`/pq-offering/${offering.id}`}>
              <Card className="h-full group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${offering.color} flex items-center justify-center mb-4`}
                  >
                    <offering.icon className="w-7 h-7 text-white" />
                  </div>

                  <CardTitle className="text-xl flex items-center gap-2">
                    {offering.title}
                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition" />
                  </CardTitle>

                  <CardDescription className="text-base">
                    {offering.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {offering.features.map((feature) => (
                      <span
                        key={feature}
                        className="flex items-center gap-1.5 text-sm bg-muted/50 px-3 py-1 rounded-full"
                      >
                        <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* ================= SUMMARY ================= */}
      <div className="rounded-2xl border bg-muted/30 p-8 space-y-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">
            Enterprise Capabilities
          </h2>

          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
            <li className="flex items-start gap-3">
              <Network className="w-5 h-5 text-primary mt-0.5" />
              Mobile, Web, E-Commerce, IoT & Cloud Applications
            </li>
            <li className="flex items-start gap-3">
              <Cpu className="w-5 h-5 text-primary mt-0.5" />
              Emperor, GATI, SAP and other ERP's integration
            </li>
            <li className="flex items-start gap-3">
              <LineChart className="w-5 h-5 text-primary mt-0.5" />
              Real-time KPI dashboards & production planning
            </li>
            <li className="flex items-start gap-3">
              <Boxes className="w-5 h-5 text-primary mt-0.5" />
              CPX, STL & 3D design file tracking
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-primary mt-0.5" />
              AutoHotkey automation for daily operations
            </li>
            <li className="flex items-start gap-3">
              <Factory className="w-5 h-5 text-primary mt-0.5" />
              IMEXIO & ICEGATE export filing automation
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              Custom ERP Integration
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              API Development
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5" />
              Legacy System Migration
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="space-y-2">
            <h3 className="font-semibold">Contact Us</h3>

            {/* Phone */}
            <a
              href="tel:+917219623991"
              className="flex items-center gap-2 text-sm text-foreground/90 hover:text-primary transition-colors duration-200"
            >
              <Phone className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
              7219623991
            </a>

            {/* Email */}
            <a
              href="mailto:info@positivequadrant.in"
              className="flex items-center gap-2 text-sm text-foreground/90 hover:text-primary transition-colors duration-200"
            >
              <Mail className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
              info@positivequadrant.in
            </a>

            {/* Website */}
            <a
              href="https://www.positivequadrant.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80 transition-colors duration-200"
            >
              www.positivequadrant.in{" "}
              <ExternalLink
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </a>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold">Explore</h3>

            <a
              href="https://www.positivequadrant.in/ai-solutions-for-jewelery-industry"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-primary hover:text-primary/80 transition-colors duration-200"
            >
              AI Solutions for Jewellery Industry
            </a>

            <a
              href="https://www.positivequadrant.in/projects-and-portfolios"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-primary hover:text-primary/80 transition-colors duration-200"
            >
              Projects & Portfolio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PQOffering;
