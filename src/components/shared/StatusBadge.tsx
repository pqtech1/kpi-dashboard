import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: "success" | "warning" | "danger" | "info" | "neutral";
  children: React.ReactNode;
}

const statusStyles = {
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning border-warning/20",
  danger: "bg-destructive/10 text-destructive border-destructive/20",
  info: "bg-primary/10 text-primary border-primary/20",
  neutral: "bg-muted text-muted-foreground border-border",
};

export function StatusBadge({ status, children }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border",
        statusStyles[status]
      )}
    >
      {children}
    </span>
  );
}
