import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { github } from "../assets";

const GithubStats = () => {
  return (
    <div className="w-screen relative left-[calc(-50vw+50%)] px-0 md:px-0 bg-transparent">
      <div className="w-full bg-transparent relative overflow-hidden py-0">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(0deg, transparent 24%, rgba(145, 94, 255, 0.15) 25%, rgba(145, 94, 255, 0.15) 26%, transparent 27%, transparent 74%, rgba(145, 94, 255, 0.15) 75%, rgba(145, 94, 255, 0.15) 76%, transparent 77%, transparent),
                linear-gradient(90deg, transparent 24%, rgba(0, 212, 255, 0.15) 25%, rgba(0, 212, 255, 0.15) 26%, transparent 27%, transparent 74%, rgba(0, 212, 255, 0.15) 75%, rgba(0, 212, 255, 0.15) 76%, transparent 77%, transparent)
              `,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 px-5 sm:px-10 py-1 sm:py-2 flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* GitHub Section Heading */}
          <motion.div variants={textVariant()} className="mb-6 flex flex-col items-center text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-600" />
              <p className="text-gray-400 font-mono text-sm uppercase tracking-widest select-none">
                04 / GITHUB
              </p>
            </div>
            <h2 className={`${styles.sectionHeadText} font-black gradient-heading-text`}>
              {"<"} GitHub / {">"}
            </h2>
          </motion.div>

          {/* Centered Sentence & Visit Button */}
          <motion.div
            variants={fadeIn("up", "spring", 0.2, 0.75)}
            className="flex flex-col items-center gap-6"
          >
            <p className="text-gray-300 font-mono text-[16px] sm:text-[18px] max-w-2xl leading-relaxed">
              Explore my projects, code, experiments, and ongoing development work on GitHub.
            </p>

            <a
              href="https://github.com/Gaurav10806"
              target="_blank"
              rel="noopener noreferrer"
              className="relative group mt-2 inline-flex items-center justify-center"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-400 via-gray-200 to-gray-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-500" />
              <div className="relative bg-black border border-white/40 group-hover:border-white px-8 py-3.5 rounded-lg backdrop-blur-sm flex items-center gap-3 transition-all duration-300 group-hover:-translate-y-0.5 shadow-xl font-mono text-white font-semibold text-base sm:text-lg">
                <img
                  src={github}
                  alt="GitHub icon"
                  className="w-6 h-6 object-contain"
                  style={{ filter: "brightness(0) invert(1)" }}
                />
                <span>Visit My GitHub &rarr;</span>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(GithubStats, "github");
