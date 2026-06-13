import { useRef, useState } from "react";

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string; // e.g. "rgba(99, 102, 241, 0.15)"
  borderColor?: string; // e.g. "rgba(99, 102, 241, 0.3)"
}

export default function PremiumCard({
  children,
  className = "",
  glowColor = "rgba(99, 102, 241, 0.12)",
  borderColor = "rgba(99, 102, 241, 0.25)",
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
      className={`relative rounded-2xl overflow-hidden bg-gray-900/30 border border-white/5 backdrop-blur-xl shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] hover:bg-gray-900/45 ${className}`}
      style={{
        backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      {/* Spotlight Glow Background */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
          style={{
            background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, ${glowColor}, transparent 75%)`,
          }}
        />
      )}

      {/* Spotlight Border Glow */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
          style={{
            border: `1px solid ${borderColor}`,
            WebkitMaskImage: `radial-gradient(130px circle at ${coords.x}px ${coords.y}px, black, transparent)`,
            maskImage: `radial-gradient(130px circle at ${coords.x}px ${coords.y}px, black, transparent)`,
          }}
        />
      )}

      {/* Card Content container */}
      <div className="relative z-20 h-full w-full">{children}</div>
    </div>
  );
}
