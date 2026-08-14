import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PageLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-primary"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                },
                scale: {
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-gray-500 to-gray-700"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white text-lg font-semibold"
            >
              Loading Portfolio...
            </motion.p>

            <div className="w-48 h-1 bg-tertiary rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-gray-500 to-gray-700"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PageLoader;
