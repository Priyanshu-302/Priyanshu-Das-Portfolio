import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, Check, MessageSquare } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon, LeetcodeIcon } from "./SocialIcons";
import confetti from "canvas-confetti";
import PremiumCard from "./PremiumCard";

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setFormSubmitted(true);

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.8 },
      colors: ["#38bdf8", "#818cf8", "#f472b6", "#34d399"],
    });

    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 relative">
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
            <MessageSquare size={13} />
            <span>CONNECT</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white">
            Get In <span className="bg-gradient-to-r from-cyan-300 via-indigo-300 to-pink-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto mt-4 rounded-full shadow-[0_0_10px_#38bdf8]" />
        </motion.div>

        {/* Form Container */}
        <PremiumCard
          glowColor="rgba(236, 72, 153, 0.1)"
          borderColor="rgba(255, 255, 255, 0.35)"
          className="max-w-5xl mx-auto p-8 sm:p-12 lg:p-14"
        >
          <div className="flex flex-col md:flex-row gap-12 lg:gap-16 relative overflow-hidden">
            {/* Ambient Caustic Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" />

            {/* Left Column: Details */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-3xl font-bold font-display text-white mb-4">
                  Let's Build Something Extraordinary
                </h3>
                <p className="text-gray-300/80 leading-relaxed mb-8 text-sm sm:text-base">
                  I am currently open to full-stack engineering roles, software engineering internships, and high-impact distributed systems projects. Let's discuss how I can add value to your team.
                </p>

                {/* Info Items */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-3 rounded-2xl liquid-pill bg-white/[0.02] border-white/10 group cursor-pointer hover:border-white/25 transition-all">
                    <div className="w-11 h-11 rounded-2xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 flex items-center justify-center group-hover:scale-105 group-hover:bg-cyan-400 group-hover:text-black transition-all duration-300 flex-shrink-0">
                      <Mail size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] text-gray-400 font-mono uppercase tracking-wider">Email</p>
                      <a
                        href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL || "dasp98458@gmail.com"}`}
                        className="font-semibold text-white text-sm hover:text-cyan-300 transition-colors truncate block"
                      >
                        {import.meta.env.VITE_CONTACT_EMAIL || "dasp98458@gmail.com"}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-2xl liquid-pill bg-white/[0.02] border-white/10 group cursor-pointer hover:border-white/25 transition-all">
                    <div className="w-11 h-11 rounded-2xl bg-indigo-500/15 border border-indigo-400/30 text-indigo-300 flex items-center justify-center group-hover:scale-105 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-300 flex-shrink-0">
                      <Phone size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] text-gray-400 font-mono uppercase tracking-wider">Phone</p>
                      <a
                        href={`tel:${(import.meta.env.VITE_CONTACT_PHONE || "+91 9123988645").replace(/\s+/g, "")}`}
                        className="font-semibold text-white text-sm hover:text-cyan-300 transition-colors truncate block"
                      >
                        {import.meta.env.VITE_CONTACT_PHONE || "+91 9123988645"}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-3 rounded-2xl liquid-pill bg-white/[0.02] border-white/10 group cursor-default">
                    <div className="w-11 h-11 rounded-2xl bg-pink-500/15 border border-pink-400/30 text-pink-300 flex items-center justify-center flex-shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[11px] text-gray-400 font-mono uppercase tracking-wider">Location</p>
                      <span className="font-semibold text-white text-sm truncate block">
                        {import.meta.env.VITE_CONTACT_LOCATION || "Kolkata, West Bengal, India"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Icons */}
              <div className="mt-10 pt-6 border-t border-white/10">
                <h4 className="text-xs font-mono uppercase tracking-wider text-gray-400 mb-4">Connect Online</h4>
                <div className="flex gap-3">
                  {[
                    { icon: GithubIcon, url: import.meta.env.VITE_GITHUB_URL || "https://github.com/Priyanshu-302", label: "GitHub" },
                    { icon: LinkedinIcon, url: import.meta.env.VITE_LINKEDIN_URL || "https://www.linkedin.com/in/priyanshu-das-tech/", label: "LinkedIn" },
                    { icon: LeetcodeIcon, url: import.meta.env.VITE_LEETCODE_URL || "https://leetcode.com/u/Priyanshu-302", label: "LeetCode" },
                    { icon: InstagramIcon, url: import.meta.env.VITE_INSTAGRAM_URL || "https://www.instagram.com/piku_7439/", label: "Instagram" },
                  ].map((social, sIdx) => {
                    const SocialIcon = social.icon;
                    return (
                      <a
                        key={sIdx}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="liquid-pill p-3 text-gray-300 hover:text-cyan-300 hover:border-white/35 transition-all duration-300 hover:scale-110"
                        aria-label={social.label}
                      >
                        <SocialIcon size={18} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Right Column: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2 flex flex-col justify-center"
            >
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleFormSubmit}
                    className="space-y-4"
                  >
                    <div>
                      <label htmlFor="name" className="block mb-2 text-xs font-mono font-medium text-gray-300 uppercase tracking-wider">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3.5 liquid-input text-white placeholder-gray-500 text-sm focus:outline-none"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block mb-2 text-xs font-mono font-medium text-gray-300 uppercase tracking-wider">
                        Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3.5 liquid-input text-white placeholder-gray-500 text-sm focus:outline-none"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block mb-2 text-xs font-mono font-medium text-gray-300 uppercase tracking-wider">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3.5 liquid-input text-white placeholder-gray-500 text-sm focus:outline-none"
                        placeholder="Project Opportunity / Collaboration"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block mb-2 text-xs font-mono font-medium text-gray-300 uppercase tracking-wider">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full px-4 py-3.5 liquid-input text-white placeholder-gray-500 text-sm focus:outline-none resize-none"
                        placeholder="Tell me about your vision, role, or project..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 liquid-btn-emerald text-white font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xl group"
                    >
                      <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      <span>Send Message</span>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-12 flex flex-col items-center liquid-glass-card p-8 rounded-3xl"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                      <Check size={32} />
                    </div>
                    <h4 className="text-2xl font-bold font-display text-white mb-2">Message Dispatched!</h4>
                    <p className="text-sm text-gray-300 max-w-xs leading-relaxed">
                      Thank you, {formData.name}! Your message has been received. I will reply promptly.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </PremiumCard>
      </div>
    </section>
  );
}
