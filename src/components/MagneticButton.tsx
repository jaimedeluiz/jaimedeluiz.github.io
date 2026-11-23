import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  strength?: number;
  as?: 'button' | 'a';
  href?: string;
  download?: boolean;
  target?: string;
  rel?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  strength = 0.25,
  as = 'button',
  href,
  download,
  target,
  rel,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const node = ref.current;
    if (!node) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = node.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const x = (clientX - centerX) * strength;
    const y = (clientY - centerY) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const motionProps = {
    animate: { x: position.x, y: position.y },
    transition: { type: 'spring', stiffness: 250, damping: 20, mass: 0.1 },
  };

  const Component = as === 'a' ? motion.a : motion.button;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <Component
        {...(motionProps as any)}
        className={className}
        onClick={onClick}
        href={href}
        download={download}
        target={target}
        rel={rel}
      >
        {children}
      </Component>
    </div>
  );
};

