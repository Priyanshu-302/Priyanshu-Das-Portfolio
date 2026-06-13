import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hidden, setHidden] = useState(true);
  const [hovered, setHovered] = useState(false);

  // Position of the mouse dot
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring options for the outer circle lag follow effect
  const springConfig = { damping: 28, stiffness: 220, mass: 0.6 };
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

      {/* Inner Solid Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-indigo-400 rounded-full z-[100] pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: hovered ? 1.4 : 1,
          backgroundColor: hovered ? "#f472b6" : "#60a5fa",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 20 }}
      />

      {/* Outer Glowing Circle with spring lag */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-indigo-500/40 z-[99] pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: hovered ? 46 : 26,
          height: hovered ? 46 : 26,
        }}
        animate={{
          backgroundColor: hovered ? "rgba(99, 102, 241, 0.05)" : "rgba(99, 102, 241, 0)",
          borderColor: hovered ? "rgba(244, 114, 182, 0.6)" : "rgba(96, 165, 250, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 20 }}
      />
    </>
  );
}
