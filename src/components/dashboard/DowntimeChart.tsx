import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { AlertTriangle, Wrench, Clock } from "lucide-react";

const downtimeData = [
  { name: "System Downtime", value: 45, color: "hsl(var(--destructive))" },
  { name: "Manual Downtime", value: 30, color: "hsl(var(--warning))" },
  { name: "Planned Maintenance", value: 25, color: "hsl(var(--primary))" },
];

const downtimeDetails = [
  { label: "Equipment Failure", time: "2h 15m", icon: AlertTriangle, type: "system" },
  { label: "Changeover", time: "1h 30m", icon: Wrench, type: "manual" },
  { label: "Material Shortage", time: "45m", icon: Clock, type: "manual" },
  { label: "Quality Check", time: "30m", icon: Clock, type: "planned" },
];

interface DowntimeChartProps {
  delay?: number;
}

export function DowntimeChart({ delay = 0 }: DowntimeChartProps) {
  const totalDowntime = 5.0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Downtime Analysis</h3>
          <p className="text-sm text-muted-foreground">System vs Manual breakdown</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-foreground">{totalDowntime}h</p>
          <p className="text-xs text-muted-foreground">Total Today</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Pie Chart */}
        <div className="relative w-40 h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={downtimeData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={4}
                dataKey="value"
              >
                {downtimeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <Clock className="h-6 w-6 text-muted-foreground" />
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3">
          {downtimeData.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: delay + 0.3 + index * 0.1 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-muted-foreground">{item.name}</span>
              </div>
              <span className="text-sm font-semibold text-foreground">{item.value}%</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Downtime Details */}
      <div className="mt-6 pt-6 border-t border-border">
        <p className="text-sm text-muted-foreground mb-3">Recent Events</p>
        <div className="space-y-2">
          {downtimeDetails.map((detail, index) => (
            <motion.div
              key={detail.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: delay + 0.5 + index * 0.1 }}
              className="flex items-center justify-between py-2 px-3 rounded-lg bg-secondary/50"
            >
              <div className="flex items-center gap-3">
                <detail.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{detail.label}</span>
              </div>
              <span className="text-sm font-medium text-muted-foreground">{detail.time}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
