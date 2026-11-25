import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import VideoBackground from "./components/VideoBackground";
import Scene3D from "./components/Scene3D";
import CustomCursor from "./components/CustomCursor";

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showScrollDown, setShowScrollDown] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250; // offset

      // Active Section Calculation
      const sections = ["home", "about", "education", "skills", "projects", "contact"];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }

      // Back to top button visibility
      setShowScrollTop(window.scrollY > 300);

      // Scroll down indicator visibility (only in hero top area)
      const homeEl = document.getElementById("home");
      if (homeEl) {
        setShowScrollDown(window.scrollY < homeEl.offsetHeight * 0.5);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Liquid Mouse Cursor */}
      <CustomCursor />

      {/* Background Media & 3D WebGL Glass Scene */}
      <VideoBackground />
      <Scene3D />

      {/* Ambient Liquid Caustic Glow Blobs */}
      <div className="fixed top-[10%] left-[5%] w-[420px] h-[420px] rounded-full bg-cyan-500/[0.07] blur-[120px] pointer-events-none animate-orb-1 -z-10" />
      <div className="fixed top-[40%] right-[8%] w-[480px] h-[480px] rounded-full bg-indigo-500/[0.06] blur-[140px] pointer-events-none animate-orb-2 -z-10" />
      <div className="fixed bottom-[10%] left-[15%] w-[450px] h-[450px] rounded-full bg-pink-500/[0.05] blur-[130px] pointer-events-none animate-orb-3 -z-10" />
      <div className="fixed top-[70%] right-[25%] w-[380px] h-[380px] rounded-full bg-emerald-500/[0.04] blur-[110px] pointer-events-none animate-orb-1 -z-10" />

      {/* Navigation Header */}
      <Header activeSection={activeSection} />

      {/* Main Sections Shell */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Liquid Floating Action Buttons */}
      <AnimatePresence>
        {/* Scroll Down to About */}
        {showScrollDown && (
          <motion.button
            key="scroll-down"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={scrollToAbout}
            className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full liquid-btn-emerald text-white flex items-center justify-center cursor-pointer shadow-2xl"
            aria-label="Scroll Down to About Section"
          >
            <ChevronDown size={20} className="animate-bounce" />
          </motion.button>
        )}

        {/* Back to Top */}
        {showScrollTop && (
          <motion.button
            key="scroll-top"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full liquid-btn-primary text-white flex items-center justify-center cursor-pointer shadow-2xl"
            aria-label="Back to Top"
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
