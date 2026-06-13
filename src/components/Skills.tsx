import { motion } from "framer-motion";
import { Code, Server, Database, Layout, Wrench, Cloud, Cpu, Zap, GitBranch, Terminal } from "lucide-react";
import PremiumCard from "./PremiumCard";

export default function Skills() {
  const skillCategories = [
    {
      title: "Languages",
      color: "text-blue-400 border-blue-500/20",
      glowColor: "rgba(59, 130, 246, 0.08)",
      borderColor: "rgba(59, 130, 246, 0.25)",
      skills: [
        { name: "JavaScript (ES6+)", level: "Expert", icon: Code, iconColor: "text-yellow-400" },
        { name: "C", level: "Advanced", icon: Cpu, iconColor: "text-blue-400" },
        { name: "C++", level: "Advanced", icon: Cpu, iconColor: "text-cyan-400" },
        { name: "HTML5", level: "Expert", icon: Layout, iconColor: "text-orange-400" },
        { name: "CSS3", level: "Expert", icon: Code, iconColor: "text-pink-400" },
      ],
    },
    {
      title: "Web & Frameworks",
      color: "text-purple-400 border-purple-500/20",
      glowColor: "rgba(139, 92, 246, 0.08)",
      borderColor: "rgba(139, 92, 246, 0.25)",
      skills: [
        { name: "React.js", level: "Expert", icon: Cpu, iconColor: "text-cyan-400" },
        { name: "Node.js", level: "Advanced", icon: Server, iconColor: "text-green-400" },
        { name: "Express.js", level: "Advanced", icon: Cloud, iconColor: "text-blue-400" },
        { name: "MongoDB", level: "Advanced", icon: Database, iconColor: "text-green-500" },
        { name: "PostgreSQL", level: "Advanced", icon: Database, iconColor: "text-sky-400" },
        { name: "RESTful APIs", level: "Expert", icon: Zap, iconColor: "text-yellow-400" },
      ],
    },
    {
      title: "Tools & Platforms",
      color: "text-green-400 border-green-500/20",
      glowColor: "rgba(16, 185, 129, 0.08)",
      borderColor: "rgba(16, 185, 129, 0.25)",
      skills: [
        { name: "Git & GitHub", level: "Expert", icon: GitBranch, iconColor: "text-orange-500" },
        { name: "VS Code", level: "Expert", icon: Terminal, iconColor: "text-blue-500" },
        { name: "Postman", level: "Advanced", icon: Wrench, iconColor: "text-orange-400" },
        { name: "Netlify", level: "Advanced", icon: Cloud, iconColor: "text-teal-400" },
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
          <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white">
            My <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Skills Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
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
                className="p-6 h-full flex flex-col justify-between"
              >
                <div>
                  <h3 className={`text-xl font-bold font-display text-center mb-6 ${category.color}`}>
                    {category.title}
                  </h3>

                  {/* Skills List of Badges */}
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
                            delay: 0.05 * skillIdx,
                            ease: "easeOut",
                          }}
                          whileHover={{ y: -2 }}
                          className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/[0.08] transition-colors duration-300 group cursor-default"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={`${skill.iconColor} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                              <SkillIcon size={18} />
                            </div>
                            <span className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors truncate">
                              {skill.name}
                            </span>
                          </div>
                          <span className={`text-[9px] font-mono px-2 py-0.5 border rounded-md uppercase tracking-wider flex-shrink-0 ${
                            category.title === "Languages" ? "text-blue-400 bg-blue-500/10 border-blue-500/20" :
                            category.title === "Web & Frameworks" ? "text-purple-400 bg-purple-500/10 border-purple-500/20" :
                            "text-green-400 bg-green-500/10 border-green-500/20"
                          }`}>
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
