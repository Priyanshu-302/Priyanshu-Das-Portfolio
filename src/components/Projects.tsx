import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
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

    // Compute rotation angles (max 8 degrees)
    const rY = (mouseX / (width / 2)) * 8;
    const rX = -(mouseY / (height / 2)) * 8;

    setRotateX(rX);
    setRotateY(rY);

    // Mouse coordinates relative to top-left (for spotlight)
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
      className="perspective-container w-full"
    >
      <motion.div
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
        className="tilt-card rounded-2xl p-3 border border-white/5 relative overflow-hidden bg-gray-900/30 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:shadow-indigo-500/10 hover:bg-gray-900/45"
      >
        {/* Spotlight Glow Background */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
            style={{
              background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.1), transparent 75%)`,
            }}
          />
        )}

        {/* Spotlight Border Glow */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none z-10 rounded-2xl"
            style={{
              border: "1px solid rgba(99, 102, 241, 0.25)",
              WebkitMaskImage: `radial-gradient(130px circle at ${coords.x}px ${coords.y}px, black, transparent)`,
              maskImage: `radial-gradient(130px circle at ${coords.x}px ${coords.y}px, black, transparent)`,
            }}
          />
        )}
        {/* Project Thumbnail Image */}
        <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
          <div className="absolute inset-0 bg-indigo-950/20 group-hover:bg-transparent z-10 transition-colors duration-500" />
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          {/* Status Badge */}
          <span className={`absolute top-3 right-3 z-20 px-2.5 py-0.5 text-xs font-mono rounded-full flex items-center gap-1.5 backdrop-blur-md ${project.statusColor} border border-white/10`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            {project.status}
          </span>
        </div>

        {/* Info */}
        <div className="p-4" style={{ transform: "translateZ(20px)" }}>
          <h3 className="text-xl font-bold font-display text-white mb-2 group-hover:text-indigo-400 transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-5 h-20 overflow-y-auto">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-xs font-mono bg-white/5 border border-white/5 text-indigo-300 rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all duration-300"
              aria-label="GitHub Repository"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-indigo-400 hover:border-indigo-500/20 transition-all duration-300 flex items-center justify-center"
              aria-label="Live Demo Link"
            >
              <ExternalLink size={18} />
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  const projectList: ProjectItem[] = [
    {
      title: "AI Code Query & Explainer Tool",
      description: "Engineered platform parsing multi-language code with Gemini API, reducing comprehension time by 60%. Built React.js frontend with Node.js backend handling 100+ requests/min.",
      image: "synapse-ai.png",
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Gemini API"],
      githubUrl: "https://github.com/Priyanshu-302/AI-Explain.git",
      liveUrl: "https://synapse-ai.up.railway.app/",
      status: "Live",
      statusColor: "bg-indigo-500/10 text-indigo-400",
    },
    {
      title: "Multi-Tenant SaaS Ticketing Engine",
      description: "Built robust multi-tenant SaaS backend with organization-level data isolation, role-based access control, ticket tracking with history, and JWT authentication.",
      image: "taskflow.png",
      tags: ["Node.js", "Express.js", "PostgreSQL", "JWT"],
      githubUrl: "https://github.com/Priyanshu-302",
      liveUrl: "https://github.com/Priyanshu-302",
      status: "Beta",
      statusColor: "bg-green-500/10 text-green-400",
    },
    {
      title: "Railway Reservation System",
      description: "Engineered a high-concurrency booking engine handling concurrent seat allocations with transactional integrity. Optimized database queries to reduce search latency by 35%, ensuring real-time availability updates.",
      image: "railway-reservation.png",
      tags: ["Node.js", "Express.js", "PostgreSQL", "JWT"],
      githubUrl: "https://github.com/Priyanshu-302",
      liveUrl: "https://github.com/Priyanshu-302",
      status: "Beta",
      statusColor: "bg-blue-500/10 text-blue-400",
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
          <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white">
            My <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full" />
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
            className="group inline-flex items-center gap-2 px-6 py-3 border border-indigo-500/30 hover:border-indigo-500/80 hover:bg-indigo-950/20 text-indigo-400 hover:text-indigo-300 rounded-xl font-medium transition-all duration-300"
          >
            View All Projects
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
