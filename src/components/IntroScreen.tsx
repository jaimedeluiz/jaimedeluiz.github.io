import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface IntroScreenProps {
  onEnter: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  color: string;
  alpha: number;
}

interface Shockwave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onEnter }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [physicsMode, setPhysicsMode] = useState<'gravity' | 'repel'>('gravity');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouse = {
      x: width * 0.5,
      y: height * 0.5,
      prevX: width * 0.5,
      prevY: height * 0.5,
      speed: 0,
      isDown: false,
    };

    const count = Math.min(Math.floor((width * height) / 10000), 140);
    const particles: Particle[] = [];
    const shockwaves: Shockwave[] = [];

    const colors = [
      '#3B82F6', // Blue
      '#60A5FA', // Light blue
      '#38BDF8', // Cyan
      '#818CF8', // Indigo
      '#F472B6', // Subtle accent pink
    ];

    for (let i = 0; i < count; i++) {
      const r = Math.random() * 2.5 + 1.2;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        radius: r,
        baseRadius: r,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.3,
      });
    }

    let animationId: number;

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - mouse.prevX;
      const dy = e.clientY - mouse.prevY;
      mouse.speed = Math.sqrt(dx * dx + dy * dy);
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const triggerShockwave = (x: number, y: number) => {
      shockwaves.push({
        x,
        y,
        radius: 10,
        maxRadius: Math.min(width, height) * 0.45,
        alpha: 0.85,
      });

      // Scatter particles
      for (const p of particles) {
        const dx = p.x - x;
        const dy = p.y - y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        if (dist < 320) {
          const power = (1 - dist / 320) * 18;
          p.vx += (dx / dist) * power;
          p.vy += (dy / dist) * power;
        }
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      mouse.isDown = true;
      triggerShockwave(e.clientX, e.clientY);
    };

    const onMouseUp = () => {
      mouse.isDown = false;
    };

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onEnter();
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('resize', onResize);
    window.addEventListener('keydown', onKeyDown);

    const render = () => {
      // Trail fade effect for motion blur
      ctx.fillStyle = 'rgba(9, 10, 13, 0.25)';
      ctx.fillRect(0, 0, width, height);

      // Render shockwaves
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.radius += 8;
        sw.alpha *= 0.94;

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(59, 130, 246, ${sw.alpha})`;
        ctx.lineWidth = 2.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius * 0.6, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(56, 189, 248, ${sw.alpha * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        if (sw.alpha < 0.02 || sw.radius > sw.maxRadius) {
          shockwaves.splice(i, 1);
        }
      }

      // Pointer glow aura
      const auraGradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        mouse.isDown ? 280 : 180
      );
      auraGradient.addColorStop(0, mouse.isDown ? 'rgba(59, 130, 246, 0.35)' : 'rgba(59, 130, 246, 0.18)');
      auraGradient.addColorStop(0.5, 'rgba(56, 189, 248, 0.06)');
      auraGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = auraGradient;
      ctx.fillRect(0, 0, width, height);

      // Update & render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Interaction with pointer
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;

        if (dist < 220) {
          const force = (1 - dist / 220) * 0.9;
          if (physicsMode === 'gravity') {
            const angle = Math.atan2(dy, dx) + Math.PI * 0.45;
            p.vx += Math.cos(angle) * force * 0.9 + (dx / dist) * force * 0.6;
            p.vy += Math.sin(angle) * force * 0.9 + (dy / dist) * force * 0.6;
          } else {
            p.vx -= (dx / dist) * force * 2.2;
            p.vy -= (dy / dist) * force * 2.2;
          }
        }

        // Apply friction
        p.vx *= 0.96;
        p.vy *= 0.96;

        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Draw spring web lines to neighbors
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist2 < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(147, 197, 253, ${(1 - dist2 / 100) * 0.22})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [physicsMode, onEnter]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 bg-[#090A0D] text-white flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none cursor-crosshair"
    >
      {/* Interactive Physics Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 w-full h-full" />

      {/* Top Header Bar */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-accent to-blue-400 text-white flex items-center justify-center font-bold text-xs tracking-wider shadow-lg shadow-accent/20">
            JDL
          </div>
          <span className="font-semibold text-sm tracking-tight text-white">
            Jaime de Luiz García
          </span>
        </div>

        {/* Physics mode toggle button */}
        <button
          onClick={() => setPhysicsMode((m) => (m === 'gravity' ? 'repel' : 'gravity'))}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono text-zinc-300 transition-colors backdrop-blur-md"
          title="Switch Pointer Physics"
        >
          <Zap className="w-3.5 h-3.5 text-accent" />
          <span>Mode: {physicsMode === 'gravity' ? 'Vortex Pull' : 'Kinetic Repel'}</span>
        </button>
      </div>

      {/* Center Hero */}
      <div className="relative z-10 max-w-2xl mx-auto text-center flex flex-col items-center gap-6 my-auto">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.08]"
        >
          Jaime de Luiz
          <span className="block font-editorial italic font-normal text-accent text-3xl sm:text-5xl mt-2">
            Software Engineer
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-sm sm:text-base text-zinc-400 max-w-lg leading-relaxed font-sans"
        >
          Welcome to my digital space. Interact with the pointer physics field, or enter to explore projects and case studies.
        </motion.p>

        {/* Enter Portfolio Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="pt-4 flex flex-col items-center gap-3"
        >
          <MagneticButton
            onClick={onEnter}
            strength={0.35}
            className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-accent hover:bg-accent-hover text-white font-medium text-base shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all cursor-pointer backdrop-blur-xl border border-white/20"
          >
            <span>Enter Portfolio</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
          </MagneticButton>

          <span className="text-[11px] font-mono text-zinc-500 flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-zinc-300">Enter</kbd>
            <span>or</span>
            <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/10 text-zinc-300">Space</kbd>
            <span>to open</span>
          </span>
        </motion.div>
      </div>

      {/* Clean bottom anchor */}
      <div className="relative z-10 flex items-center justify-center text-xs font-mono text-zinc-500">
        <span className="opacity-40">© 2026 Jaime de Luiz</span>
      </div>
    </motion.div>
  );
};
