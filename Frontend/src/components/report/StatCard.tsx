interface StatCardProps {
  value: string;
  label: string;
  variant?: "primary" | "success" | "warning";
}

const StatCard = ({ value, label, variant = "primary" }: StatCardProps) => {
  const colorClasses = {
    primary: "text-primary",
    success: "text-success",
    warning: "text-red-500",
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 text-center flex-1">
      <p className={`text-4xl font-bold ${colorClasses[variant]}`}>{value}</p>
      <p className="text-muted-foreground mt-1">{label}</p>
    </div>
  );
};

export default StatCard;
