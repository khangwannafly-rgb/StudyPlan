import React from "react";
import { motion } from "framer-motion";

export default function SakuraLoading({ size = 80, text = "Loading..." }) {
  const flowerColor = "#FF5FA2";
  const petalColor = "#FFC7DD";

  // Sakura petal path
  const petalPath = "M0,0 C-5,-10 -10,-15 -2,-25 C5,-25 10,-20 8,-12 C7,-4 0,0 0,0 Z";

  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <div className="relative" style={{ width: size, height: size }}>
        
        {/* Central Sakura Flower Spinning */}
        <motion.svg
          viewBox="0 0 100 100"
          width="100%"
          height="100%"
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          {/* Main Flower (5 petals) */}
          <g transform="translate(50, 50)" fill={flowerColor}>
            {[0, 72, 144, 216, 288].map((angle, idx) => (
              <path
                key={idx}
                d="M0,0 C-8,-15 -18,-20 -5,-35 C5,-35 15,-28 10,-18 C7,-6 0,0 0,0 Z"
                transform={`rotate(${angle})`}
                opacity="0.9"
              />
            ))}
            <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
          </g>
        </motion.svg>

        {/* Floating/Drifting Petal 1 */}
        <motion.svg
          viewBox="0 0 40 40"
          width="24"
          height="24"
          className="absolute"
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -30, -50, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "0%", left: "40%" }}
        >
          <path d={petalPath} fill={petalColor} transform="translate(20, 30) scale(0.8)" />
        </motion.svg>

        {/* Floating/Drifting Petal 2 */}
        <motion.svg
          viewBox="0 0 40 40"
          width="20"
          height="20"
          className="absolute"
          animate={{
            x: [0, -25, 10, 0],
            y: [10, -20, -40, 10],
            rotate: [45, 225, 405],
            opacity: [0, 0.9, 0]
          }}
          transition={{ duration: 3.5, delay: 0.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "20%", left: "10%" }}
        >
          <path d={petalPath} fill={petalColor} transform="translate(20, 30) scale(0.6)" />
        </motion.svg>

        {/* Floating/Drifting Petal 3 */}
        <motion.svg
          viewBox="0 0 40 40"
          width="18"
          height="18"
          className="absolute"
          animate={{
            x: [0, 15, 30, 0],
            y: [10, -15, -30, 10],
            rotate: [90, 270, 450],
            opacity: [0, 0.8, 0]
          }}
          transition={{ duration: 2.5, delay: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{ top: "30%", left: "70%" }}
        >
          <path d={petalPath} fill={petalColor} transform="translate(20, 30) scale(0.5)" />
        </motion.svg>

      </div>
      
      {text && (
        <motion.p
          className="text-sm font-bold text-primary-600 mt-4 tracking-wider uppercase font-heading"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}
