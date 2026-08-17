import {
  SiPython,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiTailwindcss,
  SiDocker,
  SiGit,
} from "react-icons/si";
import { FaJava, FaDatabase } from "react-icons/fa6";

// 3 Centered Skill Groups with official brand colors
export const coreSkills = [
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Java", icon: FaJava, color: "#E76F00" },
  { name: "SQL", icon: FaDatabase, color: "#38BDF8" },
];

export const devSkills = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
  { name: "Express.js", icon: SiExpress, color: "#F0F0F0" },
  { name: "Django", icon: SiDjango, color: "#44B78B" },
];

export const toolSkills = [
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Git", icon: SiGit, color: "#F05032" },
];
