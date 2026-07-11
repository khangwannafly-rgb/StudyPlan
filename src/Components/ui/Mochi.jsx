import React from "react";
import { motion } from "framer-motion";

/**
 * Mochi Mascot SVG component
 * @param {object} props
 * @param {'happy' | 'studying' | 'sleeping' | 'cheering' | 'thinking'} props.pose - The pose of Mochi.
 * @param {string} props.className - Extra CSS classes.
 * @param {number} props.size - Dimension of the square wrapper (default 120).
 */
export default function Mochi({ pose = "happy", className = "", size = 120 }) {
  // Common colors
  const strokeColor = "#E64A8D";
  const bodyColor = "#FFFFFF";
  const blushColor = "#FFC7DD";
  const flowerColor = "#FF5FA2";
  const leafColor = "#7EE2A8";

  // Base bounce animation
  const bounceTransition = {
    y: {
      duration: 1.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  };

  const renderSVGContent = () => {
    switch (pose) {
      case "studying":
        return (
          <g>
            {/* Shadows */}
            <ellipse cx="60" cy="98" rx="35" ry="6" fill="#F5D8E6" opacity="0.6" />
            
            {/* Body */}
            <motion.path
              d="M25,80 C25,50 35,30 60,30 C85,30 95,50 95,80 C95,95 85,98 60,98 C35,98 25,95 25,80 Z"
              fill={bodyColor}
              stroke={strokeColor}
              strokeWidth="4.5"
              strokeLinejoin="round"
              animate={{ y: [0, -4, 0] }}
              transition={bounceTransition}
            />

            {/* Sprout / Flower on Head */}
            <motion.g 
              transform="translate(60, 30)"
              animate={{ y: [0, -4, 0], rotate: [-2, 2, -2] }}
              transition={bounceTransition}
            >
              <path d="M0,0 Q-8,-15 -2,-18 Q1,-10 0,0" fill={leafColor} stroke={strokeColor} strokeWidth="1.5" />
              <path d="M0,0 Q8,-12 12,-10 Q7,-4 0,0" fill={flowerColor} stroke={strokeColor} strokeWidth="1.5" />
              <circle cx="5" cy="-5" r="2" fill="#FFFFFF" />
            </motion.g>

            {/* Glasses */}
            <g transform="translate(0, 5)">
              <circle cx="43" cy="65" r="10" fill="none" stroke="#2D2230" strokeWidth="3" />
              <circle cx="77" cy="65" r="10" fill="none" stroke="#2D2230" strokeWidth="3" />
              <line x1="53" y1="65" x2="67" y2="65" stroke="#2D2230" strokeWidth="3" />
            </g>

            {/* Eyes behind glasses */}
            <circle cx="43" cy="65" r="2.5" fill="#2D2230" />
            <circle cx="77" cy="65" r="2.5" fill="#2D2230" />

            {/* Cheeks */}
            <ellipse cx="32" cy="74" rx="6" ry="4" fill={blushColor} />
            <ellipse cx="88" cy="74" rx="6" ry="4" fill={blushColor} />

            {/* Determined mouth */}
            <path d="M57,75 Q60,78 63,75" fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />

            {/* Book */}
            <motion.g
              transform="translate(42, 80)"
              animate={{ y: [2, -1, 2] }}
              transition={bounceTransition}
            >
              {/* Left page */}
              <path d="M0,15 C5,10 15,10 18,13 L18,2 L0,4 Z" fill="#FFEAF5" stroke={strokeColor} strokeWidth="3" strokeLinejoin="round" />
              {/* Right page */}
              <path d="M36,15 C31,10 21,10 18,13 L18,2 L36,4 Z" fill="#FFEAF5" stroke={strokeColor} strokeWidth="3" strokeLinejoin="round" />
              {/* Lines in Book */}
              <line x1="4" y1="7" x2="12" y2="6" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
              <line x1="4" y1="10" x2="10" y2="9" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
              <line x1="24" y1="6" x2="32" y2="7" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
              <line x1="26" y1="9" x2="32" y2="10" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
            </motion.g>

            {/* Hands holding book */}
            <path d="M30,86 Q35,84 38,88" fill="none" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" />
            <path d="M90,86 Q85,84 82,88" fill="none" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" />
          </g>
        );

      case "sleeping":
        return (
          <g>
            {/* Shadow */}
            <ellipse cx="60" cy="98" rx="30" ry="5" fill="#F5D8E6" opacity="0.6" />

            {/* Drooping Body */}
            <motion.path
              d="M28,82 C28,55 35,38 60,38 C85,38 92,55 92,82 C92,94 85,98 60,98 C35,98 28,94 28,82 Z"
              fill={bodyColor}
              stroke={strokeColor}
              strokeWidth="4.5"
              strokeLinejoin="round"
              animate={{ scaleY: [1, 0.95, 1], y: [0, 2, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Sleeping Sprout */}
            <motion.g 
              transform="translate(60, 38)"
              animate={{ rotate: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M0,0 Q-5,-10 -2,-12 Q1,-6 0,0" fill={leafColor} stroke={strokeColor} strokeWidth="1.5" />
            </motion.g>

            {/* Closed sleeping eyes */}
            <path d="M40,68 Q45,72 50,68" fill="none" stroke="#2D2230" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M70,68 Q75,72 80,68" fill="none" stroke="#2D2230" strokeWidth="2.5" strokeLinecap="round" />

            {/* Blushing cheeks */}
            <ellipse cx="36" cy="74" rx="5" ry="3" fill={blushColor} opacity="0.8" />
            <ellipse cx="84" cy="74" rx="5" ry="3" fill={blushColor} opacity="0.8" />

            {/* Cute sleeping bubbles / ZZZ */}
            <motion.g
              animate={{ 
                x: [0, -5, 5, 0],
                y: [0, -25, -50, -60],
                opacity: [0, 1, 0.8, 0]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              transform="translate(75, 50)"
            >
              <text x="0" y="0" fill={flowerColor} fontSize="14" fontWeight="bold" fontFamily="'Fredoka'">Z</text>
            </motion.g>
            <motion.g
              animate={{ 
                x: [0, 5, -5, 0],
                y: [0, -20, -35, -45],
                opacity: [0, 1, 0.6, 0]
              }}
              transition={{ duration: 4, delay: 1.8, repeat: Infinity, ease: "linear" }}
              transform="translate(70, 55)"
            >
              <text x="0" y="0" fill={flowerColor} fontSize="10" fontWeight="bold" fontFamily="'Fredoka'">z</text>
            </motion.g>

            {/* Cute sleepy mouth */}
            <ellipse cx="60" cy="76" rx="2.5" ry="3.5" fill="#2D2230" opacity="0.7" />
          </g>
        );

      case "cheering":
        return (
          <g>
            {/* Shadows */}
            <ellipse cx="60" cy="98" rx="36" ry="6" fill="#F5D8E6" opacity="0.6" />

            {/* Animated Happy Body */}
            <motion.path
              d="M24,75 C24,45 34,25 60,25 C86,25 96,45 96,75 C96,92 86,98 60,98 C34,98 24,92 24,75 Z"
              fill={bodyColor}
              stroke={strokeColor}
              strokeWidth="4.5"
              strokeLinejoin="round"
              animate={{ 
                y: [0, -10, 0],
                scaleY: [1, 1.05, 0.95, 1],
              }}
              transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Flower on Head */}
            <motion.g 
              transform="translate(60, 25)"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M0,0 Q-8,-15 -2,-18 Q1,-10 0,0" fill={leafColor} stroke={strokeColor} strokeWidth="1.5" />
              <path d="M0,0 Q8,-12 12,-10 Q7,-4 0,0" fill={flowerColor} stroke={strokeColor} strokeWidth="1.5" />
              <circle cx="5" cy="-5" r="2" fill="#FFFFFF" />
            </motion.g>

            {/* Sparkles around cheering Mochi */}
            <motion.path 
              d="M15,35 L18,40 L15,45 L12,40 Z M100,45 L103,50 L100,55 L97,50 Z" 
              fill="#F9C74F" 
              animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />

            {/* Cheering eyes ^_^ */}
            <path d="M42,58 L48,52 L54,58" fill="none" stroke="#2D2230" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M66,58 L72,52 L78,58" fill="none" stroke="#2D2230" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

            {/* Blush */}
            <ellipse cx="36" cy="67" rx="7" ry="5" fill={blushColor} />
            <ellipse cx="84" cy="67" rx="7" ry="5" fill={blushColor} />

            {/* Big open mouth */}
            <path d="M54,66 C54,66 60,74 66,66 Z" fill="#FF6B8A" stroke={strokeColor} strokeWidth="2.5" strokeLinejoin="round" />

            {/* Raised hands */}
            <motion.path
              d="M18,65 Q10,50 15,45"
              fill="none"
              stroke={strokeColor}
              strokeWidth="4"
              strokeLinecap="round"
              animate={{ rotate: [-20, 20, -20] }}
              transition={{ duration: 0.3, repeat: Infinity }}
            />
            <motion.path
              d="M102,65 Q110,50 105,45"
              fill="none"
              stroke={strokeColor}
              strokeWidth="4"
              strokeLinecap="round"
              animate={{ rotate: [20, -20, 20] }}
              transition={{ duration: 0.3, repeat: Infinity }}
            />
          </g>
        );

      case "thinking":
        return (
          <g>
            {/* Shadow */}
            <ellipse cx="60" cy="98" rx="34" ry="5.5" fill="#F5D8E6" opacity="0.6" />

            {/* Body */}
            <path
              d="M26,80 C26,50 36,32 60,32 C84,32 94,50 94,80 C94,94 84,98 60,98 C36,98 26,94 26,80 Z"
              fill={bodyColor}
              stroke={strokeColor}
              strokeWidth="4.5"
              strokeLinejoin="round"
            />

            {/* Flower on Head */}
            <g transform="translate(60, 32)">
              <path d="M0,0 Q-8,-15 -2,-18 Q1,-10 0,0" fill={leafColor} stroke={strokeColor} strokeWidth="1.5" />
              <path d="M0,0 Q8,-12 12,-10 Q7,-4 0,0" fill={flowerColor} stroke={strokeColor} strokeWidth="1.5" />
            </g>

            {/* Confused / thinking eyes */}
            <circle cx="44" cy="62" r="3.5" fill="#2D2230" />
            <circle cx="76" cy="62" r="3.5" fill="#2D2230" />

            {/* Blush */}
            <ellipse cx="34" cy="70" rx="5" ry="3" fill={blushColor} />
            <ellipse cx="86" cy="70" rx="5" ry="3" fill={blushColor} />

            {/* Mouth: wavy line */}
            <path d="M54,72 Q60,68 66,72" fill="none" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />

            {/* Hand on chin */}
            <path d="M50,86 Q54,82 58,86" fill="none" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" />

            {/* Question marks floating */}
            <motion.text
              x="92"
              y="32"
              fill={flowerColor}
              fontSize="20"
              fontWeight="bold"
              fontFamily="'Fredoka'"
              animate={{ y: [0, -5, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            >
              ?
            </motion.text>
          </g>
        );

      case "happy":
      default:
        return (
          <g>
            {/* Shadows */}
            <ellipse cx="60" cy="98" rx="34" ry="5.5" fill="#F5D8E6" opacity="0.6" />

            {/* Body */}
            <motion.path
              d="M26,80 C26,50 36,32 60,32 C84,32 94,50 94,80 C94,94 84,98 60,98 C36,98 26,94 26,80 Z"
              fill={bodyColor}
              stroke={strokeColor}
              strokeWidth="4.5"
              strokeLinejoin="round"
              animate={{ y: [0, -5, 0] }}
              transition={bounceTransition}
            />

            {/* Sprout / Flower on Head */}
            <motion.g 
              transform="translate(60, 32)"
              animate={{ y: [0, -5, 0] }}
              transition={bounceTransition}
            >
              <path d="M0,0 Q-8,-15 -2,-18 Q1,-10 0,0" fill={leafColor} stroke={strokeColor} strokeWidth="1.5" />
              <path d="M0,0 Q8,-12 12,-10 Q7,-4 0,0" fill={flowerColor} stroke={strokeColor} strokeWidth="1.5" />
              <circle cx="5" cy="-5" r="2" fill="#FFFFFF" />
            </motion.g>

            {/* Cheerful dot eyes */}
            <circle cx="44" cy="62" r="3.5" fill="#2D2230" />
            <circle cx="76" cy="62" r="3.5" fill="#2D2230" />

            {/* Blushing cheeks */}
            <ellipse cx="34" cy="70" rx="6" ry="4" fill={blushColor} />
            <ellipse cx="86" cy="70" rx="6" ry="4" fill={blushColor} />

            {/* Cute smile */}
            <path d="M56,69 Q60,73 64,69" fill="none" stroke={strokeColor} strokeWidth="3.5" strokeLinecap="round" />

            {/* Little waving arm */}
            <motion.path
              d="M92,72 Q105,62 100,56"
              fill="none"
              stroke={strokeColor}
              strokeWidth="4"
              strokeLinecap="round"
              animate={{ rotate: [0, -15, 10, 0] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              style={{ originX: "92px", originY: "72px" }}
            />
            {/* Left arm resting */}
            <path d="M28,74 Q20,78 24,84" fill="none" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" />
          </g>
        );
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 120 120"
        width="100%"
        height="100%"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {renderSVGContent()}
      </svg>
    </div>
  );
}
