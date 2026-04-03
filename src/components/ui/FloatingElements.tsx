import { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const words = ['LUXURY', 'STYLE', 'ELEGANCE', 'PREMIUM', 'EXCLUSIVE', 'ICONIC'];
const shapes = ['★', '●', '◆', '■', '▲'];

// Pre-compute random positions once
const shapePositions = shapes.map((_, i) => ({
  left: ((i * 37 + 13) % 100),
  top: ((i * 53 + 7) % 100),
}));

const FloatingElements = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const memoizedShapes = useMemo(() =>
    shapes.map((shape, i) => ({ shape, ...shapePositions[i] })),
    [],
  );

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {words.map((word, i) => (
        <motion.div
          key={`word-${i}`}
          className="absolute text-6xl md:text-9xl font-black text-black/[0.03] whitespace-nowrap select-none"
          style={{
            left: `${(i * 25) % 100}%`,
            top: `${(i * 20) % 100}%`,
            rotate: i * 15,
            opacity,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, 30, 0],
            rotate: [i * 15, i * 15 + 10, i * 15],
          }}
          transition={{
            duration: 15 + i,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {word}
        </motion.div>
      ))}

      {memoizedShapes.map(({ shape, left, top }, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute text-5xl text-black/[0.05] select-none"
          style={{
            left: `${left}%`,
            top: `${top}%`,
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, 40, 0],
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 10 + i,
            repeat: Infinity,
            delay: i * 1.5,
            ease: 'easeInOut',
          }}
        >
          {shape}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingElements;
