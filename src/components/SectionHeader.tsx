interface SectionHeaderProps {
  subtitle: string;
  title?: string;
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
      <p className="text-primary font-bold text-lg sm:text-xl uppercase tracking-widest mb-3">
        {subtitle}
      </p>
      {title && (
        <h2 className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground">
          {title}
        </h2>
      )}
      <div className="gold-divider w-16 mx-auto mt-4" />
    </div>
  );
}
