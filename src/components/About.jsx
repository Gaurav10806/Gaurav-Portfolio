import React, { useState } from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";

const cardData = [
  {
    icon: "🤖",
    title: "AI Engineering",
    description:
      "Building intelligent applications using LLMs, RAG, semantic search, and modern AI technologies.",
  },
  {
    icon: "⚙️",
    title: "Full-Stack Development",
    description:
      "Developing scalable web applications with React, Django, Node.js, PostgreSQL, and modern development tools.",
  },
  {
    icon: "🚀",
    title: "Product Mindset",
    description:
      "Creating software focused on usability, performance, clean architecture, and real-world impact.",
  },
  {
    icon: "📚",
    title: "Continuous Learning",
    description:
      "Always exploring new technologies, improving engineering skills, and building better software.",
  },
];

const AboutCard = ({ icon, title, description, index }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, opacity: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  };

  const handleMouseLeave = () => {
    setMousePos((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl border border-white/[0.08] bg-[#0F1117]/60 backdrop-blur-xl p-6 sm:p-7 transition-all duration-[350ms] cubic-bezier(0.16,1,0.3,1) hover:-translate-y-[5px] hover:scale-[1.015] hover:border-purple-500/35 hover:shadow-[0_10px_28px_rgba(139,92,246,0.14)] flex flex-col justify-between overflow-hidden"
    >
      {/* Radial highlight following cursor inside card */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-2xl"
        style={{
          opacity: mousePos.opacity,
          background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(167, 139, 250, 0.12), transparent 80%)`,
        }}
      />

      {/* Subtle Inner Border Glow */}
      <div className="absolute inset-0 rounded-2xl border border-purple-500/0 group-hover:border-purple-500/25 transition-colors duration-[350ms] pointer-events-none" />

      <div className="relative z-10">
        {/* Icon Badge: Increased size ~7% (w-13 h-13 / text-[26px]), scales 1.08 and rotates 4deg on hover */}
        <div className="w-[52px] h-[52px] rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-[26px] mb-5 text-white/90 group-hover:scale-[1.08] group-hover:rotate-[4deg] group-hover:border-purple-400/30 transition-transform duration-[350ms] cubic-bezier(0.16,1,0.3,1)">
          {icon}
        </div>

        {/* Card Title: Increased font size by 2px (text-[20px]), brightens slightly on hover */}
        <h3 className="text-white text-[20px] font-semibold tracking-tight mb-2.5 group-hover:text-white group-hover:brightness-125 transition-all duration-[350ms]">
          {title}
        </h3>

        {/* Card Description */}
        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-normal">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

const About = () => {
  return (
    <div className="relative w-full">
      {/* Soft Ambient Radial Glow behind cards */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[380px] bg-gradient-to-br from-purple-600/08 via-indigo-500/06 to-blue-600/08 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column */}
        <div className="lg:col-span-5 flex flex-col items-start">
          {/* 1. Heading fades in first */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {/* Section Label: 01 / ABOUT */}
            <p className="text-xs font-mono tracking-widest text-gray-400/80 uppercase mb-3 select-none">
              01 / ABOUT
            </p>

            {/* Section Heading: ~75% white with subtle lavender/blue shimmer */}
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-[900] text-white tracking-tight leading-[1.15] mb-4 animate-about-heading">
              Building software that solves real problems.
            </h2>

            {/* Elegant Accent Line: 65px width, 2px height, 20% reduced glow */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: 65, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="h-[2px] bg-gradient-to-r from-[#8B5CF6] to-[#7AA8FF] rounded-full mb-6 shadow-[0_0_6px_rgba(139,92,246,0.35)]"
            />
          </motion.div>

          {/* 2. Paragraph appears with ~40ms delay after heading, max-width ~540px */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.65, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="text-[#C8CCD4] text-[15px] sm:text-[16px] lg:text-[18px] leading-[1.8] space-y-4 font-normal max-w-[540px]"
          >
            <p>
              I'm a Computer Science student passionate about building{" "}
              <strong className="font-bold text-white">AI-powered products</strong>{" "}
              and{" "}
              <strong className="font-bold text-white">
                scalable full-stack applications
              </strong>{" "}
              that solve real-world problems.
            </p>
            <p>
              I enjoy designing intuitive user experiences, building reliable
              backend systems, and exploring technologies like{" "}
              <strong className="font-bold text-white">workflow automation</strong>,{" "}
              <strong className="font-bold text-white">semantic search</strong>, and
              modern AI. I focus on writing{" "}
              <strong className="font-bold text-white">
                clean, maintainable code
              </strong>{" "}
              while continuously improving my engineering skills through hands-on
              projects.
            </p>
            <p>
              I'm currently seeking{" "}
              <strong className="font-bold text-white">
                internship opportunities
              </strong>{" "}
              where I can contribute, learn from experienced engineers, and grow as
              a software developer while building products that create real impact.
            </p>
          </motion.div>
        </div>

        {/* Right Column: 2x2 Glassmorphic Feature Cards Grid (Staggered 120ms delay) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {cardData.map((card, index) => (
            <AboutCard key={card.title} index={index} {...card} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(About, "about");
