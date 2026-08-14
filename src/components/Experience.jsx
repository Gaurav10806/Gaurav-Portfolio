import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { motion } from "framer-motion";

import "react-vertical-timeline-component/style.min.css";

import { styles } from "../styles";
import { experiences } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ experience }) => {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: "#000000",
        color: "#fff",
        boxShadow: "0 4px 20px rgba(255, 255, 255, 0.1)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        borderRadius: "0.5rem",
      }}
      contentArrowStyle={{
        borderRight: "7px solid #000000",
      }}
      date={
        <span className="font-mono text-white font-bold">
          {">"} {experience.date}
        </span>
      }
      iconStyle={{
        background: experience.iconBg,
        boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
        border: "2px solid rgba(255, 255, 255, 0.3)",
      }}
      icon={
        <div className="flex justify-center items-center w-full h-full">
          <img
            src={experience.icon}
            alt={`${experience.company_name} logo`}
            className="w-[60%] h-[60%] object-contain filter brightness-110"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold font-mono">
          <span className="text-white">{"$"}</span> {experience.title}
        </h3>
        <p
          className="text-gray-300 text-[16px] font-semibold font-mono"
          style={{ margin: 0 }}
        >
          @ {experience.company_name}
        </p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
            key={`experience-point-${index}`}
            className="text-gray-300 text-[14px] pl-1 tracking-wider leading-relaxed font-mono"
          >
            <span className="text-white mr-2">#</span> {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  );
};

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-8 bg-gradient-to-b from-gray-400 to-gray-600" />
          <p className="text-gray-400 font-mono text-sm uppercase tracking-widest text-center">
            &gt; career.timeline()
          </p>
        </div>
        <h2
          className={`${styles.sectionHeadText} font-black text-white text-center`}
        >
          <span className="text-gray-400">{"<"}</span> Experience{" "}
          <span className="text-white">{"/"}</span>
          <span className="text-gray-400">{">"}</span>
        </h2>
        <p className="text-gray-400 font-mono text-xs mt-2 opacity-70 text-center"></p>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={`experience-${index}`}
              experience={experience}
            />
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
};

export default SectionWrapper(Experience, "experience");
