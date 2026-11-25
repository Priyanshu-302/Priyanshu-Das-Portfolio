import { motion } from "framer-motion";
import { BookOpen, Award, CheckCircle, Star, Shield, Briefcase, GraduationCap } from "lucide-react";
import PremiumCard from "./PremiumCard";

export default function Education() {
  const academicItems = [
    {
      title: "Software Engineering Intern",
      school: "UnifyList (Kolkata, India)",
      year: "Apr 2026 - Present",
      description: [
        "Engineered an AI-powered conversational backend leveraging OpenAI GPT-4o-mini, transforming requirements into production-ready schemas and reducing manual setup time from 30+ minutes to under 3 minutes.",
        "Designed real-time streaming pipelines using Server-Sent Events (SSE) to push live compilation percentages and updates, supporting 20+ concurrent user sessions.",
        "Built a self-healing schema validator enforcing constraints, automatically converting plain ID fields into lookup relationships, reducing schema validation errors by 30%.",
        "Integrated GraphQL (Apollo/Axios) APIs with exponential backoff retry logic to automate schema generation and migrations, maintaining high reliability under transient failures.",
        "Collaborated in an Agile team environment, contributing to daily standups, sprint planning, and constructive peer code reviews."
      ],
      icon: Briefcase,
    },
    {
      title: "B.Tech in Computer Science & Engineering (AI & ML)",
      school: "Brainware University (Kolkata, India)",
      year: "Aug 2023 - Jul 2027",
      description: "Cumulative GPA: 9.04/10 (Up to 6th Sem). Relevant coursework: Data Structures & Algorithms, Object-Oriented Programming, Operating Systems, DBMS, Web Development.",
      icon: BookOpen,
    },
  ];

  const certificationItems = [
    {
      title: "Samsung Innovation Campus Participant",
      description: "Completed intensive ML/DS training. Developed CardioGuard AI (Heart Disease Prediction System) capstone achieving 92% accuracy (Sep - Nov 2025).",
      icon: Star,
      iconColor: "text-yellow-400",
    },
    {
      title: "MSME Project Shortlist",
      description: "Ministry of MSME, Govt. of India (Aug 2025): Shortlisted for AI-Powered Drone Logistics under innovation support program.",
      icon: CheckCircle,
      iconColor: "text-emerald-400",
    },
    {
      title: "Adobe India Hackathon Participant",
      description: "Advanced through competitive assessment rounds and algorithmic coding challenges (Jun 2025).",
      icon: Shield,
      iconColor: "text-cyan-400",
    },
    {
      title: "Smart India Hackathon Participant",
      description: "Developed AI-powered sports talent assessment platform proposal for national competition (Sep 2025).",
      icon: Shield,
      iconColor: "text-indigo-400",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        cubicBezier: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="education" className="py-24 relative">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-1.5 liquid-pill px-3.5 py-1 text-xs font-mono text-cyan-300 mb-3">
            <GraduationCap size={13} />
            <span>BACKGROUND</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white">
            Experience & <span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-pink-400 bg-clip-text text-transparent">Milestones</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto mt-4 rounded-full shadow-[0_0_10px_#38bdf8]" />
        </motion.div>

        {/* Timeline Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {/* Left Column: Academic & Internship Timeline */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="w-full h-full"
          >
            <PremiumCard
              glowColor="rgba(139, 92, 246, 0.12)"
              borderColor="rgba(139, 92, 246, 0.4)"
              className="p-8 h-full"
            >
              <h3 className="text-2xl font-bold font-display text-white mb-8 flex items-center gap-3">
                <div className="p-2 rounded-2xl bg-indigo-500/15 border border-indigo-400/30 text-indigo-300">
                  <BookOpen size={20} />
                </div>
                <span>Career & Education</span>
              </h3>

              <div className="relative border-l border-white/15 ml-4 pl-7 space-y-10">
                {academicItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="relative group"
                    >
                      {/* Liquid Droplet Node */}
                      <div className="absolute -left-[41px] top-1 w-7 h-7 rounded-full liquid-glass-modal border border-cyan-400/50 flex items-center justify-center text-cyan-300 group-hover:scale-110 group-hover:border-cyan-300 shadow-[0_0_12px_rgba(56,189,248,0.3)] transition-all duration-300">
                        <IconComponent size={13} />
                      </div>

                      <span className="text-xs font-mono text-cyan-300 liquid-pill px-3 py-1 font-medium">
                        {item.year}
                      </span>
                      <h4 className="text-lg font-bold font-display text-white mt-2.5 mb-1 group-hover:text-cyan-300 transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-indigo-200/80 mb-3 font-medium">
                        {item.school}
                      </p>
                      {Array.isArray(item.description) ? (
                        <ul className="list-disc pl-4 space-y-1.5 text-xs sm:text-sm text-gray-300/80 leading-relaxed">
                          {item.description.map((bullet, bIdx) => (
                            <li key={bIdx} className="hover:text-white transition-colors duration-200">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs sm:text-sm text-gray-300/80 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </PremiumCard>
          </motion.div>

          {/* Right Column: Achievements & Certifications */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="w-full h-full"
          >
            <PremiumCard
              glowColor="rgba(56, 189, 248, 0.12)"
              borderColor="rgba(56, 189, 248, 0.4)"
              className="p-8 h-full flex flex-col justify-between"
            >
              <div>
                <h3 className="text-2xl font-bold font-display text-white mb-8 flex items-center gap-3">
                  <div className="p-2 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-300">
                    <Award size={20} />
                  </div>
                  <span>Honors & Certifications</span>
                </h3>

                <div className="space-y-4">
                  {certificationItems.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ y: -2 }}
                        className="flex gap-4 p-4 rounded-2xl liquid-pill bg-white/[0.02] border-white/10 hover:border-white/25 hover:bg-white/[0.06] transition-all duration-300 group cursor-default"
                      >
                        <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${item.iconColor} group-hover:scale-110 transition-transform duration-300 h-fit flex-shrink-0`}>
                          <IconComponent size={18} />
                        </div>
                        <div>
                          <h4 className="text-base font-bold font-display text-white mb-1 group-hover:text-cyan-300 transition-colors">
                            {item.title}
                          </h4>
                          <p className="text-xs text-gray-300/80 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <motion.div
                variants={itemVariants}
                className="mt-8 pt-6 border-t border-white/10 text-center lg:text-left"
              >
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200 transition-colors group"
                >
                  <span>Let's discuss collaborations</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </a>
              </motion.div>
            </PremiumCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
