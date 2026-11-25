import { motion } from "framer-motion";
import { Code, Eye, Download, Terminal } from "lucide-react";
import confetti from "canvas-confetti";
import PremiumCard from "./PremiumCard";

export default function About() {
  const triggerResumeConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#38bdf8", "#818cf8", "#f472b6", "#34d399"],
    });
  };

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-1.5 liquid-pill px-3.5 py-1 text-xs font-mono text-cyan-300 mb-3">
            <Terminal size={13} />
            <span>DISCOVER</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white">
            About <span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-pink-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto mt-4 rounded-full shadow-[0_0_10px_#38bdf8]" />
        </motion.div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Image Column in Liquid Glass Frame */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/3 flex justify-center"
          >
            <div className="relative group max-w-sm w-full">
              {/* Caustic Glow Layer */}
              <div className="absolute -inset-2 rounded-[34px] bg-gradient-to-r from-cyan-500/20 via-indigo-500/20 to-pink-500/20 opacity-40 blur-2xl group-hover:opacity-70 transition duration-700 pointer-events-none" />

              {/* Liquid Glass Frame */}
              <div className="relative liquid-glass-pane p-3 rounded-[30px] shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
                <div className="rounded-[22px] overflow-hidden border border-white/20 relative">
                  <img
                    src="portfolio-image-2.jpg"
                    alt="About Priyanshu"
                    className="w-full h-auto object-cover rounded-[22px] grayscale-[10%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  {/* Glass Sheen */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.06] to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Details Column */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-2/3"
          >
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white mb-4">
              Building Resilient, High-Throughput Systems
            </h3>
            <p className="text-gray-300 leading-relaxed mb-8 text-base">
              I am a final-year Computer Science & Engineering student specializing in Full-Stack Backend Systems, Real-Time Streaming Architectures, and LLM Integration. With professional experience engineering conversational AI backends as a Software Engineering Intern at UnifyList, I focus on building transactional relational backends, fault-tolerant GraphQL/RESTful APIs, and real-time streaming pipelines. I am passionate about system architecture and performance, having solved 450+ Data Structures & Algorithms problems on LeetCode (Rating: 1545).
            </p>

            {/* Core Cards (Liquid Glass Cards with Double Bevel) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <PremiumCard
                glowColor="rgba(56, 189, 248, 0.12)"
                borderColor="rgba(56, 189, 248, 0.4)"
                className="p-6"
              >
                <div className="flex items-center gap-3.5 mb-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center text-cyan-300 shadow-inner">
                    <Code size={20} />
                  </div>
                  <h4 className="text-lg font-bold font-display text-white">Full-Stack Backend</h4>
                </div>
                <p className="text-sm text-gray-300/80 leading-relaxed">
                  Building robust backend services, real-time streaming pipelines, and multi-tenant SaaS systems using Node.js, Express, PostgreSQL, and MongoDB.
                </p>
              </PremiumCard>

              <PremiumCard
                glowColor="rgba(139, 92, 246, 0.12)"
                borderColor="rgba(139, 92, 246, 0.4)"
                className="p-6"
              >
                <div className="flex items-center gap-3.5 mb-3.5">
                  <div className="w-10 h-10 rounded-2xl bg-indigo-500/15 border border-indigo-400/30 flex items-center justify-center text-indigo-300 shadow-inner">
                    <Eye size={20} />
                  </div>
                  <h4 className="text-lg font-bold font-display text-white">AI & ML Solutions</h4>
                </div>
                <p className="text-sm text-gray-300/80 leading-relaxed">
                  Integrating advanced LLMs (OpenAI, Gemini) for automated conversational agents, and building specialized machine learning classification systems.
                </p>
              </PremiumCard>
            </div>

            {/* Resume button (Liquid Glass Pill Button) */}
            <div className="flex justify-center sm:justify-start">
              <a
                href="Priyanshu-Das-Resume.pdf"
                download="Priyanshu-Das-Resume.pdf"
                onClick={triggerResumeConfetti}
                className="liquid-btn-emerald inline-flex items-center gap-2.5 px-7 py-3.5 text-white font-semibold text-sm cursor-pointer shadow-lg group"
              >
                <Download size={17} className="group-hover:-translate-y-0.5 transition-transform" />
                <span>Download Resume</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
