import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import { styles } from "../styles";
import Terminal from "./canvas/Terminal";
import AINetworkCanvas from "./canvas/AINetworkCanvas";

const Hero = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Premium Staggered Entrance Animation (120ms delays, 14px y-translation, calm ease-out)
  const fadeUpVariant = (delay) => ({
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Smooth calm ease-out
        delay: delay,
      },
    },
  });

  return (
    <section id="home" className="relative w-full min-h-screen mx-auto overflow-hidden bg-transparent pt-24 pb-16 flex flex-col justify-center">

      {/* Hero Depth Ambient Radial Glow: Soft blue-violet tint behind left content (8-10% opacity, 350px blur) */}
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[350px] bg-gradient-to-tr from-blue-600/10 via-indigo-500/08 to-violet-600/10 rounded-full blur-[140px] pointer-events-none z-[2]" />

      {/* Desktop / Main Layout */}
      {!isMobile && (
        <div className={`max-w-7xl mx-auto w-full ${styles.paddingX} grid grid-cols-12 gap-8 items-center relative z-10 my-auto`}>
          {/* Left Column: Hero Copy (Rebalanced spacing without Resume button) */}
          <div className="col-span-7 flex flex-col items-start relative">
            {/* 1. Greeting (Fade Up 0.00s) */}
            <motion.p
              variants={fadeUpVariant(0.0)}
              initial="hidden"
              animate="show"
              className="text-sm font-mono tracking-widest text-gray-400 uppercase mb-3.5"
            >
              Hi, I'm
            </motion.p>

            {/* 2. Name with surname sheen & thin animated gradient underline (Fade Up 0.12s) */}
            <motion.div
              variants={fadeUpVariant(0.12)}
              initial="hidden"
              animate="show"
              className="relative mb-6"
            >
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[76px] font-extrabold text-[#F8FAFC] tracking-tight leading-[1.05]">
                Gaurav <span className="gradient-heading-text font-extrabold">Soni</span>
              </h1>

              {/* Thin animated gradient underline beneath Gaurav Soni (~140px width, 4.5s slow pulse) */}
              <div className="w-[140px] h-[2px] mt-3.5 bg-gradient-to-r from-violet-500 via-indigo-400 to-blue-500 rounded-full animate-underline-pulse shadow-[0_0_8px_rgba(167,139,250,0.4)]" />
            </motion.div>

            {/* 3. Subtitle Copy with refined color highlights (Fade Up 0.24s) */}
            <motion.div
              variants={fadeUpVariant(0.24)}
              initial="hidden"
              animate="show"
              className="text-lg sm:text-xl md:text-2xl text-gray-300 font-normal leading-relaxed space-y-2 mb-10 max-w-2xl"
            >
              <p>
                Building{" "}
                <span className="text-[#A78BFA] font-medium drop-shadow-[0_0_10px_rgba(167,139,250,0.3)]">
                  AI-powered
                </span>{" "}
                products,
              </p>
              <p>
                <span className="text-[#70A6ED] font-medium drop-shadow-[0_0_10px_rgba(112,166,237,0.3)]">
                  full-stack
                </span>{" "}
                applications,
              </p>
              <p className="text-gray-400">
                and intelligent{" "}
                <span className="bg-gradient-to-r from-[#A78BFA] via-[#7C9DFF] to-[#60A5FA] bg-clip-text text-transparent font-medium drop-shadow-[0_0_10px_rgba(167,139,250,0.25)]">
                  developer tools
                </span>
                .
              </p>
            </motion.div>

            {/* 4. Single View Projects CTA Button (Fade Up 0.36s) */}
            <motion.div
              variants={fadeUpVariant(0.36)}
              initial="hidden"
              animate="show"
              className="flex items-center"
            >
              <a
                href="#work"
                className="group relative inline-flex items-center justify-center px-7 py-3.5 rounded-full text-sm font-semibold text-black bg-white transition-all duration-250 ease-out shadow-[0_0_20px_rgba(255,255,255,0.12)] hover:-translate-y-[2.5px] hover:shadow-[0_4px_20px_rgba(96,165,250,0.25),0_0_25px_rgba(167,139,250,0.2)] active:translate-y-0"
              >
                <span>View Projects</span>
                <svg
                  className="w-4 h-4 ml-2 transition-transform duration-250 group-hover:translate-x-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Right Column: Terminal */}
          <div className="col-span-5 flex items-center justify-center">
            <Terminal />
          </div>
        </div>
      )}

      {/* Mobile Layout (Responsive) */}
      {isMobile && (
        <div className={`w-full ${styles.paddingX} flex flex-col gap-10 relative z-10 py-6`}>
          <div className="flex flex-col items-start relative">
            <motion.p
              variants={fadeUpVariant(0.0)}
              initial="hidden"
              animate="show"
              className="text-xs font-mono tracking-widest text-gray-400 uppercase mb-2"
            >
              Hi, I'm
            </motion.p>

            <motion.div
              variants={fadeUpVariant(0.12)}
              initial="hidden"
              animate="show"
              className="relative mb-4"
            >
              <h1 className="text-4xl xs:text-5xl font-extrabold text-[#F8FAFC] tracking-tight leading-tight">
                Gaurav <span className="gradient-heading-text font-extrabold">Soni</span>
              </h1>
              <div className="w-[110px] h-[2px] mt-2.5 bg-gradient-to-r from-violet-500 via-indigo-400 to-blue-500 rounded-full animate-underline-pulse" />
            </motion.div>

            <motion.div
              variants={fadeUpVariant(0.24)}
              initial="hidden"
              animate="show"
              className="text-base xs:text-lg text-gray-300 font-normal leading-relaxed space-y-1 mb-8"
            >
              <p>
                Building{" "}
                <span className="text-[#A78BFA] font-medium drop-shadow-[0_0_10px_rgba(167,139,250,0.3)]">
                  AI-powered
                </span>{" "}
                products,
              </p>
              <p>
                <span className="text-[#70A6ED] font-medium drop-shadow-[0_0_10px_rgba(112,166,237,0.3)]">
                  full-stack
                </span>{" "}
                applications,
              </p>
              <p className="text-gray-400">
                and intelligent{" "}
                <span className="bg-gradient-to-r from-[#A78BFA] via-[#7C9DFF] to-[#60A5FA] bg-clip-text text-transparent font-medium">
                  developer tools
                </span>
                .
              </p>
            </motion.div>

            <motion.div
              variants={fadeUpVariant(0.36)}
              initial="hidden"
              animate="show"
              className="w-full"
            >
              <a
                href="#work"
                className="inline-flex items-center justify-center w-full xs:w-auto px-7 py-3 rounded-full text-xs font-semibold text-black bg-white transition-all duration-250 ease-out text-center shadow-[0_0_20px_rgba(96,165,250,0.25)] hover:-translate-y-0.5"
              >
                <span>View Projects</span>
                <svg
                  className="w-3.5 h-3.5 ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          </div>

          <div className="w-full">
            <Terminal />
          </div>
        </div>
      )}

      {/* Subtle Scroll Indicator */}
      <div className="absolute bottom-6 w-full hidden md:flex justify-center items-center z-20">
        <a href="#about" aria-label="Scroll to about section">
          <div className="w-6 h-10 rounded-full border border-white/20 bg-white/[0.02] backdrop-blur-sm flex justify-center items-start p-1.5 hover:border-white/40 transition-colors">
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 rounded-full bg-gray-400"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
