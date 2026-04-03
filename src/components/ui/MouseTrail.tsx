import { useEffect, useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';

interface Point {
  x: number;
  y: number;
  id: number;
}

const MouseTrail = () => {
  const [trail, setTrail] = useState<Point[]>([]);
  const [ripple, setRipple] = useState<Point | null>(null);
  const frameRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Throttle to ~60fps max using rAF
    if (frameRef.current) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      const newPoint = { x: e.clientX, y: e.clientY, id: Date.now() };
      setTrail(prev => [newPoint, ...prev].slice(0, 12));
    });
  }, []);

  const handleClick = useCallback((e: MouseEvent) => {
    setRipple({ x: e.clientX, y: e.clientY, id: Date.now() });
    setTimeout(() => setRipple(null), 600);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [handleMouseMove, handleClick]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998]">
      {trail.map((point, i) => (
        <motion.div
          key={point.id + i}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed',
            left: point.x,
            top: point.y,
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #ff66cc, #ff3366)',
            translateX: '-50%',
            translateY: '-50%',
            filter: 'blur(1px)',
          }}
        />
      ))}

      {ripple && (
        <motion.div
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.4 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{
            position: 'fixed',
            left: ripple.x,
            top: ripple.y,
            width: 40,
            height: 40,
            borderRadius: '50%',
            border: '1px solid #ff66cc',
            translateX: '-50%',
            translateY: '-50%',
          }}
        />
      )}
    </div>
  );
};

export default MouseTrail;
