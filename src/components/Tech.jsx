import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";
import { coreSkills, devSkills, toolSkills } from "../constants/skillsData.jsx";

const SkillCard = ({ name, icon: IconComponent, color, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="group relative flex flex-col items-center justify-between pt-5 pb-6 px-4 rounded-[18px] sm:rounded-[20px] border border-white/10 bg-[#0F1117]/70 backdrop-blur-xl min-h-[155px] sm:min-h-[168px] w-[135px] sm:w-[155px] transition-all duration-300 ease-out hover:-translate-y-[6px] hover:border-purple-500/40 hover:shadow-[0_14px_36px_rgba(139,92,246,0.22)] overflow-hidden flex-shrink-0"
    >
      {/* Soft Purple Glow on Hover */}
      <div className="absolute inset-0 rounded-[18px] sm:rounded-[20px] bg-gradient-to-b from-purple-500/[0.04] to-blue-500/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Floating Container */}
      <motion.div
        animate={{
          y: [0, index % 2 === 0 ? -3 : 3, 0],
        }}
        transition={{
          duration: 4 + (index % 3) * 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="relative z-10 w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
      >
        {/* Fixed Centered Icon Container */}
        <div className="w-12 h-12 flex items-center justify-center transition-all duration-300">
          <IconComponent
            className="w-[42px] h-[42px] object-contain transition-transform duration-300 group-hover:brightness-125"
            style={{ color: color }}
          />
        </div>
      </motion.div>

      {/* Technology Name */}
      <span className="relative z-10 text-[#ECECEC] group-hover:text-white text-[14.5px] sm:text-[15.5px] font-mono font-semibold text-center tracking-tight transition-colors duration-300 mt-2">
        {name}
      </span>

      {/* Thin Purple-Blue Accent Line at bottom on hover */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300 ease-out" />
    </motion.div>
  );
};

const TechGroup = ({ title, skills, startIndex }) => (
  <div className="flex flex-col items-center w-full">
    {/* Category Subheading */}
    <h3 className="text-[15px] sm:text-base font-mono font-bold tracking-[0.2em] text-gray-400/80 uppercase mb-5 select-none text-center">
      // {title}
    </h3>

    {/* Centered Row of Skill Cards */}
    <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 w-full max-w-[1250px] mx-auto">
      {skills.map((tech, idx) => (
        <SkillCard key={tech.name} index={startIndex + idx} {...tech} />
      ))}
    </div>
  </div>
);

const Tech = () => {
  return (
    <div className="relative w-full">
      {/* Section Header */}
      <motion.div variants={textVariant()} className="mb-10 text-left">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-600" />
          <p className="text-gray-400 font-mono text-sm uppercase tracking-widest select-none">
            02 / SKILLS
          </p>
        </div>
        <h2 className={`${styles.sectionHeadText} font-black gradient-heading-text`}>
          {"<"} Skills / {">"}
        </h2>
      </motion.div>

      {/* 3 Centered Groups Stacked Vertically */}
      <div className="flex flex-col items-center gap-12 sm:gap-14 w-full">
        <TechGroup title="CORE" skills={coreSkills} startIndex={0} />
        <TechGroup title="DEVELOPMENT" skills={devSkills} startIndex={4} />
        <TechGroup title="DATA & TOOLS" skills={toolSkills} startIndex={8} />
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "skills");
