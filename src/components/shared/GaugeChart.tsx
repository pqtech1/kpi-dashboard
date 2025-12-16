import { cn } from "@/lib/utils";

interface GaugeChartProps {
  value: number;
  label: string;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning" | "danger";
}

const sizeStyles = {
  sm: { size: 80, stroke: 8 },
  md: { size: 120, stroke: 10 },
  lg: { size: 160, stroke: 12 },
};

const variantColors = {
  default: "text-primary",
  success: "text-success",
  warning: "text-warning",
  danger: "text-destructive",
};

export function GaugeChart({
  value,
  label,
  size = "md",
  variant = "default",
}: GaugeChartProps) {
  const { size: svgSize, stroke } = sizeStyles[size];
  const radius = (svgSize - stroke) / 2;
  const circumference = radius * Math.PI;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <svg
          width={svgSize}
          height={svgSize / 2 + stroke}
          viewBox={`0 0 ${svgSize} ${svgSize / 2 + stroke}`}
        >
          {/* Background arc */}
          <path
            d={`M ${stroke / 2} ${svgSize / 2} A ${radius} ${radius} 0 0 1 ${svgSize - stroke / 2} ${svgSize / 2}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            className="text-muted"
          />
          {/* Value arc */}
          <path
            d={`M ${stroke / 2} ${svgSize / 2} A ${radius} ${radius} 0 0 1 ${svgSize - stroke / 2} ${svgSize / 2}`}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={cn(variantColors[variant], "transition-all duration-500")}
          />
        </svg>
        <div className="absolute inset-0 flex items-end justify-center pb-1">
          <span className={cn("font-bold", size === "lg" ? "text-3xl" : size === "md" ? "text-2xl" : "text-xl")}>
            {value}%
          </span>
        </div>
      </div>
      <span className="mt-2 text-sm text-muted-foreground">{label}</span>
    </div>
  );
}
