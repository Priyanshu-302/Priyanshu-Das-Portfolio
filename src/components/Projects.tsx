import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, Layers } from "lucide-react";
import { GithubIcon } from "./SocialIcons";

interface ProjectItem {
  title: string;
  description: string;
  image: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  status: "Live" | "Beta" | "Demo";
  statusColor: string;
}

function ProjectCard({ project }: { project: ProjectItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Mouse coordinates relative to card center (for 3D tilt)
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Compute rotation angles (max 7 degrees)
    const rY = (mouseX / (width / 2)) * 7;
    const rX = -(mouseY / (height / 2)) * 7;

    setRotateX(rX);
    setRotateY(rY);

    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-container w-full h-full"
    >
      <motion.div
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
        className="tilt-card rounded-[28px] p-4 relative overflow-hidden liquid-glass-card shadow-2xl transition-all duration-300 h-full flex flex-col justify-between"
      >
        {/* Liquid Caustic Spotlight on Hover */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
            style={{
              background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(56, 189, 248, 0.12), transparent 70%)`,
            }}
          />
        )}

        {/* Dynamic Specular Edge Gleam */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none z-10 rounded-[28px]"
            style={{
              border: "1px solid rgba(255, 255, 255, 0.4)",
              WebkitMaskImage: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, black, transparent)`,
              maskImage: `radial-gradient(150px circle at ${coords.x}px ${coords.y}px, black, transparent)`,
            }}
          />
        )}

        {/* Top Rim Specular Highlight */}
        <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none z-10" />

        {/* Main Content */}
        <div className="relative z-20 flex flex-col h-full">
          {/* Project Thumbnail Image with Liquid Frame */}
          <div className="relative aspect-video rounded-[20px] overflow-hidden mb-5 border border-white/15 shadow-inner group">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover rounded-[20px] group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

            {/* Liquid Status Pill Badge */}
            <span
              className={`absolute top-3 right-3 z-20 px-3 py-1 text-xs font-mono rounded-full flex items-center gap-1.5 liquid-pill ${project.statusColor} font-semibold`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse shadow-[0_0_6px_currentColor]" />
              {project.status}
            </span>
          </div>

          {/* Info */}
          <div className="px-2 flex-grow flex flex-col justify-between" style={{ transform: "translateZ(20px)" }}>
            <div>
              <h3 className="text-xl font-bold font-display text-white mb-2.5 hover:text-cyan-300 transition-colors">
                {project.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-300/80 leading-relaxed mb-5 line-clamp-3">
                {project.description}
              </p>
            </div>

            <div>
              {/* Liquid Pill Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-[11px] font-mono liquid-pill text-cyan-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-pill px-3.5 py-2 text-gray-300 hover:text-white flex items-center gap-2 text-xs font-semibold hover:border-white/40 transition-all duration-300"
                  aria-label="GitHub Repository"
                >
                  <GithubIcon size={16} />
                  <span>Code</span>
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-btn-glass px-4 py-2 text-white hover:text-cyan-300 flex items-center gap-1.5 text-xs font-semibold"
                  aria-label="Live Demo Link"
                >
                  <span>Live Demo</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const projectList: ProjectItem[] = [
    {
      title: "SecureLink – URL Shortener & Bio Hub",
      description: "Engineered a scalable URL shortening service using Base62 encoding algorithms and MongoDB indexing to deliver sub-millisecond, constant-time O(1) link redirections with passcode locks and bio customization.",
      image: "taskflow.png",
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Framer Motion"],
      githubUrl: "https://github.com/Priyanshu-302",
      liveUrl: "https://github.com/Priyanshu-302",
      status: "Live",
      statusColor: "text-cyan-300",
    },
    {
      title: "Railway Reservation Engine",
      description: "Architected an ACID-compliant booking engine using PostgreSQL row-level locks (SELECT FOR UPDATE) within database transactions with B-Tree composite indexes to eliminate seat race conditions.",
      image: "railway-reservation.png",
      tags: ["Node.js", "Express.js", "PostgreSQL", "JWT", "ACID"],
      githubUrl: "https://github.com/Priyanshu-302",
      liveUrl: "https://github.com/Priyanshu-302",
      status: "Beta",
      statusColor: "text-blue-300",
    },
    {
      title: "AI Code Query & Explainer",
      description: "Built an LLM-powered assistant using the Gemini API to generate structured explanations for multi-language source code with automated context synthesis and real-time responses.",
      image: "synapse-ai.png",
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Gemini API"],
      githubUrl: "https://github.com/Priyanshu-302/AI-Explain.git",
      liveUrl: "https://synapse-ai.up.railway.app/",
      status: "Live",
      statusColor: "text-emerald-300",
    },
  ];

  return (
    <section id="projects" className="py-24 relative">
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
            <Layers size={13} />
            <span>PORTFOLIO</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white">
            Featured <span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-pink-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto mt-4 rounded-full shadow-[0_0_10px_#38bdf8]" />
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectList.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="h-full"
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <a
            href="https://github.com/Priyanshu-302"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-btn-glass group inline-flex items-center gap-2 px-8 py-3.5 text-white font-semibold text-sm"
          >
            <span>Explore All Repositories</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-cyan-300" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
