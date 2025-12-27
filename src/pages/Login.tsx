import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Lock,
  User,
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Database,
  ExternalLink,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const VALID_USERNAME = "pq.demo";
const VALID_PASSWORD = "pq@demo";

const features = [
  {
    icon: Zap,
    title: "Real-time KPIs",
    description: "Monitor production metrics with live dashboards",
  },
  {
    icon: Database,
    title: "ERP Integration",
    description: "Seamless connectivity with Emperor, GATI, SAP ERP etc.",
  },
  {
    icon: Shield,
    title: "Quality Control",
    description: "Track quality metrics across all production phases",
  },
  {
    icon: CheckCircle,
    title: "Custom Solutions",
    description: "Tailored integrations for your business needs",
  },
];

const erpLogos = [
  "Emperor ERP",
  "GATI ERP",
  "SAP ERP and other ERP's integrations",
];

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { isAuthenticated, login, isLoading: authLoading } = useAuth();

  // Extract tracking params from URL on mount and auto-login if demo credentials
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    // Extract and store tracking params
    const trackingKeys = [
      "campaign_id",
      "lead_id",
      "email",
      "source",
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_term",
      "utm_content",
      "link_type",
      "click_time",
      "click_tracked",
    ];

    const trackingParams: Record<string, string> = {};
    trackingKeys.forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        trackingParams[key] = decodeURIComponent(value);
      }
    });

    if (Object.keys(trackingParams).length > 0) {
      localStorage.setItem(
        "pq_tracking_params",
        JSON.stringify(trackingParams)
      );
      console.log("Tracking params preserved on login page:", trackingParams);
    }

    // Check for demo credentials in URL
    const urlUsername = searchParams.get("username");
    const urlPassword = searchParams.get("password");

    if (urlUsername === VALID_USERNAME && urlPassword === VALID_PASSWORD) {
      // Auto-login with demo credentials
      setUsername(VALID_USERNAME);
      setPassword(VALID_PASSWORD);

      // Auto-submit form after a short delay
      setTimeout(() => {
        handleAutoLogin();
      }, 1000);
    }
  }, [location.search]);

  // Handle auto-login
  const handleAutoLogin = () => {
    if (isLoading) return;

    setIsLoading(true);
    login({ username: VALID_USERNAME, name: "PQ Jewel Admin" });

    toast({
      title: "Auto-login successful!",
      description: "Welcome to Jewel INTEGRA Dashboard",
    });

    setIsLoading(false);
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      // Get tracking params from localStorage
      const trackingParams = localStorage.getItem("pq_tracking_params");
      let redirectPath = "/";

      if (trackingParams) {
        try {
          const params = JSON.parse(trackingParams);
          const queryString = new URLSearchParams(params).toString();
          redirectPath = `/?${queryString}`;
          console.log("Redirecting with tracking params:", params);
        } catch (e) {
          console.error("Error parsing tracking params:", e);
        }
      }

      navigate(redirectPath);
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (username === VALID_USERNAME && password === VALID_PASSWORD) {
      login({ username, name: "PQ Jewel Admin" });
      toast({
        title: "Welcome back!",
        description: "Login successful. Redirecting to dashboard...",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password. Please try again.",
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const handleResetPassword = () => {
    if (resetEmail) {
      toast({
        title: "Reset Link Sent",
        description: `Password reset instructions have been sent to ${resetEmail}`,
      });
      setResetDialogOpen(false);
      setResetEmail("");
    }
  };

  const openLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Show loading while auth is initializing
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
          <p className="text-white">Loading authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col lg:flex-row overflow-auto lg:overflow-hidden">
      {/* Left Side - Product Summary */}
      <div className="lg:w-1/2 w-full p-4 sm:p-6 lg:p-8 xl:p-12 flex flex-col justify-center relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 sm:-top-40 -left-20 sm:-left-40 w-60 sm:w-80 md:w-96 h-60 sm:h-80 md:h-96 bg-gradient-to-br from-primary/30 to-accent/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 sm:-bottom-40 -right-20 sm:-right-40 w-60 sm:w-80 md:w-96 h-60 sm:h-80 md:h-96 bg-gradient-to-tr from-accent/20 to-primary/30 rounded-full blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          {/* Clickable Logo */}
          <motion.div
            onClick={() => openLink("https://techupgrad.in/kpi")}
            className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 lg:mb-8 cursor-pointer group w-fit"
          >
            <div className="flex items-center gap-2">
              <img
                src="pq-jewel-pulse.png"
                alt="Jewel INTEGRA Logo"
                className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
              />
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-sidebar-foreground whitespace-nowrap drop-shadow-[0_0_6px_rgba(255,215,0,0.6)]">
                Jewel INTEGRA
              </span>
            </div>
          </motion.div>

          {/* Tagline */}
          <div className="mb-4 sm:mb-6 lg:mb-10">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-2 sm:mb-3 lg:mb-4 leading-tight"
            >
              Precision KPIs.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Seamless ERP Integration.
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="text-slate-300 text-sm sm:text-base lg:text-lg max-w-lg"
            >
              Enterprise-grade production monitoring with custom integrations
              for jewelry manufacturing excellence.
            </motion.p>
          </div>

          {/* Features Grid - Responsive layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 lg:mb-10">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="p-1 sm:p-1.5 lg:p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 shrink-0">
                  <feature.icon className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-xs sm:text-sm truncate">
                    {feature.title}
                  </h3>
                  <p className="text-slate-200 text-xs leading-relaxed line-clamp-2">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ERP Integration Logos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-2"
          >
            <span className="text-slate-200 text-xs sm:text-sm">
              Trusted integrations with:
            </span>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              {erpLogos.map((logo, index) => (
                <motion.div
                  key={logo}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs sm:text-sm font-medium whitespace-nowrap"
                >
                  {logo}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Side - Login Form */}
      <div className="relative lg:w-1/2 w-full p-4 sm:p-6 lg:p-8 xl:p-12 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 lg:rounded-l-3xl xl:rounded-l-[3rem]">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <Card className="border-0 shadow-xl sm:shadow-2xl bg-white/80 sm:bg-white/80 backdrop-blur-sm sm:backdrop-blur-xl">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <div className="text-center mb-4 sm:mb-6 lg:mb-8">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-foreground mb-1 sm:mb-2">
                  Welcome Back
                </h2>
                <p className="text-muted-foreground text-xs sm:text-sm lg:text-base">
                  Sign in to access your dashboard
                </p>
              </div>

              <form
                onSubmit={handleLogin}
                className="space-y-3 sm:space-y-4 lg:space-y-5"
              >
                {/* Username Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="space-y-1 sm:space-y-0 sm:flex sm:items-center sm:space-x-4"
                >
                  <Label
                    htmlFor="username"
                    className="text-xs sm:text-sm font-medium text-foreground sm:w-24 sm:flex-shrink-0 block"
                  >
                    Username
                  </Label>
                  <div className="relative flex-1">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-8 sm:pl-10 lg:pl-11 h-9 sm:h-10 lg:h-12 bg-white border-border/50 focus:border-primary focus:ring-primary/20 transition-all text-sm sm:text-base"
                      required
                    />
                  </div>
                </motion.div>

                {/* Password Field */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-1 sm:space-y-0 sm:flex sm:items-center sm:space-x-4"
                >
                  <Label
                    htmlFor="password"
                    className="text-xs sm:text-sm font-medium text-foreground sm:w-24 sm:flex-shrink-0 block"
                  >
                    Password
                  </Label>
                  <div className="relative flex-1">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-8 sm:pl-10 lg:pl-11 pr-8 sm:pr-10 lg:pr-11 h-9 sm:h-10 lg:h-12 bg-white border-border/50 focus:border-primary focus:ring-primary/20 transition-all text-sm sm:text-base"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                      ) : (
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                      )}
                    </button>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex justify-end pt-1"
                >
                  <Dialog
                    open={resetDialogOpen}
                    onOpenChange={setResetDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="text-xs sm:text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                      >
                        Forgot password?
                      </button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md max-w-[calc(100vw-2rem)] mx-2">
                      <DialogHeader>
                        <DialogTitle>Reset Password</DialogTitle>
                        <DialogDescription>
                          Enter your email address and we'll send you a link to
                          reset your password.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="reset-email">Email Address</Label>
                          <Input
                            id="reset-email"
                            type="email"
                            placeholder="Enter your email"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            className="h-11"
                          />
                        </div>
                        <Button
                          type="button"
                          onClick={handleResetPassword}
                          className="w-full h-11 bg-gradient-to-r from-primary to-accent hover:opacity-90"
                        >
                          Send Reset Link
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-9 sm:h-10 lg:h-12 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold text-sm sm:text-base shadow-lg shadow-primary/30 transition-all duration-300 group"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </motion.div>

                {/* Demo Credentials Notice */}
                {(location.search.includes("username=pq.demo") ||
                  location.search.includes("campaign_id")) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="text-center"
                  >
                    <p className="text-xs text-muted-foreground">
                      Using demo credentials? Click Sign In or wait for
                      auto-login
                    </p>
                  </motion.div>
                )}
              </form>

              {/* Developer Info Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-4 sm:mt-6 lg:mt-8 pt-3 sm:pt-4 lg:pt-6 border-t border-border/50"
              >
                <div className="space-y-2 sm:space-y-3">
                  {/* Developer by line */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2">
                    <span className="text-xs text-muted-foreground">
                      Developed by
                    </span>
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      onClick={() => openLink("https://positivequadrant.in")}
                      className="cursor-pointer"
                    >
                      <span className="text-xs sm:text-sm uppercase font-semibold text-primary hover:text-primary/80 transition-colors text-center">
                        Positive Quadrant Technologies LLP
                      </span>
                    </motion.div>
                  </div>

                  {/* Contact info */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 flex-wrap">
                    <a
                      href="tel:7219623991"
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Phone className="w-3 h-3" />
                      <span>7219623991</span>
                    </a>
                    <a
                      href="mailto:info@positivequadrant.in"
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      <Mail className="w-3 h-3" />
                      <span>info@positivequadrant.in</span>
                    </a>
                  </div>

                  {/* Please Visit + Links */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 flex-wrap">
                    <span className="text-xs text-muted-foreground">
                      Please Visit:
                    </span>
                    <div className="flex flex-wrap justify-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          openLink(
                            "https://www.positivequadrant.in/ai-solutions-for-jewelery-industry"
                          )
                        }
                        className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-xs font-medium transition-colors"
                      >
                        <span className="hidden sm:inline">
                          Jewelry AI Solutions
                        </span>
                        <span className="sm:hidden">AI Solutions</span>
                        <ExternalLink className="w-3 h-3" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          openLink(
                            "https://www.positivequadrant.in/projects-and-portfolios"
                          )
                        }
                        className="inline-flex items-center gap-1 px-2 sm:px-3 py-1 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent text-xs font-medium transition-colors"
                      >
                        Portfolio
                        <ExternalLink className="w-3 h-3" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
