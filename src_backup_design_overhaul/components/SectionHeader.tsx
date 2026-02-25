interface SectionHeaderProps {
  subtitle: string;
  title: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({
  subtitle,
  title,
  centered = true,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`${centered ? "text-center" : ""} ${className}`}>
      <p className="text-primary font-semibold text-sm uppercase tracking-[0.15em] mb-3">
        {subtitle}
      </p>
      <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground">
        {title}
      </h2>
      <div className="gold-divider w-16 mx-auto mt-5" />
    </div>
  );
}
