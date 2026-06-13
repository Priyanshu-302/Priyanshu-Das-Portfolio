import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Eye, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./SocialIcons";
import confetti from "canvas-confetti";

export default function Hero() {
  const [typedText, setTypedText] = useState("");
  const strings = [
    "{ Full-Stack Developer }",
    "{ Software Engineering Intern }",
    "{ AI/ML Specialist }",
  ];
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Custom typing effect implementation
  useEffect(() => {
    const currentString = strings[stringIndex];
    let timer: number;

    const tick = () => {
      if (!isDeleting) {
        setTypedText(currentString.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);

        if (charIndex >= currentString.length) {
          // Pause at the end of typing
          timer = setTimeout(() => setIsDeleting(true), 1500);
          return;
        }
      } else {
        setTypedText(currentString.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);

        if (charIndex <= 0) {
          setIsDeleting(false);
          setStringIndex((prev) => (prev + 1) % strings.length);
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
    // Fun easter egg confetti burst on avatar click
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#3b82f6", "#8b5cf6", "#ec4899"],
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
      className="relative min-h-screen flex flex-col md:flex-row justify-between items-center px-4 pt-32 pb-16 md:py-0 overflow-hidden"
    >
      {/* Hero Left Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left z-10"
      >
        <motion.span
          variants={itemVariants}
          className="px-3 py-1 text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full mb-4"
        >
          Available for Opportunities
        </motion.span>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display leading-tight mb-4 text-white"
        >
          Hello, I'm <br className="hidden md:inline" />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-pink-500 bg-clip-text text-transparent">
            Priyanshu Das
          </span>
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="text-xl sm:text-2xl md:text-3xl font-mono text-indigo-400 h-10 mb-6 flex items-center"
        >
          <span>{typedText}</span>
          <span className="w-1.5 h-6 bg-indigo-500 ml-1 animate-pulse" />
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-gray-300 mb-8 max-w-lg leading-relaxed"
        >
          Computer Science & Engineering student specializing in{" "}
          <span className="text-blue-400 font-medium">AI/ML</span> and{" "}
          <span className="text-indigo-400 font-medium">Full-Stack Development</span>,
          with professional experience building conversational AI backends as a
          Software Engineering Intern at UnifyList.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center md:justify-start"
        >
          <a
            href="#contact"
            onClick={(e) => handleScrollTo(e, "#contact")}
            className="group px-6 py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-medium rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20 flex items-center justify-center gap-2 cursor-pointer"
          >
            Let's Connect
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#projects"
            onClick={(e) => handleScrollTo(e, "#projects")}
            className="px-6 py-3.5 border border-white/10 hover:border-indigo-500/40 text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 font-medium rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Eye size={18} />
            View Work
          </a>
        </motion.div>

        {/* Mini Social Links */}
        <motion.div variants={itemVariants} className="flex gap-4 mt-8">
          <a
            href={import.meta.env.VITE_GITHUB_URL || "https://github.com/Priyanshu-302"}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300"
          >
            <GithubIcon size={18} />
          </a>
          <a
            href={import.meta.env.VITE_LINKEDIN_URL || "https://www.linkedin.com/in/priyanshu-das-tech/"}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300"
          >
            <LinkedinIcon size={18} />
          </a>
          <a
            href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL || "dasp98458@gmail.com"}`}
            className="p-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300"
          >
            <Mail size={18} />
          </a>
        </motion.div>
      </motion.div>

      {/* Hero Right Avatar Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: [0, -12, 0],
        }}
        transition={{
          opacity: { duration: 0.8, delay: 0.3 },
          scale: { duration: 0.8, delay: 0.3 },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
        }}
        className="w-full md:w-1/2 flex justify-center items-center mt-12 md:mt-0 z-10"
      >
        <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 group">
          {/* Back glows */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 animate-pulse" />
          
          {/* Glass frame */}
          <div
            onClick={handleHeroImageClick}
            className="w-full h-full rounded-full p-2 border-2 border-dashed border-indigo-500/30 hover:border-indigo-400 group-pointer transition-colors duration-500 relative cursor-pointer"
          >
            <img
              src="portfolio-image-1.jpg"
              alt="Priyanshu Das"
              className="rounded-full w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700 hover:scale-[1.02] shadow-2xl"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
