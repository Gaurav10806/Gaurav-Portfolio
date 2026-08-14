import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Terminal = () => {
  // Step index for initial execution sequence: 0 to 7
  // 0: type `$ whoami`
  // 1: show whoami output (line by line)
  // 2: type `$ focus`
  // 3: show focus output (line by line)
  // 4: type `$ currently_building`
  // 5: show currently_building output (line by line)
  // 6: type `$ status`
  // 7: show status output -> sequence finishes and STAYS AT Open to Internship!
  const [step, setStep] = useState(0);

  // Typed command text
  const [typedWhoami, setTypedWhoami] = useState("");
  const [typedFocus, setTypedFocus] = useState("");
  const [typedBuilding, setTypedBuilding] = useState("");
  const [typedStatus, setTypedStatus] = useState("");

  // Line-by-line output reveal counts for initial commands
  const [whoamiLines, setWhoamiLines] = useState(0);
  const [focusLines, setFocusLines] = useState(0);

  // Helper for typing command text
  const typeText = (text, setFunc, onComplete) => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= text.length) {
        setFunc(text.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 400);
      }
    }, 45);
    return interval;
  };

  // Helper for revealing output line-by-line
  const revealLines = (totalLines, setFunc, onComplete, delayBetween = 220) => {
    let currentLine = 1;
    setFunc(1);

    if (totalLines <= 1) {
      setTimeout(onComplete, 550);
      return;
    }

    const interval = setInterval(() => {
      currentLine++;
      setFunc(currentLine);
      if (currentLine >= totalLines) {
        clearInterval(interval);
        setTimeout(onComplete, 650);
      }
    }, delayBetween);

    return interval;
  };

  // Initial Execution Sequence
  useEffect(() => {
    let timer;

    if (step === 0) {
      // 1. Type `$ whoami`
      timer = typeText("whoami", setTypedWhoami, () => setStep(1));
    } else if (step === 1) {
      // 2. Reveal whoami lines
      timer = revealLines(3, setWhoamiLines, () => setStep(2), 220);
    } else if (step === 2) {
      // 3. Type `$ focus`
      timer = typeText("focus", setTypedFocus, () => setStep(3));
    } else if (step === 3) {
      // 4. Reveal focus lines
      timer = revealLines(4, setFocusLines, () => setStep(4), 180);
    } else if (step === 4) {
      // 5. Type `$ currently_building`
      timer = typeText("currently_building", setTypedBuilding, () => setStep(5));
    } else if (step === 5) {
      // 6. Pause before status
      timer = setTimeout(() => setStep(6), 400);
    } else if (step === 6) {
      // 7. Type `$ status`
      timer = typeText("status", setTypedStatus, () => setStep(7));
    }

    return () => {
      if (typeof timer === "number" || typeof timer === "object") clearTimeout(timer);
    };
  }, [step]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="relative w-full max-w-lg mx-auto pointer-events-auto"
    >
      {/* Outer Glow / Ambient shadow */}
      <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-violet-500/10 blur-xl opacity-60 pointer-events-none" />

      {/* Terminal Container */}
      <div className="relative rounded-xl border border-white/10 bg-[#0F1117]/85 backdrop-blur-xl shadow-2xl overflow-hidden text-left min-h-[380px] flex flex-col justify-between">
        {/* Header */}
        <div className="px-4 py-3 border-b border-white/[0.08] bg-white/[0.02] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
          </div>
          <span className="text-[11px] font-mono tracking-wider text-gray-400 font-medium">
            gaurav@developer ~ profile
          </span>
          <div className="w-10" />
        </div>

        {/* Content Area */}
        <div className="p-5 sm:p-6 font-mono text-xs sm:text-[13px] leading-relaxed text-gray-300 space-y-4 flex-1">
          {/* 1. $ whoami */}
          <div>
            <div className="text-gray-400 font-medium select-none mb-1 flex items-center">
              <span className="text-blue-400 mr-1.5">$</span>
              <span>{typedWhoami}</span>
              {step === 0 && <span className="animate-pulse ml-0.5 inline-block w-1.5 h-3.5 bg-blue-400/80" />}
            </div>
            {step >= 1 && (
              <div className="space-y-0.5">
                {whoamiLines >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-white font-semibold text-sm sm:text-base tracking-tight"
                  >
                    Gaurav Soni
                  </motion.div>
                )}
                {whoamiLines >= 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gray-300"
                  >
                    AI Engineer & Full-Stack Developer
                  </motion.div>
                )}
                {whoamiLines >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 2 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-gray-400 text-xs"
                  >
                    Ahmedabad, India
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* 2. $ focus */}
          {step >= 2 && (
            <div className="border-t border-white/[0.06] pt-3">
              <div className="text-gray-400 font-medium select-none mb-1.5 flex items-center">
                <span className="text-blue-400 mr-1.5">$</span>
                <span>{typedFocus}</span>
                {step === 2 && <span className="animate-pulse ml-0.5 inline-block w-1.5 h-3.5 bg-blue-400/80" />}
              </div>
              {step >= 3 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-gray-300">
                  {focusLines >= 1 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                      <span className="text-violet-400">•</span> AI Products
                    </motion.div>
                  )}
                  {focusLines >= 2 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                      <span className="text-violet-400">•</span> Full-Stack Development
                    </motion.div>
                  )}
                  {focusLines >= 3 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                      <span className="text-violet-400">•</span> Workflow Automation
                    </motion.div>
                  )}
                  {focusLines >= 4 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                      <span className="text-violet-400">•</span> Developer Tools
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 3. $ currently_building */}
          {step >= 4 && (
            <div className="border-t border-white/[0.06] pt-3">
              <div className="text-gray-400 font-medium select-none mb-1.5 flex items-center">
                <span className="text-blue-400 mr-1.5">$</span>
                <span>{typedBuilding}</span>
                {step === 4 && <span className="animate-pulse ml-0.5 inline-block w-1.5 h-3.5 bg-blue-400/80" />}
              </div>
              {step >= 5 && (
                <motion.div
                  initial={{ opacity: 0, y: 2 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-x-5 gap-y-1 text-gray-300"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">•</span> DraftYard
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">•</span> FlowZen
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* 4. $ status */}
          {step >= 6 && (
            <div className="border-t border-white/[0.06] pt-3 flex items-center justify-between">
              <div className="text-gray-400 font-medium select-none flex items-center">
                <span className="text-blue-400 mr-1.5">$</span>
                <span>{typedStatus}</span>
                {step === 6 && <span className="animate-pulse ml-0.5 inline-block w-1.5 h-3.5 bg-blue-400/80" />}
              </div>
              {step >= 7 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Open to Internship
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Terminal;
