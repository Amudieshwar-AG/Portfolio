import { motion } from "framer-motion";
import { Sparkles, Infinity, BarChart2, FileSpreadsheet, Database } from "lucide-react";

// Subtle floating particles background
const Particles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#EAB308]/20 rounded-full"
          initial={{
            x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1000),
          }}
          animate={{
            y: [null, Math.random() * -500],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const skillCategories = [
  {
    title: "Programming Languages",
    skills: [
      { name: "Java", iconClass: "devicon-java-plain colored", icon: null, customColor: "" },
      { name: "Python", iconClass: "devicon-python-plain colored", icon: null, customColor: "" },
      { name: "SQL", iconClass: "", icon: Database, customColor: "text-purple-500" },
      { name: "C++", iconClass: "devicon-cplusplus-plain colored", icon: null, customColor: "" },
    ],
  },
  {
    title: "AI & Machine Learning",
    tag: "Worked With",
    skills: [
      { name: "GenAI", iconClass: "", icon: Sparkles, customColor: "text-indigo-400" },
      { name: "TensorFlow", iconClass: "devicon-tensorflow-original colored", icon: null, customColor: "" },
      { name: "PyTorch", iconClass: "devicon-pytorch-original colored", icon: null, customColor: "" },
    ],
  },
  {
    title: "Web Development (Frontend)",
    tag: "Worked With",
    skills: [
      { name: "HTML5", iconClass: "devicon-html5-plain colored", icon: null, customColor: "" },
      { name: "CSS", iconClass: "devicon-css3-plain colored", icon: null, customColor: "" },
      { name: "JavaScript", iconClass: "devicon-javascript-plain colored", icon: null, customColor: "" },
      { name: "TypeScript", iconClass: "devicon-typescript-plain colored", icon: null, customColor: "" },
      { name: "React.js", iconClass: "devicon-react-original colored", icon: null, customColor: "" },
      { name: "Tailwind", iconClass: "devicon-tailwindcss-original colored", icon: null, customColor: "" },
    ],
  },
  {
    title: "Web Development (Backend)",
    tag: "Worked With",
    skills: [
      { name: "Node.js", iconClass: "devicon-nodejs-plain colored", icon: null, customColor: "" },
      { name: "Flask", iconClass: "devicon-flask-original colored", icon: null, customColor: "" },
      { name: "FastAPI", iconClass: "devicon-fastapi-plain colored", icon: null, customColor: "" },
      { name: "Spring Boot", iconClass: "devicon-spring-original colored", icon: null, customColor: "" },
    ],
  },
  {
    title: "Mobile App Development",
    tag: "Worked With",
    skills: [
      { name: "Flutter", iconClass: "devicon-flutter-plain colored", icon: null, customColor: "" },
      { name: "Android Studio", iconClass: "devicon-androidstudio-plain colored", icon: null, customColor: "" },
      { name: "Firebase", iconClass: "devicon-firebase-plain colored", icon: null, customColor: "" },
    ],
  },
  {
    title: "Tools & Environments",
    tag: "Worked With",
    skills: [
      { name: "Git", iconClass: "devicon-git-plain colored", icon: null, customColor: "" },
      { name: "GitHub", iconClass: "devicon-github-original", icon: null, customColor: "text-white" },
      { name: "VS Code", iconClass: "devicon-vscode-plain colored", icon: null, customColor: "" },
      { name: "Eclipse", iconClass: "devicon-eclipse-plain colored", icon: null, customColor: "" },
      { name: "Jupyter", iconClass: "devicon-jupyter-plain colored", icon: null, customColor: "" },
      { name: "Colab", iconClass: "", icon: Infinity, customColor: "text-orange-500" },
      { name: "Figma", iconClass: "devicon-figma-plain colored", icon: null, customColor: "" },
      { name: "PowerBI", iconClass: "", icon: BarChart2, customColor: "text-yellow-500" },
      { name: "Excel", iconClass: "", icon: FileSpreadsheet, customColor: "text-green-600" },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="relative py-32 px-6 md:px-12 bg-gradient-to-b from-[#030712] to-[#071426] text-white overflow-hidden">
      <Particles />
      
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#EAB308]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#EAB308]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#EAB308] font-mono text-sm md:text-base tracking-widest uppercase mb-4 font-semibold shadow-sm"
          >
            AI & Data Science Engineer | GenAI | Machine Learning | Full Stack Developer
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight"
          >
            Technical Arsenal
          </motion.h2>
        </div>

        <div className="flex flex-col gap-20">
          {skillCategories.map((category, i) => (
            <motion.div 
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex flex-col gap-8"
            >
              {/* Category Title */}
              <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                <div className="w-2 h-8 bg-gradient-to-b from-[#EAB308] to-[#EAB308]/30 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-wide text-white/90">
                    {category.title}
                  </h3>
                  {category.tag && (
                    <span className="font-mono text-xs md:text-sm text-[#EAB308] bg-[#EAB308]/10 border border-[#EAB308]/30 px-3 py-1 rounded-full font-medium tracking-wider uppercase">
                      {category.tag}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Skills Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {category.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative flex flex-col items-center justify-center gap-5 p-6 bg-[#0B101A] backdrop-blur-xl rounded-[24px] border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-white/10 hover:bg-[#0F1623] hover:shadow-[0_8px_32px_rgba(255,255,255,0.05)] overflow-hidden cursor-default"
                  >
                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-shimmer" />

                    {/* Icon */}
                    <div className="relative z-10 text-5xl transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
                      {skill.iconClass ? (
                        <i className={skill.iconClass} />
                      ) : (
                        skill.icon && <skill.icon size={48} className={skill.customColor || "text-white"} />
                      )}
                    </div>
                    {/* Label */}
                    <span className="relative z-10 text-sm md:text-base font-medium tracking-wide text-gray-300 group-hover:text-white transition-colors duration-300 text-center">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
