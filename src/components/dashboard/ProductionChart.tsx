import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { day: "Mon", target: 850, actual: 820 },
  { day: "Tue", target: 900, actual: 910 },
  { day: "Wed", target: 880, actual: 860 },
  { day: "Thu", target: 920, actual: 940 },
  { day: "Fri", target: 900, actual: 875 },
  { day: "Sat", target: 600, actual: 620 },
  { day: "Sun", target: 400, actual: 380 },
];

interface ProductionChartProps {
  delay?: number;
}

export function ProductionChart({ delay = 0 }: ProductionChartProps) {
  const totalTarget = data.reduce((sum, d) => sum + d.target, 0);
  const totalActual = data.reduce((sum, d) => sum + d.actual, 0);
  const variance = ((totalActual - totalTarget) / totalTarget * 100).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="glass-card rounded-xl p-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Production vs Target</h3>
          <p className="text-sm text-muted-foreground">Weekly production overview</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{totalActual.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Actual Units</p>
          </div>
          <div className="text-center">
            <p className={`text-2xl font-bold ${Number(variance) >= 0 ? 'text-success' : 'text-destructive'}`}>
              {Number(variance) >= 0 ? '+' : ''}{variance}%
            </p>
            <p className="text-xs text-muted-foreground">Variance</p>
          </div>
        </div>
      </div>

      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "0 4px 24px -4px rgba(0, 0, 0, 0.3)",
              }}
              labelStyle={{ color: "hsl(var(--foreground))" }}
            />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              formatter={(value) => (
                <span style={{ color: "hsl(var(--muted-foreground))" }}>{value}</span>
              )}
            />
            <Bar
              dataKey="target"
              name="Target"
              fill="hsl(var(--muted))"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="actual"
              name="Actual"
              fill="hsl(var(--primary))"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
