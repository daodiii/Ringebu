import { Star, User } from "lucide-react";
import GlassCard from "./GlassCard";

interface TestimonialCardProps {
  quote: string;
  author: string;
  rating?: number;
  className?: string;
}

export default function TestimonialCard({
  quote,
  author,
  rating = 5,
  className = "",
}: TestimonialCardProps) {
  return (
    <GlassCard level={2} hover className={`p-6 ${className}`}>
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star
            key={i}
            className="w-4 h-4 fill-accent text-accent"
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-foreground/80 leading-relaxed mb-6 italic">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary-light flex items-center justify-center">
          <User className="w-5 h-5 text-primary-dark" />
        </div>
        <span className="font-medium text-foreground text-sm">{author}</span>
      </div>
    </GlassCard>
  );
}
