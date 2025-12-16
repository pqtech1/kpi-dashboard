import { motion } from "framer-motion";
import { Clock, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface WIPItem {
  id: string;
  name: string;
  stage: string;
  progress: number;
  tat: string;
  target: string;
  status: "on-track" | "at-risk" | "delayed";
}

const wipItems: WIPItem[] = [
  { id: "WO-2401", name: "Assembly Line A", stage: "Quality Check", progress: 85, tat: "2h 15m", target: "3h", status: "on-track" },
  { id: "WO-2402", name: "Packaging Unit B", stage: "Processing", progress: 60, tat: "1h 45m", target: "2h", status: "at-risk" },
  { id: "WO-2403", name: "CNC Machine C", stage: "Setup", progress: 25, tat: "4h 30m", target: "4h", status: "delayed" },
  { id: "WO-2404", name: "Welding Station D", stage: "In Progress", progress: 45, tat: "1h 10m", target: "2h 30m", status: "on-track" },
];

const statusConfig = {
  "on-track": { color: "text-success", bg: "bg-success/10", icon: CheckCircle2 },
  "at-risk": { color: "text-warning", bg: "bg-warning/10", icon: AlertCircle },
  "delayed": { color: "text-destructive", bg: "bg-destructive/10", icon: AlertCircle },
};

interface WIPTrackerProps {
  delay?: number;
}

export function WIPTracker({ delay = 0 }: WIPTrackerProps) {
  const avgTAT = "2h 25m";
  const onTimeRate = 78;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">WIP Turnaround Time</h3>
          <p className="text-sm text-muted-foreground">Work-in-progress tracking</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-xl font-bold text-primary">{avgTAT}</p>
            <p className="text-xs text-muted-foreground">Avg TAT</p>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold text-success">{onTimeRate}%</p>
            <p className="text-xs text-muted-foreground">On-Time</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {wipItems.map((item, index) => {
          const StatusIcon = statusConfig[item.status].icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: delay + 0.2 + index * 0.1 }}
              className="p-4 rounded-lg bg-secondary/30 border border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-primary">{item.id}</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground hidden sm:block" />
                  <span className="text-sm font-medium text-foreground">{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={cn("flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium", statusConfig[item.status].bg, statusConfig[item.status].color)}>
                    <StatusIcon className="h-3 w-3" />
                    <span className="capitalize">{item.status.replace("-", " ")}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">{item.stage}</span>
                    <span className="text-foreground font-medium">{item.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.progress}%` }}
                      transition={{ duration: 0.8, delay: delay + 0.4 + index * 0.1, ease: "easeOut" }}
                      className={cn(
                        "h-full rounded-full",
                        item.status === "on-track" && "bg-success",
                        item.status === "at-risk" && "bg-warning",
                        item.status === "delayed" && "bg-destructive"
                      )}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs sm:min-w-[140px]">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-foreground font-medium">{item.tat}</span>
                  </div>
                  <span className="text-muted-foreground">/ {item.target}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
