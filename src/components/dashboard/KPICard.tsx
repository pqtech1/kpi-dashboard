import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: number;
  trendLabel?: string;
  icon: LucideIcon;
  variant?: "default" | "success" | "warning" | "destructive";
  delay?: number;
}

const variantStyles = {
  default: "text-primary",
  success: "text-success",
  warning: "text-warning",
  destructive: "text-destructive",
};

const variantGlow = {
  default: "shadow-[0_0_40px_hsl(var(--primary)/0.15)]",
  success: "shadow-[0_0_40px_hsl(var(--success)/0.15)]",
  warning: "shadow-[0_0_40px_hsl(var(--warning)/0.15)]",
  destructive: "shadow-[0_0_40px_hsl(var(--destructive)/0.15)]",
};

export function KPICard({
  title,
  value,
  unit,
  trend,
  trendLabel,
  icon: Icon,
  variant = "default",
  delay = 0,
}: KPICardProps) {
  const isPositiveTrend = trend && trend > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "glass-card rounded-xl p-6 relative overflow-hidden group hover:border-primary/30 transition-all duration-300",
        variantGlow[variant]
      )}
    >
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={cn("p-2.5 rounded-lg bg-secondary/50", variantStyles[variant])}>
            <Icon className="h-5 w-5" />
          </div>
          {trend !== undefined && (
            <div
              className={cn(
                "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
                isPositiveTrend
                  ? "text-success bg-success/10"
                  : "text-destructive bg-destructive/10"
              )}
            >
              {isPositiveTrend ? (
                <TrendingUp className="h-3.5 w-3.5" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5" />
              )}
              <span>{Math.abs(trend)}%</span>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <div className="flex items-baseline gap-1.5">
            <span className={cn("text-3xl font-bold tracking-tight", variantStyles[variant])}>
              {value}
            </span>
            {unit && <span className="text-muted-foreground text-sm">{unit}</span>}
          </div>
          {trendLabel && (
            <p className="text-xs text-muted-foreground mt-1">{trendLabel}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
