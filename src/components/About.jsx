import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <motion.div
    variants={fadeIn("right", "spring", index * 0.5, 0.75)}
    className="xs:w-[240px] w-full relative group"
  >
    <div className="relative bg-black/80 rounded-lg p-6 min-h-[210px] flex justify-center items-center flex-col transition-all duration-300 hover:shadow-lg hover:shadow-white/20 border border-white/20 group-hover:border-white/60 backdrop-blur-sm">
      <div className="mb-4 p-4 rounded-lg bg-white/5 border border-white/15 transition-transform duration-300 group-hover:scale-105">
        <img
          src={icon}
          alt={`${title} icon`}
          className="w-12 h-12 object-contain filter brightness-110"
        />
      </div>

      <h3 className="text-white text-[18px] font-bold text-center font-mono group-hover:text-gray-300 transition-colors duration-300">
        <span className="text-white">{">"}</span> {title}
      </h3>

      <div className="mt-4 w-12 h-px bg-white opacity-30" />
    </div>
  </motion.div>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-600" />
          <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">
            &gt; developer.profile()
          </p>
        </div>
        <h2 className={`${styles.sectionHeadText} font-black text-white`}>
          <span className="text-gray-400">{"<"}</span> About{" "}
          <span className="text-white">{"/"}</span>
          <span className="text-gray-400">{">"}</span>
        </h2>
        <p className="text-gray-400 font-mono text-xs mt-2 opacity-70"></p>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-gray-300 text-[16px] sm:text-[17px] max-w-4xl leading-[30px] font-mono"
      >
        I am a Full-Stack and AI Engineer focused on fast, scalable, useful
        products. I work across Next.js, Node.js, Django, PostgreSQL,
        WebSockets, LangChain, vector databases, and LLM APIs, with a practical
        eye for authentication, caching, search, RAG architecture, and
        performance. My projects include AI farmer assistance, real-time chat,
        ride booking, ecommerce, and health assistant systems.
      </motion.p>

      <div className="mt-14 grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
