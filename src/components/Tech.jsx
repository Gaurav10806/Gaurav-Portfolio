import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { techSkills } from "../constants/skillsData.jsx";

const SkillCard = ({ name, icon, customIcon, index }) => {
  const CustomIconComponent = customIcon;

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
      className="group relative flex flex-col items-center justify-between pt-5 pb-6 px-4 rounded-[18px] sm:rounded-[20px] border border-white/10 bg-[#0F1117]/70 backdrop-blur-xl min-h-[155px] sm:min-h-[168px] transition-all duration-300 ease-out hover:-translate-y-[6px] hover:border-purple-500/40 hover:shadow-[0_14px_36px_rgba(139,92,246,0.22)] overflow-hidden"
    >
      {/* Soft Purple Glow on Hover */}
      <div className="absolute inset-0 rounded-[18px] sm:rounded-[20px] bg-gradient-to-b from-purple-500/[0.04] to-blue-500/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Floating Async Icon: 2-3px up/down over 4-4.5s */}
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
        className="relative z-10 w-14 h-14 sm:w-14 sm:h-14 flex items-center justify-center transition-transform duration-300"
      >
        {icon ? (
          <img
            src={icon}
            alt={name}
            className="w-14 h-14 sm:w-14 sm:h-14 object-contain filter brightness-100 group-hover:brightness-125 transition-all duration-300"
          />
        ) : (
          <CustomIconComponent />
        )}
      </motion.div>

      {/* Technology Name: Semi-bold (font-semibold = 600), brighter (#ECECEC) */}
      <span className="relative z-10 text-[#ECECEC] group-hover:text-white text-[14.5px] sm:text-[15.5px] font-mono font-semibold text-center tracking-tight transition-colors duration-300 mt-2">
        {name}
      </span>

      {/* Thin Purple-Blue Accent Line at bottom on hover */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-purple-500 to-blue-500 group-hover:w-full transition-all duration-300 ease-out" />
    </motion.div>
  );
};

const Tech = () => {
  return (
    <div className="relative w-full">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-10 text-left"
      >
        {/* Monospace label */}
        <p className="text-xs font-mono tracking-widest text-gray-400/80 uppercase mb-2 select-none">
          02 / TECH STACK
        </p>

        {/* Heading with Hero Purple-Blue Animated Gradient */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight animate-about-heading">
          Skills
        </h2>
      </motion.div>

      {/* Grid: 2 rows x 7 columns on desktop */}
      <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-x-4 sm:gap-x-5 gap-y-6 sm:gap-y-[26px] max-w-[1400px] mx-auto">
        {techSkills.map((tech, index) => (
          <SkillCard key={tech.name} index={index} {...tech} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "skills");
