import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from "./SocialIcons";
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

    // Simulate submission
    setFormSubmitted(true);
    
    // Confetti burst on successful submission!
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.8 },
      colors: ["#3b82f6", "#8b5cf6", "#ec4899", "#10b981"],
    });

    // Reset form after delay
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
          <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-white">
            Get In <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Touch</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Form Container Grid */}
        <PremiumCard glowColor="rgba(236, 72, 153, 0.08)" borderColor="rgba(236, 72, 153, 0.25)" className="max-w-5xl mx-auto">
          <div className="p-8 lg:p-12 flex flex-col md:flex-row gap-12 lg:gap-16 relative overflow-hidden">
            {/* Subtle inside ambient glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full pointer-events-none" />

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
                Let's Build Something Great
              </h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                I am currently seeking new challenges, entry roles, and collaborative projects. Feel free to shoot a message about opportunities, inquiries, or just to say hi!
              </p>

              {/* Info Items */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email Address</p>
                    <a href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL || "dasp98458@gmail.com"}`} className="font-semibold text-white hover:text-indigo-400 transition-colors">
                      {import.meta.env.VITE_CONTACT_EMAIL || "dasp98458@gmail.com"}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center group-hover:scale-105 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <a href={`tel:${(import.meta.env.VITE_CONTACT_PHONE || "+91 9123988645").replace(/\s+/g, "")}`} className="font-semibold text-white hover:text-indigo-400 transition-colors">
                      {import.meta.env.VITE_CONTACT_PHONE || "+91 9123988645"}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 group cursor-default">
                  <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 text-pink-400 flex items-center justify-center transition-all duration-300">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <span className="font-semibold text-white">
                      {import.meta.env.VITE_CONTACT_LOCATION || "Hooghly, India"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Icons */}
            <div className="mt-12 pt-8 border-t border-white/5">
              <h4 className="text-sm font-semibold text-gray-400 mb-4">Find me online</h4>
              <div className="flex gap-4">
                {[
                  { icon: GithubIcon, url: import.meta.env.VITE_GITHUB_URL || "https://github.com/Priyanshu-302", color: "hover:bg-neutral-800 hover:text-white" },
                  { icon: LinkedinIcon, url: import.meta.env.VITE_LINKEDIN_URL || "https://www.linkedin.com/in/priyanshu-das-tech/", color: "hover:bg-blue-700 hover:text-white" },
                  { icon: InstagramIcon, url: import.meta.env.VITE_INSTAGRAM_URL || "https://www.instagram.com/piku_7439/", color: "hover:bg-pink-600 hover:text-white" },
                  { icon: TwitterIcon, url: "#", color: "hover:bg-sky-500 hover:text-white" },
                ].map((social, sIdx) => {
                  const SocialIcon = social.icon;
                  return (
                    <a
                      key={sIdx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-11 h-11 rounded-xl bg-white/5 border border-white/10 text-gray-400 flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color}`}
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
                  className="space-y-5"
                >
                  <div>
                    <label htmlFor="name" className="block mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-600 text-sm transition-all"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-600 text-sm transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-600 text-sm transition-all"
                      placeholder="Project Opportunity"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 text-white placeholder-gray-600 text-sm transition-all resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    Send Message
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-12 flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-6">
                    <Check size={32} />
                  </div>
                  <h4 className="text-2xl font-bold font-display text-white mb-2">Message Sent!</h4>
                  <p className="text-sm text-gray-400 max-w-xs leading-relaxed">
                    Thank you, {formData.name}! Your message has been received. I will get back to you shortly.
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
