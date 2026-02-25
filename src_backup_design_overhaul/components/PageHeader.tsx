import GlassCard from "./GlassCard";

interface PageHeaderProps {
  subtitle: string;
  title: string;
  description: string;
}

export default function PageHeader({
  subtitle,
  title,
  description,
}: PageHeaderProps) {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background with subtle gradient orbs */}
      <div className="absolute inset-0 bg-surface">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <GlassCard level={3} className="inline-block px-10 py-10 md:px-16 md:py-12">
          <p className="text-primary font-semibold text-sm uppercase tracking-[0.15em] mb-3">
            {subtitle}
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            {title}
          </h1>
          <div className="gold-divider w-16 mx-auto mb-6" />
          <p className="text-muted max-w-2xl mx-auto text-lg leading-relaxed">
            {description}
          </p>
        </GlassCard>
      </div>
    </section>
  );
}
