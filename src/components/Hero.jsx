import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import { styles } from "../styles";
import { CodeSphereCanvas } from "./canvas";
import Terminal from "./canvas/Terminal";

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

  return (
    <section className="relative w-full min-h-screen mx-auto overflow-hidden bg-gradient-to-b from-black via-gray-950 to-black pt-20">
      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      ></div>

      {!isMobile && (
        <div className="absolute inset-0 w-full h-full flex">
          <div className="w-full md:w-1/2 h-full relative z-0">
            <div className="absolute inset-0 w-full h-full">
              <CodeSphereCanvas />
            </div>
            <div
              className={`absolute inset-0 top-[80px] md:top-[120px] max-w-full ${styles.paddingX} flex flex-row items-start gap-3 md:gap-5 z-10 pointer-events-none`}
            >
              <div className="flex flex-col justify-center items-center mt-5 pointer-events-auto flex-shrink-0">
                <div className="w-4 md:w-5 h-4 md:h-5 rounded-full bg-gradient-to-br from-white via-gray-200 to-gray-400 animate-pulse shadow-xl shadow-white/60" />
                <div className="w-1 h-40 md:h-80 bg-gradient-to-b from-white via-gray-400 to-transparent opacity-80" />
              </div>

              <div className="pointer-events-auto">
                <div className="mb-3">
                  <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-gray-300 text-sm font-mono tracking-wider">
                    &lt; Full-Stack Developer /&gt;
                  </span>
                </div>
                <h1
                  className={`${styles.heroHeadText} bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(255,255,255,0.3)]`}
                >
                  Hi, I'm{" "}
                  <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent font-extrabold">
                    Divyanshu Mishra
                  </span>
                </h1>
                <p
                  className={`${styles.heroSubText} mt-4 text-gray-300 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)] leading-relaxed`}
                >
                  <span className="text-white font-semibold">
                    Full-Stack & AI Engineer
                  </span>{" "}
                  building <br className="hidden md:block" />
                  <span className="text-gray-400">
                    real-time, scalable, and intelligent systems.
                  </span>
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#work"
                    className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-bold text-black font-mono transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-200"
                  >
                    View Projects
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-lg border border-white/30 px-5 py-3 text-sm font-bold text-white font-mono transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
                  >
                    Contact Me
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent z-20 shadow-lg shadow-white/20" />

          <div className="w-full md:w-1/2 h-full flex items-center justify-center p-4 md:p-8 z-10 relative">
            <div className="absolute inset-0 bg-gradient-to-l from-black/50 to-transparent pointer-events-none"></div>
            <Terminal />
          </div>
        </div>
      )}

      {isMobile && (
        <div className="absolute inset-0 w-full h-full flex flex-col overflow-y-auto pt-16">
          <div className="w-full h-1/2 md:h-1/3 relative z-0 flex-shrink-0">
            <div className="absolute inset-0 w-full h-full">
              <CodeSphereCanvas />
            </div>

            <div
              className={`absolute inset-0 top-[40px] max-w-full ${styles.paddingX} flex flex-col items-center justify-center text-center z-10 pointer-events-none`}
            >
              <div className="flex flex-col items-center gap-2 pointer-events-auto">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-white via-gray-200 to-gray-400 animate-pulse shadow-xl shadow-white/60 mb-2" />
                <div className="mb-2">
                  <span className="inline-block px-3 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-gray-300 text-xs font-mono tracking-wider">
                    &lt;Developer/&gt;
                  </span>
                </div>
                <h1 className="font-black bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent text-[28px] xs:text-[36px] leading-tight drop-shadow-[0_4px_20px_rgba(255,255,255,0.3)]">
                  Hi, I'm{" "}
                  <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                    Divyanshu Mishra
                  </span>
                </h1>
                <p className="font-semibold text-[14px] xs:text-[16px] text-gray-300 mt-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] leading-relaxed">
                  <span className="text-white">Full-Stack & AI Engineer</span>
                  <br />
                  <span className="text-gray-400">
                    building real-time, scalable,
                  </span>
                  <br />
                  <span className="text-gray-400">
                    and intelligent systems.
                  </span>
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-3">
                  <a
                    href="#work"
                    className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2.5 text-xs font-bold text-black font-mono"
                  >
                    Projects
                  </a>
                  <a
                    href="#contact"
                    className="inline-flex items-center justify-center rounded-lg border border-white/30 px-4 py-2.5 text-xs font-bold text-white font-mono"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent z-20 flex-shrink-0 shadow-lg shadow-white/20" />

          <div className="w-full h-1/2 md:h-2/3 flex items-center justify-center p-4 z-10 flex-shrink-0 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
            <Terminal />
          </div>
        </div>
      )}

      <div className="absolute bottom-8 w-full hidden md:flex justify-center items-center z-30">
        <a href="#about" aria-label="Scroll to about section">
          <div className="w-[28px] xs:w-[32px] h-[56px] xs:h-[64px] rounded-3xl border-3 border-white/30 bg-white/5 backdrop-blur-sm flex justify-center items-start p-2 hover:border-white hover:bg-white/10 transition-all duration-300 group">
            <motion.div
              animate={{
                y: [0, 16, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-2 xs:w-3 h-2 xs:h-3 rounded-full bg-gradient-to-b from-white to-gray-400 mb-1 group-hover:from-white group-hover:to-white"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
