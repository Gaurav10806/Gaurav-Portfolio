import React from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";
import { testimonials } from "../constants";

const FeedbackCard = ({
  index,
  testimonial,
  name,
  designation,
  company,
  image,
}) => (
  <motion.div
    variants={fadeIn("", "spring", index * 0.5, 0.75)}
    className="relative group xs:w-[320px] w-full"
  >
    <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-400 to-gray-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-500 -z-10" />

    <div className="relative bg-black p-6 rounded-lg border border-white border-opacity-30 group-hover:border-opacity-100 hover:shadow-2xl hover:shadow-white/20 transition-all duration-300 backdrop-blur-sm">
      <div className="flex items-start justify-between mb-4">
        <p className="text-gray-400 font-black text-[32px] opacity-40 font-mono">
          {"/*"}
        </p>
        <p className="text-gray-400 font-black text-[32px] opacity-40 font-mono">
          {"*/"}
        </p>
      </div>

      <div className="my-4">
        <p className="text-gray-300 tracking-wider text-[16px] leading-relaxed font-mono">
          {testimonial}
        </p>

        <div className="mt-6 pt-6 border-t border-white border-opacity-30">
          <div className="flex items-center gap-3">
            <div className="flex-1 flex flex-col">
              <p className="text-gray-400 font-bold text-[14px] font-mono">
                <span className="text-white">$</span> {name}
              </p>
              <p className="mt-1 text-gray-400 text-[12px] font-mono opacity-70">
                @ {designation} - {company}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-2 right-4 text-white font-mono text-xs opacity-50">
        [Verified]
      </div>
    </div>
  </motion.div>
);

const Feedbacks = () => {
  return (
    <div className="w-full">
      <motion.div variants={textVariant()} className="mb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-600" />
          <p className="text-gray-400 font-mono text-sm uppercase tracking-widest">
            &gt; community.testimonials()
          </p>
        </div>
        <h2 className={`${styles.sectionHeadText} font-black text-white`}>
          <span className="text-gray-400">{"<"}</span> Testimonials{" "}
          <span className="text-white">{"/"}</span>
          <span className="text-gray-400">{">"}</span>
        </h2>
        <p className="text-gray-400 font-mono text-xs mt-2 opacity-70"></p>
      </motion.div>

      <div className="flex flex-wrap gap-7 justify-center">
        {testimonials.map((testimonial, index) => (
          <FeedbackCard key={testimonial.name} index={index} {...testimonial} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Feedbacks, "");
