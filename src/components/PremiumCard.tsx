import { useRef, useState } from "react";

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g. "rgba(99, 102, 241, 0.15)"
  borderColor?: string; // e.g. "rgba(255, 255, 255, 0.3)"
}

export default function PremiumCard({
  children,
  className = "",
  glowColor = "rgba(99, 102, 241, 0.15)",
  borderColor = "rgba(255, 255, 255, 0.35)",
}: PremiumCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative rounded-[26px] overflow-hidden liquid-glass-card transition-all duration-500 ${className}`}
    >
      {/* Liquid Caustic Spotlight Glow */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
          style={{
            background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 70%)`,
          }}
        />
      )}

      {/* Dynamic Refractive Edge Gleam */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-10 rounded-[26px]"
          style={{
            border: `1px solid ${borderColor}`,
            WebkitMaskImage: `radial-gradient(160px circle at ${coords.x}px ${coords.y}px, black, transparent)`,
            maskImage: `radial-gradient(160px circle at ${coords.x}px ${coords.y}px, black, transparent)`,
          }}
        />
      )}

      {/* Subtle Specular Top Arc Highlight */}
      <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none z-10" />

      {/* Card Content container */}
      <div className="relative z-20 h-full w-full">{children}</div>
    </div>
  );
}
