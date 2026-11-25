import { ArrowRight, Sparkles } from "lucide-react";

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
    <footer className="pb-16 pt-12 border-t border-white/10 bg-slate-950/40 backdrop-blur-2xl relative z-10">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          {/* Copyright & Logo */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500 p-[1px]">
                <div className="w-full h-full rounded-full bg-[#080d1a] flex items-center justify-center">
                  <Sparkles size={11} className="text-cyan-300" />
                </div>
              </div>
              <span className="text-xl font-bold font-display tracking-tight bg-gradient-to-r from-cyan-300 via-indigo-200 to-pink-300 bg-clip-text text-transparent">
                Priyanshu Das
              </span>
            </div>
            <p className="text-gray-400 text-xs font-mono">
              © {currentYear} Priyanshu Das. Crafted with Liquid Glass & 3D WebGL.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <nav className="flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2 mb-4 text-gray-400 text-xs uppercase tracking-wider font-semibold">
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
                  className="hover:text-cyan-300 transition-colors duration-300"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-300 hover:text-cyan-200 transition-colors liquid-pill px-3 py-1"
            >
              <span>Let's Connect</span>
              <ArrowRight size={13} />
            </a>
          </div>
        </div>

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mt-8 mb-6" />
        <p className="text-[11px] text-center text-gray-500 font-mono">
          Engineered for performance, elegance, and scale.
        </p>
      </div>
    </footer>
  );
}
