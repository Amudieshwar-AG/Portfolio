import { useRef, useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Code2, Terminal, Trophy, Zap, RefreshCw, CheckCircle2, UserCheck, Sparkles } from "lucide-react";
import { fadeInUp, slideInLeft, slideInRight } from "@/lib/animations";
import initialCodingStats from "@/data/codingStats.json";

interface CodingStats {
  leetcode: {
    username: string;
    totalSolved: number;
    easy: number;
    medium: number;
    hard: number;
    ranking: number;
    profileUrl: string;
  };
  skillrack: {
    username: string;
    rollNumber?: string;
    branch?: string;
    totalSolved: number;
    codeTracks: number;
    dailyChallenges: number;
    profileUrl: string;
  };
  lastUpdated: string;
}

const CountUp = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || target === 0) {
      setCount(target);
      return;
    }
    const duration = 1500;
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const CodingProfiles = () => {
  const [stats, setStats] = useState<CodingStats>(() => {
    // Check if client has cached synced stats
    if (typeof window !== "undefined") {
      try {
        const cached = localStorage.getItem("portfolio_coding_stats");
        if (cached) {
          const parsed = JSON.parse(cached);
          // ensure skillrack total is from latest data if cached is outdated
          if (parsed && parsed.skillrack && parsed.skillrack.totalSolved === 46) {
            return parsed;
          }
        }
      } catch (e) {
        // ignore storage errors
      }
    }
    return initialCodingStats as CodingStats;
  });

  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<"idle" | "success" | "error">("idle");
  const [lastSyncText, setLastSyncText] = useState<string>("Auto-synced");

  const totalCombined = stats.leetcode.totalSolved + stats.skillrack.totalSolved;

  // Format date display
  useEffect(() => {
    if (stats.lastUpdated) {
      const d = new Date(stats.lastUpdated);
      setLastSyncText(`Updated ${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`);
    }
  }, [stats.lastUpdated]);

  // Real-time manual sync function
  const handleManualSync = async () => {
    if (isSyncing) return;
    setIsSyncing(true);
    setSyncStatus("idle");

    try {
      // 1. Fetch live LeetCode stats via high-availability CORS-enabled API
      const res = await fetch(`https://alfa-leetcode-api.onrender.com/userProfile/${stats.leetcode.username}`);
      let newLeetCode = stats.leetcode;

      if (res.ok) {
        const data = await res.json();
        if (typeof data.totalSolved === "number") {
          newLeetCode = {
            ...stats.leetcode,
            totalSolved: data.totalSolved,
            easy: data.easySolved || 0,
            medium: data.mediumSolved || 0,
            hard: data.hardSolved || 0,
            ranking: data.ranking || stats.leetcode.ranking,
          };
        }
      }

      // 2. Updated combined stats
      const updated: CodingStats = {
        ...stats,
        leetcode: newLeetCode,
        lastUpdated: new Date().toISOString(),
      };

      setStats(updated);
      try {
        localStorage.setItem("portfolio_coding_stats", JSON.stringify(updated));
      } catch (e) {
        // ignore storage error
      }

      setSyncStatus("success");
      setLastSyncText("Synced just now");

      setTimeout(() => {
        setSyncStatus("idle");
      }, 3000);
    } catch {
      setSyncStatus("error");
      setTimeout(() => setSyncStatus("idle"), 3000);
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <section id="coding" className="relative py-28 px-6 md:px-12 bg-[#0A0A12] text-white overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-[#FAC300]/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 right-10 w-96 h-96 bg-[#FAC300]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex items-center gap-2 mb-3"
            >
              <Terminal size={14} className="text-[#FAC300]" />
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#FAC300] font-bold">
                // Problem Solving
              </span>
            </motion.div>

            <motion.h2
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white"
            >
              Competitive Programming & DSA
            </motion.h2>
          </div>

          {/* Controls: Live Status & Manual Sync Button */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center gap-3 flex-wrap"
          >
            {/* Live Indicator Pill */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="font-mono text-[11px] text-white/70 tracking-wider">
                {lastSyncText}
              </span>
            </div>

            {/* Manual Sync Button */}
            <button
              onClick={handleManualSync}
              disabled={isSyncing}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAC300]/10 hover:bg-[#FAC300]/20 active:scale-95 border border-[#FAC300]/30 hover:border-[#FAC300]/60 text-[#FAC300] font-mono text-xs tracking-wider font-bold transition-all duration-300 shadow-[0_2px_12px_rgba(250,195,0,0.15)] disabled:opacity-50 cursor-pointer group"
              title="Click for instant live stats refresh"
            >
              <RefreshCw
                size={13}
                className={`transition-transform duration-500 ${isSyncing ? "animate-spin text-white" : "group-hover:rotate-180"}`}
              />
              <span>
                {isSyncing ? "Syncing..." : syncStatus === "success" ? "Synced!" : "Sync Now"}
              </span>
            </button>
          </motion.div>
        </div>

        {/* Total Metric Overview Banner */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 p-6 md:p-8 rounded-2xl bg-gradient-to-r from-white/[0.04] via-white/[0.02] to-transparent border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FAC300]/10 border border-[#FAC300]/30 flex items-center justify-center text-[#FAC300] shrink-0">
              <Zap size={22} />
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Total Solved Across Platforms
              </p>
              <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white">
                <CountUp target={totalCombined} suffix="+" /> Programs & DSA Solved
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs font-mono text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFA116]" />
              <span>LeetCode: <strong className="text-white">{stats.leetcode.totalSolved}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FAC300]" />
              <span>SkillRack: <strong className="text-white">{stats.skillrack.totalSolved}</strong></span>
            </div>
          </div>
        </motion.div>

        {/* Platform Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ========================================================= */}
          {/* LEETCODE CARD                                            */}
          {/* ========================================================= */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group relative p-7 sm:p-9 rounded-2xl bg-[#0E0E18]/85 border border-white/10 backdrop-blur-xl hover:border-[#FFA116]/40 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between"
          >
            {/* Top Glow on hover */}
            <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-[#FFA116]/5 group-hover:bg-[#FFA116]/10 blur-3xl transition-colors pointer-events-none" />

            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#FFA116]/10 border border-[#FFA116]/25 flex items-center justify-center text-[#FFA116]">
                    <Code2 size={20} />
                  </div>
                  <div>
                    <h4 className="font-display text-xl font-bold text-white group-hover:text-[#FFA116] transition-colors">
                      LeetCode
                    </h4>
                    <p className="font-mono text-xs text-muted-foreground">
                      @{stats.leetcode.username}
                    </p>
                  </div>
                </div>

                <a
                  href={stats.leetcode.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white/70 hover:text-white hover:border-[#FFA116]/50 transition-colors"
                  title="Open LeetCode Profile"
                >
                  <ArrowUpRight size={16} />
                </a>
              </div>

              {/* Big Counter */}
              <div className="mb-6">
                <div className="font-display text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
                  <CountUp target={stats.leetcode.totalSolved} />
                </div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-1">
                  Problems Solved
                </p>
              </div>

              {/* Difficulty Breakdown Pills */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {/* Easy */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[11px] text-emerald-400 font-semibold">Easy</span>
                    <span className="font-mono text-xs font-bold text-white">{stats.leetcode.easy}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-emerald-400 rounded-full"
                      style={{ width: `${stats.leetcode.totalSolved ? (stats.leetcode.easy / stats.leetcode.totalSolved) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                {/* Medium */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[11px] text-amber-400 font-semibold">Medium</span>
                    <span className="font-mono text-xs font-bold text-white">{stats.leetcode.medium}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full"
                      style={{ width: `${stats.leetcode.totalSolved ? (stats.leetcode.medium / stats.leetcode.totalSolved) * 100 : 0}%` }}
                    />
                  </div>
                </div>

                {/* Hard */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[11px] text-rose-400 font-semibold">Hard</span>
                    <span className="font-mono text-xs font-bold text-white">{stats.leetcode.hard}</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full bg-rose-400 rounded-full"
                      style={{ width: `${stats.leetcode.totalSolved ? (stats.leetcode.hard / stats.leetcode.totalSolved) * 100 : 0}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Profile CTA */}
            <a
              href={stats.leetcode.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-full py-3 px-4 rounded-xl bg-white/[0.03] hover:bg-[#FFA116]/10 border border-white/10 hover:border-[#FFA116]/40 text-white/80 hover:text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn"
            >
              <span>View LeetCode Profile</span>
              <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>

          {/* ========================================================= */}
          {/* SKILLRACK CARD (Verified Student Profile)                 */}
          {/* ========================================================= */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="group relative p-7 sm:p-9 rounded-2xl bg-[#0E0E18]/85 border border-white/10 backdrop-blur-xl hover:border-[#FAC300]/40 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between"
          >
            {/* Top Glow on hover */}
            <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-[#FAC300]/5 group-hover:bg-[#FAC300]/10 blur-3xl transition-colors pointer-events-none" />

            <div>
              {/* Card Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#FAC300]/10 border border-[#FAC300]/25 flex items-center justify-center text-[#FAC300]">
                    <Trophy size={20} />
                  </div>
                  <div>
                    <h4 className="font-display text-xl font-bold text-white group-hover:text-[#FAC300] transition-colors">
                      SkillRack
                    </h4>
                    <p className="font-mono text-xs text-muted-foreground">
                      {stats.skillrack.username} • {stats.skillrack.branch || "AI"}
                    </p>
                  </div>
                </div>

                <a
                  href={stats.skillrack.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-white/70 hover:text-white hover:border-[#FAC300]/50 transition-colors"
                  title="Open SkillRack Profile"
                >
                  <ArrowUpRight size={16} />
                </a>
              </div>

              {/* Big Counter: Verified 46 Programs Solved */}
              <div className="mb-6">
                <div className="font-display text-5xl sm:text-6xl font-extrabold text-[#FAC300] tracking-tight">
                  <CountUp target={stats.skillrack.totalSolved} />
                </div>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-1">
                  Programs Solved
                </p>
              </div>

              {/* Verified Profile Credentials Grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                    <UserCheck size={13} className="text-[#FAC300]" />
                    <span className="font-mono text-[11px]">Roll Number</span>
                  </div>
                  <p className="font-mono text-sm font-bold text-white truncate" title={stats.skillrack.rollNumber || "2117240070018"}>
                    {stats.skillrack.rollNumber || "2117240070018"}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5">
                  <div className="flex items-center gap-2 mb-1 text-muted-foreground">
                    <Sparkles size={13} className="text-[#FAC300]" />
                    <span className="font-mono text-[11px]">Branch / Track</span>
                  </div>
                  <p className="font-mono text-sm font-bold text-white truncate" title={stats.skillrack.branch || "Artificial Intelligence"}>
                    AI & Data Science
                  </p>
                </div>
              </div>
            </div>

            {/* Profile CTA */}
            <a
              href={stats.skillrack.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 w-full py-3 px-4 rounded-xl bg-white/[0.03] hover:bg-[#FAC300]/10 border border-white/10 hover:border-[#FAC300]/40 text-white/80 hover:text-white font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-300 flex items-center justify-center gap-2 group/btn"
            >
              <span>View SkillRack Profile</span>
              <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CodingProfiles;
