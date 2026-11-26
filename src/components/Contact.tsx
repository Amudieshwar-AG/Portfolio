import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Copy, Check, Send, Loader2, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { fadeInUp, slideInLeft } from "@/lib/animations";

const Contact = () => {
  const [displayText, setDisplayText] = useState("LET'S TALK");
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef(null);
  const hasScrambled = useRef(false);
  const email = "amudieshwar22@gmail.com";

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Text scramble effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasScrambled.current) {
          hasScrambled.current = true;
          const target = "LET'S TALK";
          const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%&";
          let iteration = 0;
          const interval = setInterval(() => {
            setDisplayText(
              target
                .split("")
                .map((char, i) => {
                  if (i < iteration) return target[i];
                  return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("")
            );
            iteration += 1 / 3;
            if (iteration >= target.length) clearInterval(interval);
          }, 30);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Message from ${formData.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      const result = await response.json();

      if (response.ok || result.success === "true" || result.success === true) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage("Service temporarily unavailable. Please email directly.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Could not connect. You can reach out directly via email.");
    }
  };

  const socials = [
    { label: "GitHub", href: "https://github.com/Amudieshwar-AG/Amudieshwar-AG" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/amudieshwar-a-g/" },
  ];

  return (
    <section id="contact" ref={sectionRef} className="relative py-20 md:py-32 px-5 sm:px-6 md:px-12 overflow-hidden bg-[#0A0A12]">
      {/* Rotating ambient decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 pointer-events-none">
        <motion.div
          className="w-[280px] h-[280px] md:w-[520px] md:h-[520px] rounded-full border border-[#FAC300]/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Giant Header Text */}
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-display text-[13vw] sm:text-[12vw] md:text-[10vw] font-bold leading-none mb-10 md:mb-16 text-white"
        >
          {displayText}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Direct Email & Connect */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col justify-between space-y-10"
          >
            {/* Email Block */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#FAC300] mb-3">
                Direct Email
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href={`mailto:${email}?subject=Opportunity%20%2F%20Collaboration`}
                  className="font-mono text-sm sm:text-lg md:text-xl text-white hover:text-[#FAC300] transition-colors break-all underline decoration-white/20 hover:decoration-[#FAC300] underline-offset-4"
                  title="Click to compose an email"
                >
                  {email}
                </a>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-full border border-white/10 text-muted-foreground hover:text-white hover:border-[#FAC300]/50 transition-colors bg-white/[0.02]"
                >
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.span
                        key="copied"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-1 text-[#FAC300]"
                      >
                        <Check size={12} /> Copied
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-1"
                      >
                        <Copy size={12} /> Copy
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#FAC300] mb-3">
                Connect
              </p>
              <div className="space-y-3">
                {socials.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/70 hover:text-[#FAC300] transition-colors group w-max"
                    whileHover="hover"
                  >
                    <span className="font-body text-base md:text-lg">{s.label}</span>
                    <motion.span variants={{ hover: { x: 5, y: -2 } }} transition={{ type: "spring", stiffness: 300 }}>
                      <ArrowUpRight size={16} />
                    </motion.span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Response Availability Note */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5">
              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                Open for full-time engineering opportunities, freelance projects, and research collaborations. I respond promptly within 24 hours.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Direct Message Box (Circled in reference) */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="relative p-6 sm:p-8 rounded-2xl bg-[#0E0E18]/85 border border-white/10 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
              {/* Subtle Ambient Gold Corner Glow */}
              <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#FAC300]/10 blur-3xl pointer-events-none" />

              {/* Form Title & Subtitle */}
              <div className="mb-6 relative z-10">
                <div className="flex items-center gap-2 font-mono text-[11px] text-[#FAC300] uppercase tracking-widest mb-1.5">
                  <Mail size={13} /> Send a Message
                </div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  Have an idea or opportunity?
                </h3>
                <p className="font-body text-xs text-muted-foreground mt-1">
                  Leave a quick note below and it will land directly in my personal inbox.
                </p>
              </div>

              {/* Success Notification Card */}
              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex flex-col items-center text-center space-y-3 relative z-10"
                >
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="font-display text-lg font-bold text-white">
                    Message Sent Successfully!
                  </h4>
                  <p className="font-body text-xs text-white/70 max-w-sm">
                    Thank you for reaching out. Your message has been forwarded to{" "}
                    <span className="text-[#FAC300] font-mono">{email}</span>. I'll get back to you shortly!
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-2 text-xs font-mono uppercase tracking-wider text-[#FAC300] hover:underline"
                  >
                    Send Another Note
                  </button>
                </motion.div>
              ) : (
                /* The Message Form */
                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                  {/* Name Input */}
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Alex Carter"
                      disabled={status === "sending"}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/20 font-body text-sm focus:outline-none focus:border-[#FAC300] focus:ring-1 focus:ring-[#FAC300] transition-colors disabled:opacity-50"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="alex@company.com"
                      disabled={status === "sending"}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/20 font-body text-sm focus:outline-none focus:border-[#FAC300] focus:ring-1 focus:ring-[#FAC300] transition-colors disabled:opacity-50"
                    />
                  </div>

                  {/* Message Input */}
                  <div>
                    <label className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-1.5">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Hey Amudieshwar, I'd like to discuss a project..."
                      disabled={status === "sending"}
                      className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder:text-white/20 font-body text-sm focus:outline-none focus:border-[#FAC300] focus:ring-1 focus:ring-[#FAC300] transition-colors resize-none disabled:opacity-50"
                    />
                  </div>

                  {/* Error Notification */}
                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-2 text-xs text-red-300"
                    >
                      <AlertCircle size={14} className="shrink-0" />
                      <span>{errorMessage}</span>
                    </motion.div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="w-full py-3.5 px-6 rounded-xl font-mono text-xs uppercase tracking-widest font-bold bg-[#FAC300] hover:bg-[#FFD700] text-black transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(250,195,0,0.25)] hover:shadow-[0_0_30px_rgba(250,195,0,0.45)] disabled:opacity-60 cursor-pointer"
                  >
                    {status === "sending" ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        <span>Sending to Inbox...</span>
                      </>
                    ) : (
                      <>
                        <Send size={14} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] font-mono text-center text-muted-foreground/60 pt-1">
                    Delivered directly to amudieshwar22@gmail.com
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
