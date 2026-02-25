interface GlassCardProps {
  level?: 1 | 2 | 3;
  hover?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function GlassCard({
  level = 2,
  hover = false,
  className = "",
  children,
}: GlassCardProps) {
  return (
    <div
      className={`glass-${level} rounded-2xl ${
        hover ? "card-hover" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
