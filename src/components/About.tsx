import { motion } from "framer-motion";
import { Code, Eye, Download } from "lucide-react";
import confetti from "canvas-confetti";
import PremiumCard from "./PremiumCard";

export default function About() {
  const triggerResumeConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 },
      colors: ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981"],
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
          <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white">
            About <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/3 flex justify-center"
          >
            <div className="relative group max-w-sm">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-pink-500 opacity-20 blur-xl group-hover:opacity-40 transition duration-700" />
              <div className="relative glass-card rounded-2xl overflow-hidden p-3 border border-white/10 shadow-2xl">
                <img
                  src="portfolio-image-2.jpg"
                  alt="About Priyanshu"
                  className="w-full h-auto object-cover rounded-xl grayscale-[15%] group-hover:grayscale-0 transition-all duration-700"
                />
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
            <h3 className="text-2xl font-bold font-display text-white mb-4">Who am I?</h3>
            <p className="text-gray-300 leading-relaxed mb-8">
              I am a Computer Science & Engineering student specializing in AI/ML and Full-Stack Development, with professional experience building conversational AI backends. I love delivering end-to-end systems—ranging from multi-tenant SaaS backends to Gemini-powered query engines—with a strong focus on system performance, reliability, and scalable software design.
            </p>

            {/* Core Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <PremiumCard glowColor="rgba(59, 130, 246, 0.1)" borderColor="rgba(59, 130, 246, 0.25)" className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400">
                    <Code size={20} />
                  </div>
                  <h4 className="text-lg font-bold font-display text-white">Full-Stack Development</h4>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Building robust backend services, real-time streaming pipelines, and multi-tenant SaaS systems using Node.js, Express, PostgreSQL, and MongoDB.
                </p>
              </PremiumCard>

              <PremiumCard glowColor="rgba(139, 92, 246, 0.1)" borderColor="rgba(139, 92, 246, 0.25)" className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center text-indigo-400">
                    <Eye size={20} />
                  </div>
                  <h4 className="text-lg font-bold font-display text-white">AI & ML Solutions</h4>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Integrating advanced LLMs (OpenAI, Gemini) for automated conversational agents, and building specialized machine learning classification systems.
                </p>
              </PremiumCard>
            </div>

            {/* Resume button */}
            <div className="flex justify-center sm:justify-start">
              <a
                href="Priyanshu-Das-Resume.pdf"
                download="Priyanshu-Das-Resume.pdf"
                onClick={triggerResumeConfetti}
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/10 hover:border-indigo-500/40 bg-white/5 hover:bg-white/10 text-indigo-400 hover:text-white rounded-xl font-medium transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                <Download size={18} />
                Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
