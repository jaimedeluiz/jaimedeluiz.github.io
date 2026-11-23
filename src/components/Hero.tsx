import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Mail, Sparkles, Terminal } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';

interface HeroProps {
  onOpenTerminal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  const { language } = useLanguage();
  const { profile } = portfolioData;
  const highlight = profile.heroHighlight[language];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-12 px-6 max-w-6xl mx-auto overflow-hidden"
    >
      {/* Top greeting badge */}
      <div className="flex flex-col gap-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 self-start"
        >
          <span className="px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wide border border-border bg-bg-secondary text-fg-secondary flex items-center gap-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
            <span>{language === 'en' ? "Hi, I'm Jaime" : 'Hola, soy Jaime'}</span>
            <span className="text-border-strong">•</span>
            <span className="text-accent">{profile.title[language]}</span>
          </span>
        </motion.div>

        {/* Main Grid: Left copy, Right editorial portrait slot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Hero Typography */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold tracking-tight text-fg-primary leading-[1.12]"
            >
              {highlight.prefix}
              <span className="font-editorial text-accent italic font-normal px-1 relative inline-block">
                {highlight.highlight1}
                <motion.span
                  className="absolute bottom-1 left-0 right-0 h-[2px] bg-accent/40 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
              {highlight.middle}
              <span className="relative inline-block text-fg-primary font-extrabold underline decoration-accent/40 decoration-wavy decoration-1 underline-offset-8">
                {highlight.highlight2}
              </span>
              {highlight.suffix}
            </motion.h1>

            {/* Concise Summary Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-fg-secondary max-w-2xl leading-relaxed"
            >
              {profile.summary[language]}
            </motion.p>

            {/* Tech badges pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-wrap items-center gap-2.5 pt-1"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-bg-secondary text-fg-muted text-xs font-mono">
                <Sparkles className="w-3.5 h-3.5 text-accent" />
                <span>Java · C++20 · Python · TypeScript</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-bg-secondary text-fg-muted text-xs font-mono">
                <span>React · Spring Boot · FastAPI</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-wrap items-center gap-4 pt-3"
            >
              {/* Primary: Explore Projects */}
              <MagneticButton
                onClick={() => scrollTo('projects')}
                className="group flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-medium text-sm transition-all shadow-md hover:shadow-accent-glow interactive"
              >
                <span>{language === 'en' ? 'Explore projects' : 'Ver proyectos'}</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </MagneticButton>

              {/* Secondary: Contact */}
              <MagneticButton
                onClick={() => scrollTo('contact')}
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-border hover:border-border-strong bg-bg-secondary text-fg-primary font-medium text-sm transition-all hover:bg-bg-tertiary interactive"
              >
                <Mail className="w-4 h-4 text-fg-muted" />
                <span>{language === 'en' ? 'Contact' : 'Contacto'}</span>
              </MagneticButton>

              {/* Terminal quick launcher */}
              {onOpenTerminal && (
                <button
                  onClick={onOpenTerminal}
                  className="flex items-center gap-1.5 px-3.5 py-3 rounded-xl border border-border/80 bg-bg-secondary/60 text-fg-muted hover:text-fg-primary hover:border-border-strong text-xs font-mono transition-colors interactive"
                  title="Open interactive terminal"
                >
                  <Terminal className="w-3.5 h-3.5 text-emerald-500" />
                  <span>terminal</span>
                </button>
              )}
            </motion.div>
          </div>

          {/* Right Column: Editorial Portrait Slot (TODO placeholder) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-4 flex justify-center lg:justify-end"
          >
            <div className="relative group w-full max-w-[280px] sm:max-w-[320px]">
              {/* Decorative background glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-accent/20 to-emerald-500/10 blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Portrait container card */}
              <div className="relative rounded-2xl border border-border bg-bg-secondary overflow-hidden shadow-card-light dark:shadow-card-dark p-3">
                {/* Photo frame placeholder */}
                <div className="relative aspect-[4/5] rounded-xl bg-gradient-to-b from-bg-tertiary to-bg-primary border border-border/60 overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                  {/* Geometric watermark pattern */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-40" />

                  {/* Monogram Badge */}
                  <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-tr from-accent to-blue-400 text-white flex items-center justify-center shadow-lg mb-4 group-hover:scale-105 transition-transform duration-300">
                    <span className="font-editorial text-4xl italic">J</span>
                    <span className="text-xl font-bold font-mono ml-0.5">DL</span>
                  </div>

                  {/* Name and title */}
                  <div className="relative z-10">
                    <p className="font-semibold text-sm text-fg-primary">Jaime de Luiz García</p>
                    <p className="text-xs text-fg-muted font-mono mt-0.5">Software Engineer</p>
                  </div>

                  {/* TODO Note badge */}
                  <div className="relative z-10 mt-5 px-3 py-1.5 rounded-full bg-bg-secondary/90 border border-dashed border-border-strong text-[11px] font-mono text-fg-muted shadow-sm">
                    {/* TODO: Place profile photo in public/photo.jpg */}
                    <span>📷 TODO: Photo slot</span>
                  </div>
                </div>

                {/* Bottom card footer metadata */}
                <div className="mt-3 px-2 py-1.5 flex items-center justify-between text-[11px] text-fg-muted font-mono border-t border-border/60">
                  <span>Málaga, Spain</span>
                  <span className="text-emerald-500 font-medium">Bilingual EN/ES</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="pt-12 flex flex-col items-center justify-center gap-2 text-fg-muted hover:text-fg-primary transition-colors cursor-pointer self-center interactive"
        onClick={() => scrollTo('projects')}
      >
        <span className="text-xs font-mono tracking-widest uppercase">
          {language === 'en' ? 'Scroll to explore' : 'Desliza para explorar'}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-4 h-4 text-accent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

