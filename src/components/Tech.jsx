import React from "react";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  return (
    <div className="w-full">
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-600" />
          <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">
            &gt; system.loadTechnologies()
          </p>
        </div>
        <h2 className="text-[30px] xs:text-[38px] sm:text-[46px] md:text-[56px] leading-tight font-black text-white font-mono">
          <span className="text-gray-400">{"<"}</span> Skills{" "}
          <span className="text-white">{"/"}</span>
          <span className="text-gray-400">{">"}</span>
        </h2>
        <p className="text-gray-400 font-mono text-xs mt-2 opacity-70"></p>
      </div>

      <div
        id="tech-section"
        className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4 sm:gap-5 p-4 sm:p-6 rounded-lg border border-white/20 bg-black/70 backdrop-blur-sm"
      >
        {technologies.map((technology) => (
          <div
            className="min-h-[132px] transition-transform duration-300 hover:-translate-y-1 group relative flex flex-col items-center justify-center gap-3 rounded-lg border border-white/15 bg-white/[0.03] px-3 py-4"
            key={technology.name}
            title={technology.name}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg blur opacity-0 group-hover:opacity-40 transition duration-500" />

            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src={technology.icon}
                alt={technology.name}
                className="w-14 h-14 object-contain filter brightness-100 group-hover:brightness-125 transition-all duration-300"
              />
            </div>

            <div className="relative text-gray-300 font-mono text-xs text-center leading-snug">
              {technology.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Tech, "");
