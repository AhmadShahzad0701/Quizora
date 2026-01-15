import { LucideIcon } from "lucide-react";

interface StatCardProps {
  value: string | number;
  label: string;
  icon?: LucideIcon;
  variant?: "default" | "primary" | "success" | "warning" | "destructive";
}

const StatCard = ({ value, label, icon: Icon, variant = "default" }: StatCardProps) => {
  // Map variant to actual HSL colors
  const containerStyle: Record<string, string> = {
    primary: "background-color: hsl(215, 100%, 95%); color: hsl(215, 100%, 50%)",
    success: "background-color: hsl(145, 63%, 90%); color: hsl(145, 63%, 49%)",
    warning: "background-color: hsl(45, 100%, 95%); color: hsl(45, 100%, 51%)",
    destructive: "background-color: hsl(0, 78%, 95%); color: hsl(0, 78%, 63%)",
    default: "background-color: hsl(0, 0%, 97%); color: hsl(220, 15%, 15%)",
  };

  const iconStyle: Record<string, string> = {
    primary: "background-color: hsl(215, 100%, 90%); color: hsl(215, 100%, 50%)",
    success: "background-color: hsl(145, 63%, 80%); color: hsl(145, 63%, 49%)",
    warning: "background-color: hsl(45, 100%, 85%); color: hsl(45, 100%, 51%)",
    destructive: "background-color: hsl(0, 78%, 85%); color: hsl(0, 78%, 63%)",
    default: "background-color: hsl(0, 0%, 90%); color: hsl(220, 15%, 15%)",
  };

  const valueStyle: Record<string, string> = {
    primary: "color: hsl(215, 100%, 50%)",
    success: "color: hsl(145, 63%, 49%)",
    warning: "color: hsl(45, 100%, 51%)",
    destructive: "color: hsl(0, 78%, 63%)",
    default: "color: hsl(220, 15%, 15%)",
  };

  return (
    <div
      className="flex-1 rounded-xl border border-[hsl(215, 15%, 85%)] p-5 shadow-sm transition hover:shadow-md"
      style={{ ...Object.fromEntries([[variant, containerStyle[variant]]]) }}
    >
      <div className="flex items-start justify-between">
        {/* Text */}
        <div className="space-y-1">
          <p style={{ color: "hsl(215, 10%, 60%)" }} className="text-xs font-medium uppercase tracking-wide">
            {label}
          </p>
          <p className="text-3xl font-bold" style={{ ...Object.fromEntries([[variant, valueStyle[variant]]]) }}>
            {value}
          </p>
        </div>

        {/* Icon */}
        {Icon && (
          <div className="rounded-lg p-2.5" style={{ ...Object.fromEntries([[variant, iconStyle[variant]]]) }}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
