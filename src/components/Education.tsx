import { motion } from "framer-motion";
import { BookOpen, Award, CheckCircle, Star, Shield, Briefcase } from "lucide-react";
import PremiumCard from "./PremiumCard";

export default function Education() {
  const academicItems = [
    {
      title: "Software Engineering Intern",
      school: "UnifyList (Kolkata, India)",
      year: "Apr 2026 - Present",
      description: "Engineered OpenAI GPT-4o-mini conversational AI backends for automated application schema generation. Designed real-time SSE streaming pipelines and integrated GraphQL APIs with custom retry systems.",
      icon: Briefcase,
    },
    {
      title: "B.Tech in Computer Science & Engineering (AI & ML)",
      school: "Brainware University",
      year: "Aug 2023 - Jul 2027",
      description: "Currently maintaining an 8.62/10.0 CGPA. Specialized in Data Structures, Object-Oriented Programming, and Web Engineering.",
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
      iconColor: "text-green-400",
    },
    {
      title: "Adobe India Hackathon Participant",
      description: "Advanced through competitive assessment rounds and algorithmic coding challenges (Jun 2025).",
      icon: Shield,
      iconColor: "text-blue-400",
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
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
          <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white">
            Education & <span className="bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">Milestones</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Timeline Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Academic Timeline */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="w-full h-full"
          >
            <PremiumCard glowColor="rgba(139, 92, 246, 0.1)" borderColor="rgba(139, 92, 246, 0.25)" className="p-8 h-full">
            <h3 className="text-2xl font-bold font-display text-white mb-8 flex items-center gap-3">
              <BookOpen className="text-indigo-400" size={24} />
              Experience & Education
            </h3>

            <div className="relative border-l border-gray-700 ml-4 pl-6 space-y-10">
              {academicItems.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="relative group"
                  >
                    {/* Node Dot */}
                    <div className="absolute -left-[37px] top-1.5 w-6 h-6 rounded-full bg-[#0b0f19] border-2 border-indigo-500 flex items-center justify-center text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-950 transition-all duration-300">
                      <IconComponent size={12} />
                    </div>

                    <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 px-2 py-0.5 border border-indigo-500/25 rounded-md">
                      {item.year}
                    </span>
                    <h4 className="text-lg font-bold font-display text-white mt-2 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm text-indigo-200/70 mb-2 font-medium">
                      {item.school}
                    </p>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
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
            <PremiumCard glowColor="rgba(59, 130, 246, 0.1)" borderColor="rgba(59, 130, 246, 0.25)" className="p-8 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold font-display text-white mb-8 flex items-center gap-3">
                <Award className="text-blue-400" size={24} />
                Achievements & Certifications
              </h3>

              <div className="space-y-8">
                {certificationItems.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      className="flex gap-4 group"
                    >
                      <div className={`p-2.5 rounded-xl bg-white/5 border border-white/10 ${item.iconColor} group-hover:scale-105 group-hover:border-white/20 transition-all duration-300 h-fit`}>
                        <IconComponent size={20} />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold font-display text-white mb-1 group-hover:text-indigo-300 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-400 leading-relaxed">
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
              className="mt-10 pt-6 border-t border-white/5 text-center lg:text-left"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
              >
                Let's discuss collaborations
                <span className="translate-y-[0.5px]">→</span>
              </a>
            </motion.div>
            </PremiumCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
