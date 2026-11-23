import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPointerDevice, setIsPointerDevice] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const followerX = useSpring(cursorX, springConfig);
  const followerY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) {
      setIsPointerDevice(false);
      return;
    }
    setIsPointerDevice(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = Boolean(
        target.closest('a, button, input, textarea, select, [role="button"], .interactive')
      );
      setIsHovered(isInteractive);
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleOver);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isPointerDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Primary dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-accent pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isHovered ? 0 : 0.9,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Smooth follower circle */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 border border-accent/40"
        style={{
          x: followerX,
          y: followerY,
          width: isHovered ? 48 : 28,
          height: isHovered ? 48 : 28,
          backgroundColor: isHovered ? 'var(--accent-soft)' : 'transparent',
          backdropFilter: isHovered ? 'blur(1px)' : 'none',
        }}
        transition={{
          width: { duration: 0.2 },
          height: { duration: 0.2 },
          backgroundColor: { duration: 0.2 },
        }}
      />
    </div>
  );
};

