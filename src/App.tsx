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
    // Initial call
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
    <div className="relative min-h-screen selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Custom Mouse Cursor */}
      <CustomCursor />

      {/* Background Media & WebGL */}
      <VideoBackground />
      <Scene3D />

      {/* Glowing Ambient Backdrop Orbs */}
      <div className="fixed top-[15%] left-[5%] w-80 h-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none animate-orb-1 -z-10" />
      <div className="fixed top-[45%] right-[10%] w-[400px] h-[400px] rounded-full bg-purple-500/4 blur-3xl pointer-events-none animate-orb-2 -z-10" />
      <div className="fixed bottom-[15%] left-[20%] w-96 h-96 rounded-full bg-pink-500/5 blur-3xl pointer-events-none animate-orb-3 -z-10" />

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

      {/* FAB Floating Control Buttons */}
      <AnimatePresence>
        {/* Scroll Down to About */}
        {showScrollDown && (
          <motion.button
            key="scroll-down"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={scrollToAbout}
            className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-white flex items-center justify-center border border-white/20 shadow-lg shadow-amber-500/10 hover:shadow-amber-500/30 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
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
            className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white flex items-center justify-center border border-white/20 shadow-lg shadow-indigo-500/10 hover:shadow-indigo-500/30 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
            aria-label="Back to Top"
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
