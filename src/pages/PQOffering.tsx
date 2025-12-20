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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12 lg:space-y-16">
        {/* ================= HEADER ================= */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-6xl mx-auto px-2 sm:px-4"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            {/* Logo */}
            <div className="flex items-center justify-center sm:justify-start">
              <img
                src={`${import.meta.env.BASE_URL}cropped-pq-logo.png`}
                alt="Positive Quadrant"
                className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 object-contain"
              />
            </div>

            {/* Company Name - Responsive text */}
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-foreground leading-tight tracking-tight">
                <span className="block sm:inline">Positive Quadrant</span>{" "}
                <span className="block sm:inline">Technologies LLP</span>
              </h1>

              {/* Optional tagline on larger screens */}
              <p className="hidden lg:block text-sm lg:text-base text-muted-foreground mt-1">
                Enterprise Digital Solutions & ERP Integrations
              </p>
            </div>
          </div>

          {/* Description - Responsive */}
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Enterprise-grade ERP integrations and AI-powered digital solutions
            purpose-built for the jewelry manufacturing & retail ecosystem.
          </p>
        </motion.div>

        {/* ================= OFFERINGS GRID ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 sm:gap-6">
          {offerings.map((offering, index) => (
            <motion.div
              key={offering.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >
              <Link to={`/pq-offering/${offering.id}`} className="block h-full">
                <Card className="h-full group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/30">
                  <CardHeader className="pb-3 sm:pb-4">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div
                        className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br ${offering.color} flex items-center justify-center flex-shrink-0`}
                      >
                        <offering.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>

                      {/* Title & Description */}
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg sm:text-xl flex items-center justify-between gap-2">
                          <span className="truncate">{offering.title}</span>
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 opacity-0 group-hover:opacity-100 transition flex-shrink-0" />
                        </CardTitle>

                        <CardDescription className="text-sm sm:text-base mt-1 line-clamp-2">
                          {offering.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {offering.features.map((feature) => (
                        <span
                          key={feature}
                          className="inline-flex items-center gap-1 text-xs sm:text-sm bg-muted/50 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full"
                        >
                          <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-500 flex-shrink-0" />
                          <span className="truncate">{feature}</span>
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
        <div className="rounded-xl sm:rounded-2xl border bg-muted/30 p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 lg:space-y-10">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-center mb-4 sm:mb-6">
              Enterprise Capabilities
            </h2>

            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm sm:text-base">
              <li className="flex items-start gap-2 sm:gap-3">
                <Network className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Mobile, Web, E-Commerce, IoT & Cloud Applications</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Emperor, GATI, SAP and other ERP's integration</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <LineChart className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Real-time KPI dashboards & production planning</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Boxes className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>CPX, STL & 3D design file tracking</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>AutoHotkey automation for daily operations</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <Factory className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>IMEXIO & ICEGATE export filing automation</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Custom ERP Integration</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>API Development</span>
              </li>
              <li className="flex items-start gap-2 sm:gap-3">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Legacy System Migration</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="border-t pt-4 sm:pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="font-semibold text-sm sm:text-base">Contact Us</h3>

              {/* Phone */}
              <a
                href="tel:+917219623991"
                className="group flex items-center gap-2 text-xs sm:text-sm text-foreground/90 hover:text-primary transition-colors"
              >
                <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
                7219623991
              </a>

              {/* Email */}
              <a
                href="mailto:info@positivequadrant.in"
                className="group flex items-center gap-2 text-xs sm:text-sm text-foreground/90 hover:text-primary transition-colors"
              >
                <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
                info@positivequadrant.in
              </a>

              {/* Website */}
              <a
                href="https://www.positivequadrant.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-1 text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors"
              >
                www.positivequadrant.in
                <ExternalLink size={12} className="sm:w-3 sm:h-3" />
              </a>
            </div>

            {/* Explore Links */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="font-semibold text-sm sm:text-base">Explore</h3>

              <a
                href="https://www.positivequadrant.in/ai-solutions-for-jewelery-industry"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors"
              >
                AI Solutions for Jewellery Industry
              </a>

              <a
                href="https://www.positivequadrant.in/projects-and-portfolios"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs sm:text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Projects & Portfolio
              </a>
            </div>

            {/* Optional: QR Code or Additional Info */}
            <div className="hidden lg:block space-y-2 sm:space-y-3">
              <h3 className="font-semibold text-sm sm:text-base">
                Quick Links
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Custom solutions for jewelry manufacturing, retail, and export
                businesses.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PQOffering;
