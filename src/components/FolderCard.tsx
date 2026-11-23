import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Folder, GitFork, Cpu, Activity, Layers, Tag, ShieldCheck } from 'lucide-react';
import { Project } from '../types/portfolio';
import { useLanguage } from '../context/LanguageContext';

interface FolderCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

// Mini interactive animated previews on hover
const MiniPreview: React.FC<{ projectId: string }> = ({ projectId }) => {
  if (projectId === 'matching-engine') {
    return (
      <div className="w-full h-24 bg-black/40 rounded-lg p-2.5 flex flex-col justify-between font-mono text-[10px] overflow-hidden border border-white/5">
        <div className="flex items-center justify-between text-zinc-400 border-b border-white/5 pb-1">
          <span className="flex items-center gap-1 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            L2 Depth Engine
          </span>
          <span className="text-zinc-500">2.75M ops/s</span>
        </div>
        <div className="grid grid-cols-2 gap-2 my-1">
          {/* Bids */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-emerald-400/90 text-[9px]">
              <span>102.40</span>
              <span>1,240</span>
            </div>
            <div className="w-full bg-zinc-800/80 h-1 rounded overflow-hidden">
              <motion.div
                className="bg-emerald-500 h-full"
                animate={{ width: ['75%', '90%', '65%', '85%'] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              />
            </div>
            <div className="flex justify-between text-emerald-400/80 text-[9px]">
              <span>102.35</span>
              <span>2,850</span>
            </div>
          </div>
          {/* Asks */}
          <div className="flex flex-col gap-1">
            <div className="flex justify-between text-rose-400/90 text-[9px]">
              <span>102.45</span>
              <span>890</span>
            </div>
            <div className="w-full bg-zinc-800/80 h-1 rounded overflow-hidden">
              <motion.div
                className="bg-rose-500 h-full"
                animate={{ width: ['60%', '40%', '80%', '55%'] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              />
            </div>
            <div className="flex justify-between text-rose-400/80 text-[9px]">
              <span>102.50</span>
              <span>3,120</span>
            </div>
          </div>
        </div>
        <div className="text-[9px] text-zinc-500 flex justify-between pt-0.5">
          <span>p50: 167ns</span>
          <span className="text-accent">Zero Heap Alloc</span>
        </div>
      </div>
    );
  }

  if (projectId === 'distributed-rate-limiter') {
    return (
      <div className="w-full h-24 bg-black/40 rounded-lg p-2.5 flex flex-col justify-between font-mono text-[10px] border border-white/5">
        <div className="flex items-center justify-between text-zinc-400 border-b border-white/5 pb-1">
          <span className="text-amber-400 flex items-center gap-1">
            <Activity className="w-3 h-3" />
            Token Bucket Lua
          </span>
          <span className="text-emerald-400">200 OK</span>
        </div>
        <div className="flex items-center gap-2 my-auto">
          <div className="flex-1 bg-zinc-800 h-2 rounded-full overflow-hidden p-0.5">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full"
              animate={{ width: ['90%', '40%', '70%', '100%'] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
            />
          </div>
          <span className="text-zinc-400 text-[10px]">10/10 tks</span>
        </div>
        <div className="text-[9px] text-zinc-500 flex justify-between">
          <span>Atomic Redis Script</span>
          <span>429 Protection</span>
        </div>
      </div>
    );
  }

  if (projectId === 'fairshare') {
    return (
      <div className="w-full h-24 bg-black/40 rounded-lg p-2.5 flex flex-col justify-between font-mono text-[10px] border border-white/5">
        <div className="flex items-center justify-between text-zinc-400 border-b border-white/5 pb-1">
          <span className="text-cyan-400 flex items-center gap-1">
            <Layers className="w-3 h-3" />
            FastAPI WebSockets
          </span>
          <span className="text-zinc-400">Sync: 12ms</span>
        </div>
        <div className="flex items-center justify-between my-auto px-1 text-[10px]">
          <span className="text-zinc-300">Hamilton-Hare Math</span>
          <span className="text-emerald-400 font-bold">0.00¢ Drift</span>
        </div>
        <div className="text-[9px] text-zinc-500 flex justify-between">
          <span>Gemini Vision AI</span>
          <span>Zero-Install PWA</span>
        </div>
      </div>
    );
  }

  if (projectId === 'checkstyle') {
    return (
      <div className="w-full h-24 bg-black/40 rounded-lg p-2.5 flex flex-col justify-between font-mono text-[10px] border border-white/5">
        <div className="flex items-center justify-between text-zinc-400 border-b border-white/5 pb-1">
          <span className="text-purple-400 flex items-center gap-1">
            <GitFork className="w-3 h-3" />
            Checkstyle Core AST
          </span>
          <span className="text-emerald-400">PR #22944</span>
        </div>
        <div className="flex items-center gap-2 my-auto text-[10px] text-zinc-300">
          <span className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
            ANNOTATION
          </span>
          <span>→</span>
          <span className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
            MagicNumberCheck
          </span>
        </div>
        <div className="text-[9px] text-zinc-500 flex justify-between">
          <span>Merged into main</span>
          <span className="text-emerald-400">100% Pitest Mutation</span>
        </div>
      </div>
    );
  }

  // Outfeed default
  return (
    <div className="w-full h-24 bg-black/40 rounded-lg p-2.5 flex flex-col justify-between font-mono text-[10px] border border-white/5">
      <div className="flex items-center justify-between text-zinc-400 border-b border-white/5 pb-1">
        <span className="text-blue-400 flex items-center gap-1">
          <Cpu className="w-3 h-3" />
          Spring Boot + AI Vision
        </span>
        <span className="text-zinc-400">Weather API</span>
      </div>
      <div className="flex items-center justify-between my-auto text-[10px] text-zinc-300">
        <span>Multimodal Wardrobe</span>
        <span className="text-accent">7-Day Scheduling</span>
      </div>
      <div className="text-[9px] text-zinc-500 flex justify-between">
        <span>Clean Architecture</span>
        <span>PostgreSQL</span>
      </div>
    </div>
  );
};

export const FolderCard: React.FC<FolderCardProps> = ({ project, index, onSelect }) => {
  const { language } = useLanguage();
  const isLarge = project.featured;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onClick={() => onSelect(project)}
      className={`group relative flex flex-col rounded-2xl border border-border bg-bg-secondary hover:border-accent/40 transition-all duration-300 cursor-pointer spotlight-card shadow-card-light dark:shadow-card-dark overflow-hidden ${
        isLarge ? 'md:col-span-2' : ''
      }`}
    >
      {/* Editorial Folder Tab Notch Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-border/40 bg-bg-tertiary/40">
        <div className="flex items-center gap-2">
          <Folder className="w-3.5 h-3.5 text-accent" />
          <span className="font-mono text-[11px] font-semibold text-fg-muted uppercase tracking-wider">
            {`[0${index + 1}]`} {project.category[language]}
          </span>
        </div>

        {/* Metric badge in tab */}
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent-soft border border-accent/20 text-accent font-mono text-[11px] font-medium">
          <ShieldCheck className="w-3 h-3" />
          <span>{project.badge.text}</span>
        </div>
      </div>

      {/* Main Folder Content */}
      <div className="p-6 flex flex-col justify-between flex-1 gap-5">
        <div className="flex flex-col gap-2.5">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-fg-primary group-hover:text-accent transition-colors flex items-center gap-2">
              <span>{project.title}</span>
            </h3>
            <div className="p-1.5 rounded-lg border border-border bg-bg-secondary group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all shrink-0">
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>

          <p className="text-sm text-fg-secondary leading-relaxed line-clamp-2 sm:line-clamp-3">
            {project.subtitle[language]}
          </p>
        </div>

        {/* Live Mini Preview Canvas on Hover */}
        <div className="relative overflow-hidden rounded-xl bg-bg-primary border border-border/60 transition-all duration-300">
          <MiniPreview projectId={project.id} />
        </div>

        {/* Bottom Metadata & Tech Tags */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-border/40">
          <div className="flex flex-wrap items-center gap-1.5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-mono text-fg-muted bg-bg-tertiary border border-border/50"
              >
                <Tag className="w-2.5 h-2.5 text-accent/70" />
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="text-[10px] font-mono text-fg-muted">
                +{project.tags.length - 4}
              </span>
            )}
          </div>

          <span className="text-xs font-mono text-accent font-medium group-hover:underline">
            {language === 'en' ? 'Open Case Study →' : 'Abrir Caso de Estudio →'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
