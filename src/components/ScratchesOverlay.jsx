import { motion } from "framer-motion";

const ScratchesOverlay = () => {
  // Generate random scratches with varying positions, rotations, and lengths
  const scratches = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    rotation: Math.random() * 360,
    length: 50 + Math.random() * 150,
    width: 0.5 + Math.random() * 2,
    opacity: 0.1 + Math.random() * 0.3,
    delay: Math.random() * 2,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* White scratches */}
      {scratches.map((scratch) => (
        <motion.div
          key={scratch.id}
          className="absolute bg-gradient-to-b from-transparent via-white to-transparent"
          style={{
            top: scratch.top,
            left: scratch.left,
            height: `${scratch.length}px`,
            width: `${scratch.width}px`,
            transform: `rotate(${scratch.rotation}deg)`,
            opacity: scratch.opacity,
            boxShadow: `0 0 3px rgba(255, 255, 255, ${scratch.opacity})`,
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{
            scaleY: 1,
            opacity: scratch.opacity,
          }}
          transition={{
            duration: 0.5,
            delay: scratch.delay,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Diagonal scratches for broken mirror effect */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`diagonal-${i}`}
          className="absolute bg-gradient-to-r from-transparent via-white to-transparent"
          style={{
            top: `${i * 12.5}%`,
            left: 0,
            right: 0,
            height: "1px",
            opacity: 0.05 + Math.random() * 0.1,
            transform: `rotate(${-5 + Math.random() * 10}deg) translateY(${
              Math.random() * 20 - 10
            }px)`,
            boxShadow: "0 0 4px rgba(255, 255, 255, 0.3)",
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Radial cracks from corners */}
      {["top-left", "top-right", "bottom-left", "bottom-right"].map(
        (position, i) => (
          <div
            key={`crack-${position}`}
            className="absolute"
            style={{
              ...(position.includes("top") ? { top: 0 } : { bottom: 0 }),
              ...(position.includes("left") ? { left: 0 } : { right: 0 }),
              width: "30%",
              height: "30%",
            }}
          >
            {[...Array(5)].map((_, j) => (
              <motion.div
                key={j}
                className="absolute bg-gradient-to-br from-white via-white to-transparent"
                style={{
                  ...(position.includes("top") ? { top: 0 } : { bottom: 0 }),
                  ...(position.includes("left") ? { left: 0 } : { right: 0 }),
                  height: "1px",
                  width: `${40 + j * 15}%`,
                  opacity: 0.08,
                  transform: `rotate(${
                    (position.includes("left") ? 1 : -1) *
                    (position.includes("top") ? 1 : -1) *
                    (j * 8)
                  }deg)`,
                  transformOrigin: position.includes("left") ? "left" : "right",
                  boxShadow: "0 0 2px rgba(255, 255, 255, 0.2)",
                }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.8,
                  delay: i * 0.2 + j * 0.1,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        )
      )}

      {/* Shattered glass effect - larger cracks */}
      {[...Array(6)].map((_, i) => {
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const angle = Math.random() * 360;
        const length = 10 + Math.random() * 20;

        return (
          <motion.div
            key={`shatter-${i}`}
            className="absolute"
            style={{
              top: `${startY}%`,
              left: `${startX}%`,
              width: `${length}%`,
              height: "1.5px",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
              transform: `rotate(${angle}deg)`,
              boxShadow: "0 0 3px rgba(255, 255, 255, 0.2)",
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{
              duration: 0.6,
              delay: 0.5 + i * 0.15,
              ease: "easeOut",
            }}
          />
        );
      })}
    </div>
  );
};

export default ScratchesOverlay;
