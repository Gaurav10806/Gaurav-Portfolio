import { useRef, useEffect, useState } from "react";
import { projects } from "../../constants";

const ProjectsTerminal = ({ isMobile }) => {
  const contentRef = useRef(null);
  const charIndexRef = useRef(0);
  const lineIndexRef = useRef(0);
  const timerRef = useRef(null);
  const [displayedLines, setDisplayedLines] = useState([]);
  const [isComplete, setIsComplete] = useState(false);

  const buildCommands = () => {
    const commands = [
      "$ git fetch --all --projects",
      "remote: Counting objects: 1247, done.",
      "remote: Compressing objects: 100%",
      "[ok] Projects loaded successfully",
      "",
      "$ npm run showcase --details",
      "",
    ];

    projects.forEach((project, index) => {
      commands.push(`[${index + 1}] ${project.name.toUpperCase()}`);
      commands.push(`|-- Description: ${project.description}`);
      commands.push(`|-- Tech: ${project.tags.map((t) => t.name).join(", ")}`);
      commands.push(`|-- Source: ${project.source_code_link}`);
      if (project.deployed_link) {
        commands.push(`\`-- Live: ${project.deployed_link}`);
      }
      commands.push("");
    });

    commands.push("[ok] All projects loaded and ready!");

    return commands;
  };

  const commands = buildCommands();

  useEffect(() => {
    const typeNextCharacter = () => {
      if (lineIndexRef.current < commands.length) {
        const currentLine = commands[lineIndexRef.current];

        if (charIndexRef.current < currentLine.length) {
          setDisplayedLines((prev) => {
            const newLines = [...prev];
            const lastIndex = newLines.length - 1;

            if (lastIndex >= 0) {
              newLines[lastIndex] =
                newLines[lastIndex] + currentLine[charIndexRef.current];
            } else {
              newLines.push(currentLine[charIndexRef.current]);
            }

            return newLines;
          });

          charIndexRef.current += 1;
          timerRef.current = setTimeout(typeNextCharacter, 20);
        } else {
          charIndexRef.current = 0;
          lineIndexRef.current += 1;
          setDisplayedLines((prev) => [...prev, ""]);
          timerRef.current = setTimeout(typeNextCharacter, 150);
        }
      } else {
        setIsComplete(true);
        if (contentRef.current) {
          contentRef.current.scrollTop = contentRef.current.scrollHeight;
        }
      }
    };

    timerRef.current = setTimeout(typeNextCharacter, 300);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      setTimeout(() => {
        contentRef.current.scrollTop = contentRef.current.scrollHeight;
      }, 0);
    }
  }, [displayedLines]);

  return (
    <div
      className={`w-full bg-black rounded-lg border border-white border-opacity-50 overflow-hidden flex flex-col ${
        isMobile ? "h-[500px]" : "h-[600px]"
      }`}
    >
      <div className="bg-black px-3 md:px-4 py-2 md:py-3 flex items-center gap-2 border-b border-white border-opacity-30">
        <div className="flex gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        </div>
        <span className="text-white font-mono text-xs md:text-sm ml-2">
          projects@portfolio - /showcase
        </span>
      </div>

      <div
        ref={contentRef}
        className="flex-1 overflow-y-auto p-3 md:p-4 font-mono text-xs md:text-sm space-y-0"
      >
        {displayedLines.map((line, index) => {
          let lineColor = "text-white";
          let lineClass = "";

          if (line.includes("Description:")) {
            lineColor = "text-gray-300";
            lineClass = "font-semibold";
          } else if (line.includes("Tech:")) {
            lineColor = "text-gray-400";
          } else if (line.includes("Source:") || line.includes("Live:")) {
            lineColor = "text-gray-500";
          } else if (line.match(/^\[\d+\]/)) {
            lineColor = "text-white";
            lineClass = "font-bold text-sm md:text-base";
          } else if (line.includes("[ok]")) {
            lineColor = "text-gray-200";
            lineClass = "font-bold";
          }

          return (
            <div
              key={index}
              className={`${lineColor} ${lineClass} whitespace-pre-wrap break-words leading-relaxed`}
            >
              {line}
              {index === displayedLines.length - 1 && !isComplete && (
                <span className="ml-1 inline-block w-2 h-4 bg-white animate-pulse" />
              )}
            </div>
          );
        })}
      </div>

      {isComplete && (
        <div className="bg-black px-3 md:px-4 py-2 border-t border-white border-opacity-30 text-white font-mono text-xs md:text-sm flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>Ready</span>
        </div>
      )}
    </div>
  );
};

export default ProjectsTerminal;
