import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface OEEGaugeProps {
  availability: number;
  performance: number;
  quality: number;
  delay?: number;
}

export function OEEGauge({ availability, performance, quality, delay = 0 }: OEEGaugeProps) {
  const oee = Math.round((availability * performance * quality) / 10000);
  
  const getOEEStatus = (value: number) => {
    if (value >= 85) return { label: "World Class", color: "text-success" };
    if (value >= 65) return { label: "Good", color: "text-primary" };
    if (value >= 50) return { label: "Average", color: "text-warning" };
    return { label: "Needs Improvement", color: "text-destructive" };
  };

  const status = getOEEStatus(oee);
  const circumference = 2 * Math.PI * 80;
  const strokeDashoffset = circumference - (oee / 100) * circumference;

  const factors = [
    { label: "Availability", value: availability, color: "bg-primary" },
    { label: "Performance", value: performance, color: "bg-accent" },
    { label: "Quality", value: quality, color: "bg-warning" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">OEE Score</h3>
          <p className="text-sm text-muted-foreground">Overall Equipment Effectiveness</p>
        </div>
        <span className={cn("text-sm font-medium px-3 py-1 rounded-full bg-secondary", status.color)}>
          {status.label}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-8">
        {/* Circular Gauge */}
        <div className="relative">
          <svg className="w-48 h-48 -rotate-90" viewBox="0 0 180 180">
            {/* Background circle */}
            <circle
              cx="90"
              cy="90"
              r="80"
              fill="none"
              stroke="hsl(var(--secondary))"
              strokeWidth="12"
            />
            {/* Progress circle */}
            <motion.circle
              cx="90"
              cy="90"
              r="80"
              fill="none"
              stroke="url(#oeeGradient)"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, delay: delay + 0.3, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="oeeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--accent))" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: delay + 0.8 }}
              className="text-4xl font-bold text-gradient"
            >
              {oee}%
            </motion.span>
            <span className="text-sm text-muted-foreground">OEE</span>
          </div>
        </div>

        {/* Breakdown */}
        <div className="flex-1 space-y-4 w-full">
          {factors.map((factor, index) => (
            <div key={factor.label} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{factor.label}</span>
                <span className="font-semibold text-foreground">{factor.value}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${factor.value}%` }}
                  transition={{ duration: 1, delay: delay + 0.5 + index * 0.1, ease: "easeOut" }}
                  className={cn("h-full rounded-full", factor.color)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
