import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Eye, Mail, Sparkles } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "./SocialIcons";
import confetti from "canvas-confetti";

const TYPED_STRINGS = [
  "{ Full-Stack Backend Developer }",
  "{ Real-Time Systems Builder }",
  "{ LLM Integration Specialist }",
];

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Custom typing effect implementation
  useEffect(() => {
    const currentString = TYPED_STRINGS[stringIndex];
    let timer: number;

    const tick = () => {
      if (!isDeleting) {
        setTypedText(currentString.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        if (charIndex >= currentString.length) {
          timer = setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        setTypedText(currentString.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        if (charIndex <= 0) {
          setIsDeleting(false);
          setStringIndex((prev) => (prev + 1) % TYPED_STRINGS.length);
          return;
        }
      }

      const speed = isDeleting ? 30 : 60;
      timer = setTimeout(tick, speed);
    };

    timer = setTimeout(tick, 100);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, stringIndex]);

  const handleHeroImageClick = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#38bdf8", "#818cf8", "#f472b6", "#34d399"],
    });
  };

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 90,
        damping: 14,
      },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col md:flex-row justify-between items-center px-4 pt-32 pb-16 md:py-0 overflow-hidden"
    >
      {/* Hero Left Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-10"
      >
        {/* Liquid Status Pill */}
        <motion.div
          variants={itemVariants}
          className="liquid-pill px-4 py-1.5 flex items-center gap-2 mb-6 cursor-default"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
          <span className="text-xs font-medium text-emerald-300 tracking-wide">
            Available for Opportunities
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-[1.1] mb-4 text-white tracking-tight"
        >
          Engineering <br className="hidden md:inline" />
          <span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-pink-400 bg-clip-text text-transparent">
            Scalable Systems
          </span>
        </motion.h1>

        {/* Dynamic Typing Title in Liquid Glass Badge */}
        <motion.div
          variants={itemVariants}
          className="liquid-pill px-4 py-2 text-base sm:text-lg font-mono text-cyan-300 mb-6 flex items-center shadow-inner"
        >
          <span>{typedText}</span>
          <span className="w-1.5 h-5 bg-cyan-400 ml-1.5 animate-pulse rounded-full" />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-gray-300/90 mb-8 max-w-lg leading-relaxed font-normal"
        >
          Final-year Computer Science student specializing in{" "}
          <span className="text-cyan-300 font-semibold">Full-Stack Backend Systems</span>,{" "}
          <span className="text-indigo-300 font-semibold">Real-Time Streaming Architectures</span>, and{" "}
          <span className="text-pink-300 font-semibold">LLM Integration</span>. Solved 450+ DSA problems on LeetCode with a 9.04 CGPA.
        </motion.p>

        {/* Liquid Action Buttons (Reference style: Pill Buttons) */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto justify-center md:justify-start"
        >
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "#contact")}
            className="liquid-btn-emerald px-7 py-3.5 text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg group"
          >
            <span>Let's Talk</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#projects"
            onClick={(e) => handleScrollTo(e, "#projects")}
            className="liquid-btn-glass px-7 py-3.5 text-gray-200 hover:text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Eye size={16} className="text-cyan-300" />
            <span>View Projects</span>
          </a>
        </motion.div>

        {/* Liquid Social Links */}
        <motion.div variants={itemVariants} className="flex gap-3 mt-8">
          <a
            href={import.meta.env.VITE_GITHUB_URL || "https://github.com/Priyanshu-302"}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-pill p-2.5 text-gray-300 hover:text-white hover:border-white/30 transition-all duration-300"
            aria-label="GitHub Profile"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={import.meta.env.VITE_LINKEDIN_URL || "https://www.linkedin.com/in/priyanshu-das-tech/"}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-pill p-2.5 text-gray-300 hover:text-white hover:border-white/30 transition-all duration-300"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={import.meta.env.VITE_LEETCODE_URL || "https://leetcode.com/u/Priyanshu-302"}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-pill p-2.5 text-gray-300 hover:text-[#FFA116] hover:border-[#FFA116]/40 transition-all duration-300"
            aria-label="LeetCode Profile"
          >
            <LeetcodeIcon size={18} />
          </a>
          <a
            href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL || "dasp98458@gmail.com"}`}
            className="liquid-pill p-2.5 text-gray-300 hover:text-white hover:border-white/30 transition-all duration-300"
            aria-label="Send Email"
          >
            <Mail size={18} />
          </a>
        </motion.div>
      </motion.div>

      {/* Hero Right Avatar in Liquid Glass Frame */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -10, 0],
        }}
        transition={{
          opacity: { duration: 0.8, delay: 0.3 },
          scale: { duration: 0.8, delay: 0.3 },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        className="w-full md:w-1/2 flex justify-center items-center mt-12 md:mt-0 z-10"
      >
        <div className="relative w-72 h-72 sm:w-88 sm:h-88 md:w-[380px] md:h-[380px] group">
          {/* Ambient Liquid Caustic Glow behind Avatar */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/20 via-indigo-500/30 to-pink-500/20 blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 animate-pulse" />

          {/* Liquid Glass Refraction Outer Ring */}
          <div
            onClick={handleHeroImageClick}
            className="w-full h-full rounded-[38px] p-3.5 liquid-glass-pane transition-all duration-500 hover:scale-[1.02] cursor-pointer shadow-2xl relative"
          >
            {/* Inner Refractive Photo Container */}
            <div className="w-full h-full rounded-[28px] overflow-hidden relative shadow-inner border border-white/20">
              <img
                src="portfolio-image-1.jpg"
                alt="Priyanshu Das"
                className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
              />

              {/* Gloss Specular Arc Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent pointer-events-none" />

              {/* Liquid Interactive Badge at Corner of Avatar */}
              <div className="absolute bottom-3 left-3 right-3 liquid-glass-modal rounded-2xl p-2.5 flex items-center justify-between border border-white/20 backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300">
                    <Sparkles size={14} />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold text-white leading-tight">Priyanshu Das</p>
                    <p className="text-[9px] text-gray-300 font-mono">CSE • AI & ML</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-semibold px-2 py-0.5 liquid-pill bg-emerald-500/10 border-emerald-500/30">
                  9.04 CGPA
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
