import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles } from "lucide-react";

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Education", href: "#education" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[94%] max-w-5xl z-50 transition-all duration-400 ${
        scrolled
          ? "liquid-glass-nav py-2.5 px-6 shadow-2xl shadow-black/40"
          : "liquid-glass-nav py-3.5 px-6 bg-white/[0.04] border-white/10"
      }`}
    >
      <div className="flex justify-between items-center w-full">
        {/* Liquid Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="text-xl font-bold font-display tracking-tight flex items-center gap-2 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-pink-500 p-[1.5px] shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full rounded-full bg-[#080d1a] flex items-center justify-center">
              <Sparkles size={14} className="text-cyan-300 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <span className="bg-gradient-to-r from-white via-indigo-100 to-indigo-300 bg-clip-text text-transparent font-semibold">
            Priyanshu
          </span>
        </a>

        {/* Desktop Liquid Pill Nav Items */}
        <nav className="hidden md:flex items-center space-x-1 liquid-pill p-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.name.toLowerCase();
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-4 py-1.5 text-xs uppercase tracking-wider font-semibold transition-all duration-300 rounded-full ${
                  isActive
                    ? "text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <span className="relative z-10">{item.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeLiquidNavPill"
                    className="absolute inset-0 rounded-full bg-white/15 border border-white/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_2px_8px_rgba(0,0,0,0.3)] backdrop-blur-md"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Header Right Action Button (Pill) */}
        <div className="hidden md:flex items-center">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="liquid-btn-glass px-4 py-1.5 text-xs font-semibold text-white tracking-wide flex items-center gap-1.5"
          >
            <span>Let's Talk</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </a>
        </div>

        {/* Mobile Menu Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-full liquid-btn-glass text-white"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-16 right-0 left-0 mx-auto w-[98%] liquid-glass-modal rounded-3xl p-5 shadow-2xl flex flex-col gap-2 md:hidden"
          >
            <nav className="flex flex-col gap-1.5">
              {navItems.map((item) => {
                const isActive = activeSection === item.name.toLowerCase();
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`px-4 py-2.5 rounded-2xl text-sm font-medium transition-all ${
                      isActive
                        ? "bg-white/15 text-white border border-white/20 shadow-inner"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
