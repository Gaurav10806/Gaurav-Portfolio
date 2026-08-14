import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const Terminal = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const charIndexRef = useRef(0);
  const lineIndexRef = useRef(0);
  const timerRef = useRef(null);

  const commands = [
    "$ whoami",
    "Divyanshu Mishra",
    "Full-Stack & AI Engineer",
    "Lucknow, Uttar Pradesh, India",
    "",
    "$ cat contact.md",
    "email: divyanshumishra2004@gmail.com",
    "phone: +91-9569533902",
    "portfolio: dvmiz-portfolio.vercel.app",
    "github: github.com/Divyanshu-Mishra9620",
    "",
    "$ git log --experience --oneline",
    "[GSSOC'24] Web Developer Contributor",
    "- Delivered 5+ features and fixed 15+ UI bugs",
    "- Refactored reusable accessible UI modules",
    "- Reduced bundle size by 14%",
    "",
    "$ ls projects/",
    "ai-farmer-assistance/  rag + cv + voice",
    "elysoria-ecommerce/    19k+ products + razorpay",
    "ai-health-assistant/   gemini + langchain rag",
    "",
    "$ cat skills.json",
    "languages: C++ | Python | JavaScript | TypeScript",
    "frontend: React | Next.js | Tailwind CSS",
    "backend: Node.js | Express | Django | HonoJS",
    "systems: REST | WebSockets | Redis | JWT | Vector DBs",
    "",
    "$ ./competitive-programming --stats",
    "1000+ problems solved",
    "CodeChef 1808 | Codeforces 1419 | LeetCode 1721",
    "",
    "$ echo ready_to_build",
    "ready_to_build=true",
  ];

  useEffect(() => {
    const typeNextCharacter = () => {
      const currentLineIndex = lineIndexRef.current;

      if (currentLineIndex >= commands.length) {
        setIsTyping(false);
        return;
      }

      const currentCommand = commands[currentLineIndex];
      const charIndex = charIndexRef.current;

      if (charIndex < currentCommand.length) {
        setDisplayedText((prev) => prev + currentCommand[charIndex]);
        charIndexRef.current += 1;
        timerRef.current = setTimeout(typeNextCharacter, 40);
      } else {
        setDisplayedText((prev) => prev + "\n");
        charIndexRef.current = 0;
        lineIndexRef.current += 1;
        timerRef.current = setTimeout(typeNextCharacter, 300);
      }
    };

    timerRef.current = setTimeout(typeNextCharacter, 300);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative w-full h-full backdrop-blur-md pointer-events-auto"
    >
      <div className="bg-black bg-opacity-70 h-full w-full rounded-lg border-2 border-white border-opacity-50 overflow-hidden shadow-2xl flex flex-col">
        <div className="bg-black bg-opacity-90 px-3 xs:px-4 py-2 xs:py-3 flex items-center gap-2 xs:gap-3 border-b border-white border-opacity-30 flex-shrink-0">
          <div className="flex gap-1 xs:gap-2">
            <div className="w-2 xs:w-3 h-2 xs:h-3 rounded-full bg-red-500 opacity-80" />
            <div className="w-2 xs:w-3 h-2 xs:h-3 rounded-full bg-yellow-500 opacity-80" />
            <div className="w-2 xs:w-3 h-2 xs:h-3 rounded-full bg-green-500 opacity-80" />
          </div>
          <span className="text-gray-300 text-xs xs:text-sm font-mono ml-2">
            terminal@divyanshu ~ portfolio
          </span>
        </div>

        <div className="p-3 xs:p-4 md:p-6 font-mono text-xs xs:text-sm flex-1 overflow-y-auto scrollbar-thin scrollbar-track-black scrollbar-thumb-white">
          <div className="text-white whitespace-pre-wrap break-words leading-relaxed">
            {displayedText}
            {isTyping && <span className="animate-pulse">|</span>}
          </div>
        </div>

        {!isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="px-3 xs:px-4 md:px-6 py-2 xs:py-3 bg-black bg-opacity-50 border-t border-white border-opacity-30 text-white text-xs font-mono flex items-center justify-between flex-shrink-0"
          >
            <span>Status: Ready</span>
            <span className="flex items-center gap-1 xs:gap-2">
              <div className="w-1.5 xs:w-2 h-1.5 xs:h-2 rounded-full bg-green-500 animate-pulse" />
              Active
            </span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default Terminal;
