import { useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";

function SpotlightText({
  children,
  colors = "from-purple-500 via-fuchsia-500 to-cyan-400",
  className = "",
}) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const opacity = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    opacity.set(1);
  };

  const handleMouseLeave = () => {
    opacity.set(0);
  };

  const maskImage = useMotionTemplate`radial-gradient(
    circle 80px at ${mouseX}px ${mouseY}px,
    black 0%,
    black 40%,
    transparent 100%
  )`;

  return (
    <span
      className={`relative inline-block cursor-default ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Normal text */}
      <span className="relative z-10 transition-opacity duration-300">
        {children}
      </span>

      {/* Blurred glow/bloom layer */}
      <motion.span
        className={`pointer-events-none select-none selection:bg-transparent selection:text-transparent absolute inset-0 z-20 bg-gradient-to-r ${colors} bg-clip-text text-transparent blur-[8px]`}
        style={{
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
          opacity: opacity,
          transition: "opacity 0.4s ease",
        }}
        aria-hidden="true"
      >
        {children}
      </motion.span>

      {/* Sharp colored text layer */}
      <motion.span
        className={`pointer-events-none select-none selection:bg-transparent selection:text-transparent absolute inset-0 z-30 bg-gradient-to-r ${colors} bg-clip-text text-transparent`}
        style={{
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
          opacity: opacity,
          transition: "opacity 0.3s ease",
        }}
        aria-hidden="true"
      >
        {children}
      </motion.span>
    </span>
  );
}

export default SpotlightText;