import { motion } from "framer-motion";
import { Code, Server, Database, Layout, Wrench, Cloud, Cpu, Zap, GitBranch, Brain, Layers, CpuIcon } from "lucide-react";
import PremiumCard from "./PremiumCard";

export default function Skills() {
  const skillCategories = [
    {
      title: "Languages & Core CS",
      color: "text-cyan-300",
      glowColor: "rgba(56, 189, 248, 0.12)",
      borderColor: "rgba(56, 189, 248, 0.4)",
      badgeColor: "text-cyan-300 bg-cyan-500/10 border-cyan-500/30",
      skills: [
        { name: "C++ & C", level: "Advanced", icon: Cpu, iconColor: "text-cyan-400" },
        { name: "JavaScript (ES6+)", level: "Expert", icon: Code, iconColor: "text-yellow-400" },
        { name: "SQL (DDL/DML)", level: "Advanced", icon: Database, iconColor: "text-blue-400" },
        { name: "LeetCode (450+ Solved)", level: "1545 Rating", icon: Brain, iconColor: "text-pink-400" },
        { name: "Core CS (OOP, OS, DBMS)", level: "Expert", icon: Server, iconColor: "text-indigo-400" },
      ],
    },
    {
      title: "Backend & AI Systems",
      color: "text-indigo-300",
      glowColor: "rgba(139, 92, 246, 0.12)",
      borderColor: "rgba(139, 92, 246, 0.4)",
      badgeColor: "text-indigo-300 bg-indigo-500/10 border-indigo-500/30",
      skills: [
        { name: "Node.js & Express.js", level: "Advanced", icon: Server, iconColor: "text-green-400" },
        { name: "GraphQL & RESTful APIs", level: "Expert", icon: Zap, iconColor: "text-yellow-400" },
        { name: "PostgreSQL & MongoDB", level: "Advanced", icon: Database, iconColor: "text-sky-400" },
        { name: "LLM Tools (OpenAI/Gemini)", level: "Advanced", icon: Brain, iconColor: "text-purple-400" },
        { name: "System Architecture", level: "Advanced", icon: Layers, iconColor: "text-orange-400" },
      ],
    },
    {
      title: "Frontend & Cloud DevOps",
      color: "text-emerald-300",
      glowColor: "rgba(16, 185, 129, 0.12)",
      borderColor: "rgba(16, 185, 129, 0.4)",
      badgeColor: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
      skills: [
        { name: "React & Framer Motion", level: "Expert", icon: Layout, iconColor: "text-cyan-400" },
        { name: "Docker & AWS (EC2/S3)", level: "Advanced", icon: Cloud, iconColor: "text-blue-400" },
        { name: "Git & GitHub Versioning", level: "Expert", icon: GitBranch, iconColor: "text-orange-500" },
        { name: "Vercel & Netlify Hosting", level: "Expert", icon: Cloud, iconColor: "text-teal-400" },
        { name: "Jest & Postman Testing", level: "Advanced", icon: Wrench, iconColor: "text-orange-400" },
      ],
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section id="skills" className="py-24 relative">
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
            <CpuIcon size={13} />
            <span>CAPABILITIES</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white">
            Technical <span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-pink-400 bg-clip-text text-transparent">Expertise</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto mt-4 rounded-full shadow-[0_0_10px_#38bdf8]" />
        </motion.div>

        {/* Skills Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-7"
        >
          {skillCategories.map((category, catIdx) => (
            <motion.div
              key={catIdx}
              variants={cardVariants}
              className="w-full h-full"
            >
              <PremiumCard
                glowColor={category.glowColor}
                borderColor={category.borderColor}
                className="p-7 h-full flex flex-col justify-between"
              >
                <div>
                  <h3 className={`text-xl font-bold font-display text-center mb-6 ${category.color} tracking-tight`}>
                    {category.title}
                  </h3>

                  {/* Skills List of Liquid Micro-Pills */}
                  <div className="flex flex-col gap-2.5">
                    {category.skills.map((skill, skillIdx) => {
                      const SkillIcon = skill.icon;
                      return (
                        <motion.div
                          key={skillIdx}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: 0.04 * skillIdx,
                            ease: "easeOut",
                          }}
                          whileHover={{ y: -2, scale: 1.01 }}
                          className="flex items-center justify-between p-3 rounded-2xl liquid-pill bg-white/[0.03] border-white/10 hover:border-white/25 hover:bg-white/[0.08] transition-all duration-300 group cursor-default shadow-sm"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`${skill.iconColor} p-1.5 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                              <SkillIcon size={16} />
                            </div>
                            <span className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors truncate">
                              {skill.name}
                            </span>
                          </div>
                          <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider flex-shrink-0 font-medium ${category.badgeColor}`}>
                            {skill.level}
                          </span>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </PremiumCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
