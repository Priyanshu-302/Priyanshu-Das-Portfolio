import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hidden, setHidden] = useState(true);
  const [hovered, setHovered] = useState(false);

  // Position of the mouse dot
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring options for the outer circle lag follow effect
  const springConfig = { damping: 26, stiffness: 240, mass: 0.5 };
  const cursorXSpring = useSpring(mouseX, springConfig);
  const cursorYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (hidden) setHidden(false);
    };

    const handleMouseLeave = () => {
      setHidden(true);
    };

    const handleMouseEnter = () => {
      setHidden(false);
    };

    // Track links, buttons, and card hovers to trigger custom scale transitions
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest(".tilt-card") ||
        target.closest(".liquid-glass-card") ||
        target.closest(".liquid-pill") ||
        target.classList.contains("cursor-pointer")
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [hidden, mouseX, mouseY]);

  if (hidden) return null;

  return (
    <>
      {/* CSS injection to hide natural cursor globally on desktops */}
      <style>{`
        @media (min-width: 768px) {
          body, a, button, select, input, textarea, [role="button"], .cursor-pointer {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Inner Fluid Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full z-[100] pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: hovered ? 1.5 : 1,
          backgroundColor: hovered ? "#34d399" : "#38bdf8",
          boxShadow: hovered
            ? "0 0 12px #34d399, 0 0 4px #ffffff"
            : "0 0 10px #38bdf8, 0 0 2px #ffffff",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      />

      {/* Outer Liquid Glass Droplet Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full z-[99] pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden md:block backdrop-blur-[1px]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: hovered ? 52 : 30,
          height: hovered ? 52 : 30,
        }}
        animate={{
          backgroundColor: hovered ? "rgba(52, 211, 153, 0.08)" : "rgba(56, 189, 248, 0.04)",
          borderColor: hovered ? "rgba(52, 211, 153, 0.6)" : "rgba(56, 189, 248, 0.4)",
          borderWidth: 1.5,
          boxShadow: hovered
            ? "inset 0 1px 1px rgba(255, 255, 255, 0.4), 0 0 16px rgba(52, 211, 153, 0.3)"
            : "inset 0 1px 1px rgba(255, 255, 255, 0.3), 0 0 12px rgba(56, 189, 248, 0.2)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 20 }}
      />
    </>
  );
}
