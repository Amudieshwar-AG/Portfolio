import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { slideInLeft, slideInRight, fadeInUp } from "@/lib/animations";
import { FileText, ExternalLink, Calendar, MapPin, Users, Award } from "lucide-react";

const Research = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const watermarkY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="research"
      ref={sectionRef}
      className="relative py-28 md:py-36 px-6 md:px-14 overflow-hidden bg-[#0A0A12] border-t border-white/[0.04]"
    >
      {/* Background Watermark */}
      <motion.div
        style={{ y: watermarkY }}
        className="absolute top-10 left-6 font-display text-[15vw] font-bold text-white/[0.02] select-none pointer-events-none leading-none tracking-tighter"
      >
        RESEARCH
      </motion.div>

      {/* Header */}
      <div className="relative z-10 max-w-5xl mx-auto mb-14 md:mb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
        <div>
          <motion.span
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-mono text-xs uppercase tracking-[0.3em] text-[#FAC300] block mb-2"
          >
            // Academic Publication
          </motion.span>
          <motion.h2
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight"
          >
            Research Work
          </motion.h2>
        </div>
        <p className="text-white/50 font-body text-xs md:text-sm max-w-sm">
          Peer-reviewed research exploring federated learning protocols and transformer architectures for clinical decision support.
        </p>
      </div>

      {/* Professional Academic Publication Card */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="relative z-10 max-w-5xl mx-auto rounded-2xl bg-[#0D0D17]/90 border border-white/10 hover:border-[#FAC300]/30 transition-all duration-500 shadow-[0_16px_45px_rgba(0,0,0,0.55)] p-7 md:p-11 backdrop-blur-xl group"
      >
        {/* Header Metadata Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="font-mono text-[11px] md:text-xs font-bold px-3 py-1 rounded-full bg-[#FAC300]/10 border border-[#FAC300]/30 text-[#FAC300] flex items-center gap-1.5 shadow-[0_0_12px_rgba(250,195,0,0.15)]">
              <Award size={13} />
              <span>IEEE Xplore • IDCIoT 2026</span>
            </span>
            <span className="font-mono text-[11px] text-white/50 px-2.5 py-0.5 rounded-md bg-white/[0.03] border border-white/10">
              Peer-Reviewed Conference Paper
            </span>
          </div>

          <div className="flex items-center gap-3 text-white/45 font-mono text-xs">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} className="text-[#FAC300]" />
              February 4, 2026
            </span>
            <span>•</span>
            <span className="text-[#FAC300] font-medium">IEEE Doc ID: 11455807</span>
          </div>
        </div>

        {/* Paper Title */}
        <div className="mb-6">
          <h3 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-[2rem] font-bold text-white tracking-tight leading-snug group-hover:text-[#FAC300] transition-colors duration-300">
            Transformer-Tuned Deep Learning Architecture for Real-Time Medical Diagnosis Using Federated Learning
          </h3>
        </div>

        {/* Conference Citation Banner */}
        <div className="bg-white/[0.03] rounded-xl p-4 md:p-5 border border-white/10 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-white/70">
          <div>
            <span className="text-[#FAC300] font-semibold block mb-0.5">
              2026 4th International Conference on Intelligent Data Communication Technologies and Internet of Things (IDCIoT)
            </span>
            <p className="text-white/60">
              Proceedings published in IEEE Xplore Digital Library
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-white/50 sm:text-right flex-shrink-0">
            <MapPin size={12} className="text-[#FAC300]" />
            <span>JCET, Kerala, India</span>
          </div>
        </div>

        {/* Structured Abstract */}
        <div className="mb-7">
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#FAC300] font-semibold block mb-2">
            Abstract
          </span>
          <p className="font-body text-xs sm:text-sm text-white/75 leading-relaxed">
            This research presents an architectural framework addressing the tradeoff between clinical decision latency and patient data privacy in healthcare systems. By coupling a transformer-tuned deep learning network with privacy-preserving federated learning protocols, the proposed model enables decentralized hospital nodes to collaboratively train robust diagnostic classifiers on real-time clinical telemetry and imaging data without centralizing confidential patient records.
          </p>
        </div>

        {/* Authors, Teammates & Mentorship */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7 pt-5 border-t border-white/[0.08]">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FAC300]/10 border border-[#FAC300]/25 flex items-center justify-center text-[#FAC300] flex-shrink-0">
              <Users size={14} />
            </div>
            <div>
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider block">Authors</span>
              <p className="font-display text-sm font-semibold text-white">Amudieshwar A.G, Chanakyan T</p>
              <p className="font-mono text-[11px] text-white/50">Dept of AI & Data Science, RIT Chennai</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#FAC300]/10 border border-[#FAC300]/25 flex items-center justify-center text-[#FAC300] flex-shrink-0">
              <Award size={14} />
            </div>
            <div>
              <span className="font-mono text-[10px] text-white/40 uppercase tracking-wider block">Research Mentorship</span>
              <p className="font-display text-sm font-semibold text-white">Guided by Shree Makesh N</p>
              <p className="font-mono text-[11px] text-white/50">Faculty Guidance & Review</p>
            </div>
          </div>
        </div>

        {/* Indexing Keywords */}
        <div className="flex flex-wrap gap-1.5 md:gap-2 mb-8">
          {[
            "Federated Learning",
            "Transformer Architectures",
            "Deep Learning",
            "Real-Time Medical Diagnosis",
            "Privacy-Preserving AI",
            "Decentralized Systems",
            "Clinical Telemetry",
          ].map((tag) => (
            <span
              key={tag}
              className="font-mono text-[10px] md:text-xs px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/10 text-white/70"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Single Primary Action: Read on IEEE Xplore */}
        <div className="pt-2">
          <motion.a
            href="https://ieeexplore.ieee.org/document/11455807"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2.5 font-display text-xs md:text-sm font-bold bg-[#FAC300] hover:bg-[#FAC300]/90 text-[#0A0A12] px-6 py-3 rounded-full shadow-[0_4px_20px_rgba(250,195,0,0.25)] transition-all duration-300"
          >
            <FileText size={15} strokeWidth={2.4} />
            <span>Read on IEEE Xplore</span>
            <ExternalLink size={14} strokeWidth={2.4} />
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
};

export default Research;