import React, { useEffect, useRef } from 'react';

export const CursorMesh: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    let mouse = {
      x: width * 0.5,
      y: height * 0.3,
      targetX: width * 0.5,
      targetY: height * 0.3,
      radius: 180,
    };

    // Responsive particle count: lighter on small screens
    const count = Math.floor((width * height) / 38000);
    const particleCount = Math.min(Math.max(count, 35), 75);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      baseX: number;
      baseY: number;
      size: number;
      alpha: number;
    }

    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.8,
        alpha: Math.random() * 0.3 + 0.2,
      });
    }

    let animationFrameId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('resize', onResize);

    const render = () => {
      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      ctx.clearRect(0, 0, width, height);

      // Render subtle radial spotlight at mouse position
      const isDark = document.documentElement.classList.contains('dark');
      const gradient = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        10,
        mouse.x,
        mouse.y,
        mouse.radius * 2
      );
      if (isDark) {
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.07)');
        gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.02)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        gradient.addColorStop(0, 'rgba(37, 99, 235, 0.06)');
        gradient.addColorStop(0.5, 'rgba(37, 99, 235, 0.015)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Update and draw particles & links
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Bounce at boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse displacement repulsion/attraction
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 0.6;
          p.x -= dx * force * 0.05;
          p.y -= dy * force * 0.05;
        }

        // Particle circle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(255, 255, 255, ${p.alpha * 0.4})`
          : `rgba(30, 41, 59, ${p.alpha * 0.25})`;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist2 < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineAlpha = (1 - dist2 / 110) * (isDark ? 0.08 : 0.05);
            ctx.strokeStyle = isDark
              ? `rgba(147, 197, 253, ${lineAlpha})`
              : `rgba(59, 130, 246, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-80 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
};

