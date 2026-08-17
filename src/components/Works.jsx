import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github, externalLink } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import ProjectTerminal from "./canvas/ProjectTerminal";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  deployed_link,
}) => {
  const descriptionLines = description
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && line !== "<br/>");
  const isBulletLine = (line) =>
    line.startsWith("- ") || line.codePointAt(0) === 8226;
  const summaryLines = descriptionLines.filter((line) => !isBulletLine(line));
  const bulletLines = descriptionLines
    .filter(isBulletLine)
    .map((line) =>
      line.codePointAt(0) === 8226 ? line.slice(1).trim() : line.slice(2)
    );

  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="relative bg-black/80 p-5 rounded-lg w-full max-w-[520px] cursor-default transition-all duration-300 hover:shadow-2xl hover:shadow-white/20 border border-white/20 hover:border-white/70 backdrop-blur-sm"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg blur opacity-0 hover:opacity-75 transition duration-500 -z-10" />

        <div className="relative w-full h-[220px] sm:h-[250px] group overflow-hidden rounded-lg">
          <img
            src={image}
            alt={`${name} project screenshot`}
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 border border-gray-500 border-opacity-20"
          />

          <div className="absolute inset-0 flex justify-end m-3 gap-2">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="relative w-10 h-10 rounded-full flex justify-center items-center cursor-pointer bg-black hover:bg-gray-900 transition-all duration-300 hover:scale-110 border-2 border-white shadow-lg group/icon"
              role="button"
              aria-label={`View ${name} GitHub repository`}
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  window.open(source_code_link, "_blank");
                }
              }}
            >
              <img
                src={github}
                alt="GitHub repository"
                className="w-7 h-7 object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
              <div className="absolute bottom-full mb-2 hidden group-hover/icon:block pointer-events-none bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-50">
                View on GitHub
                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
              </div>
            </div>

            {deployed_link && (
              <div
                onClick={() => window.open(deployed_link, "_blank")}
                className="relative w-10 h-10 rounded-full flex justify-center items-center cursor-pointer bg-gradient-to-br from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 transition-all duration-300 hover:scale-110 border-2 border-white shadow-lg shadow-white/30 group/icon"
                role="button"
                aria-label={`View ${name} live demo`}
                tabIndex={0}
                onKeyPress={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    window.open(deployed_link, "_blank");
                  }
                }}
              >
                <img
                  src={externalLink}
                  alt="Live demo"
                  className="w-6 h-6 object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
                <div className="absolute bottom-full mb-2 hidden group-hover/icon:block pointer-events-none bg-black text-white text-xs rounded py-1 px-2 whitespace-nowrap z-50">
                  View Live Demo
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-black"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[20px] font-mono hover:text-gray-300 transition-colors duration-300 flex items-center gap-2">
            <span className="text-white">&gt;</span> {name}
          </h3>
          <div className="mt-3 text-gray-300 text-[14px] leading-relaxed font-mono">
            {summaryLines.map((line, lineIndex) => (
              <span
                key={`${name}-summary-${lineIndex}`}
                className="block mb-2 text-gray-300"
              >
                {line}
              </span>
            ))}

            {bulletLines.length > 0 && (
              <ul className="mt-3 space-y-2">
                {bulletLines.map((line, lineIndex) => (
                  <li
                    key={`${name}-bullet-${lineIndex}`}
                    className="flex gap-2 text-gray-300"
                  >
                    <span className="mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/70" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p
              key={`${name}-${tag.name}`}
              className="text-[13px] font-mono px-3 py-1.5 rounded-md bg-black text-gray-200 border border-white border-opacity-30 transition-all hover:border-white hover:bg-gray-900"
            >
              <span className="text-white">$</span> {tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

const Works = () => {
  const handleScrollToNextProject = (projectName) => {
    const currentIndex = projects.findIndex((p) => p.name === projectName);
    if (currentIndex < projects.length - 1) {
      const nextProjectElement = document.getElementById(
        `project-${projects[currentIndex + 1].name}`
      );
      if (nextProjectElement) {
        nextProjectElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-600" />
          <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">
            03 / PROJECTS
          </p>
        </div>
        <h2 className={`${styles.sectionHeadText} font-black gradient-heading-text`}>
          {"<"} Projects / {">"}
        </h2>
        <p className="text-gray-400 font-mono text-xs mt-2 opacity-70"></p>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-gray-300 text-[17px] max-w-3xl leading-[30px] font-mono"
        >
          A selection of projects I've built across AI engineering, full-stack
          development, and developer-focused systems. Each project highlights
          practical problem-solving, modern technologies, and hands-on
          engineering.
        </motion.p>
      </div>

      <div className="mt-20 w-full">
        {projects.map((project, index) => (
          <motion.div
            key={project.name}
            id={`project-${project.name}`}
            variants={fadeIn("up", "spring", index * 0.2, 0.75)}
            className="mb-12"
          >
            <div className="hidden lg:block relative">
              <div className="lg:grid lg:grid-cols-2 gap-8 items-start">
                <div>
                  <ProjectCard index={index} {...project} />
                </div>

                <div className="absolute top-0 left-1/2 w-1/2 h-full flex items-center pointer-events-none">
                  <svg
                    className="absolute left-0 top-0 w-full h-full"
                    style={{ overflow: "visible" }}
                  >
                    <motion.path
                      d="M 0 60 Q 100 120 200 60"
                      stroke="#ffffff"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="10,5"
                      initial={{ strokeDashoffset: 0 }}
                      animate={{ strokeDashoffset: -15 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <motion.circle
                      cx="200"
                      cy="60"
                      r="5"
                      fill="#d1d5db"
                      animate={{
                        r: [5, 8, 5],
                        opacity: [1, 0.5, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    />
                  </svg>
                </div>

                <div>
                  <ProjectTerminal
                    projectName={project.name}
                    githubLink={project.source_code_link}
                    liveLink={project.deployed_link}
                    isMobile={false}
                    onNext={
                      index < projects.length - 1
                        ? () => handleScrollToNextProject(project.name)
                        : null
                    }
                  />
                </div>
              </div>
            </div>

            <div className="hidden md:block lg:hidden relative">
              <div className="md:grid md:grid-cols-2 gap-6 items-start">
                <div>
                  <ProjectCard index={index} {...project} />
                </div>

                <div className="absolute top-0 left-1/2 w-1/2 h-full flex items-center pointer-events-none">
                  <svg
                    className="absolute left-0 top-0 w-full h-full"
                    style={{ overflow: "visible" }}
                  >
                    <motion.path
                      d="M 0 50 Q 60 100 120 50"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      fill="none"
                      strokeDasharray="8,4"
                      initial={{ strokeDashoffset: 0 }}
                      animate={{ strokeDashoffset: -12 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <motion.circle
                      cx="120"
                      cy="50"
                      r="3"
                      fill="#d1d5db"
                      animate={{
                        r: [3, 5, 3],
                        opacity: [1, 0.5, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                    />
                  </svg>
                </div>

                <div>
                  <ProjectTerminal
                    projectName={project.name}
                    githubLink={project.source_code_link}
                    liveLink={project.deployed_link}
                    isMobile={true}
                    onNext={
                      index < projects.length - 1
                        ? () => handleScrollToNextProject(project.name)
                        : null
                    }
                  />
                </div>
              </div>
            </div>

            <div className="md:hidden flex flex-col gap-6 relative">
              <div>
                <ProjectCard index={index} {...project} />
              </div>

              <div className="flex justify-center h-8 pointer-events-none">
                <svg width="40" height="32" style={{ overflow: "visible" }}>
                  <motion.line
                    x1="20"
                    y1="0"
                    x2="20"
                    y2="32"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeDasharray="5,3"
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -8 }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <motion.circle
                    cx="20"
                    cy="16"
                    r="2"
                    fill="#d1d5db"
                    animate={{
                      cy: [0, 32, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                </svg>
              </div>

              <div>
                <ProjectTerminal
                  projectName={project.name}
                  githubLink={project.source_code_link}
                  liveLink={project.deployed_link}
                  isMobile={true}
                  onNext={
                    index < projects.length - 1
                      ? () => handleScrollToNextProject(project.name)
                      : null
                  }
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Works, "work");
