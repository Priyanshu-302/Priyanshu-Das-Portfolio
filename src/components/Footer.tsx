import { ArrowRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const offset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="pb-16 pt-12 border-t border-white/5 bg-gray-950/20 backdrop-blur-md">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          {/* Copyright & Logo */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="text-2xl font-bold font-display tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-3">
              ~Priyanshu
            </div>
            <p className="text-gray-500 text-sm">
              © {currentYear} Priyanshu Das. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <nav className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 mb-4 text-gray-400 text-sm font-medium">
              {[
                { name: "Home", href: "#home" },
                { name: "About", href: "#about" },
                { name: "Education", href: "#education" },
                { name: "Skills", href: "#skills" },
                { name: "Projects", href: "#projects" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="hover:text-white transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              Let's Connect
              <ArrowRight size={14} />
            </a>
          </div>
        </div>

        <div className="w-full h-[1px] bg-white/5 mt-8 mb-6" />
        <p className="text-xs text-center text-gray-600 font-mono">
          Code is poetry, and design is the stage.
        </p>
      </div>
    </footer>
  );
}
