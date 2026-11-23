import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { SmoothScrollProvider } from './components/SmoothScroll';
import { CustomCursor } from './components/CustomCursor';
import { CursorMesh } from './components/CursorMesh';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { IntroScreen } from './components/IntroScreen';

const PortfolioContent: React.FC = () => {
  const { language } = useLanguage();
  const [activeSection, setActiveSection] = useState('home');
  // Initial entrance screen where visitors can play with the pointer
  const [showIntro, setShowIntro] = useState(true);

  // Track active section for navbar indicator
  useEffect(() => {
    if (showIntro) return;
    const sectionIds = ['home', 'projects', 'about', 'experience', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showIntro]);

  const handleOpenCommandPalette = () => {
    const event = new CustomEvent('toggle-cmdk');
    window.dispatchEvent(event);
  };

  return (
    <div className="relative min-h-screen bg-bg-primary text-fg-primary selection:bg-accent-soft selection:text-fg-accent">
      {/* Interactive Initial Screen */}
      <AnimatePresence>
        {showIntro && <IntroScreen onEnter={() => setShowIntro(false)} />}
      </AnimatePresence>

      {/* Background Interactive Mesh */}
      <CursorMesh />

      {/* Progress Bar & Custom Cursor */}
      <ScrollProgressBar />
      <CustomCursor />

      {/* Navigation Header */}
      <Navbar
        onOpenCommandPalette={handleOpenCommandPalette}
        activeSection={activeSection}
        onOpenIntro={() => setShowIntro(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        {/* Section 1: Hero */}
        <Hero onOpenTerminal={() => setShowIntro(true)} />

        {/* Placeholder Anchor Sections for Stage 1/2 layout */}
        <section
          id="projects"
          className="min-h-[50vh] max-w-6xl mx-auto px-6 py-24 w-full flex flex-col justify-center border-t border-border/40"
        >
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
              {language === 'en' ? '01 / Portfolio' : '01 / Portafolio'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-fg-primary">
              {language === 'en' ? 'Featured Engineering Projects' : 'Proyectos de Ingeniería'}
            </h2>
            <p className="text-sm text-fg-muted max-w-xl font-mono mt-1">
              {language === 'en'
                ? 'High-performance systems: C++20 Order Matching Engine (2.75M+ ops/s, 167ns latency), Distributed Rate Limiter, FairShare, Outfeed, and Checkstyle.'
                : 'Sistemas de alto rendimiento: Motor de Casación en C++20 (2.75M+ ops/s, 167ns latencia), Rate Limiter Distribuido, FairShare, Outfeed y Checkstyle.'}
            </p>
          </div>
        </section>

        <section
          id="about"
          className="min-h-[40vh] max-w-6xl mx-auto px-6 py-24 w-full flex flex-col justify-center border-t border-border/40"
        >
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
              {language === 'en' ? '02 / About Me' : '02 / Sobre mí'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-fg-primary">
              {language === 'en' ? 'Background & Tech Stack' : 'Trayectoria y Stack Tecnológico'}
            </h2>
          </div>
        </section>

        <section
          id="experience"
          className="min-h-[40vh] max-w-6xl mx-auto px-6 py-24 w-full flex flex-col justify-center border-t border-border/40"
        >
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
              {language === 'en' ? '03 / Journey' : '03 / Experiencia'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-fg-primary">
              {language === 'en' ? 'Experience & Education' : 'Experiencia y Educación'}
            </h2>
          </div>
        </section>

        <section
          id="contact"
          className="min-h-[40vh] max-w-6xl mx-auto px-6 py-24 w-full flex flex-col justify-center border-t border-border/40"
        >
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
              {language === 'en' ? '04 / Connect' : '04 / Contacto'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-fg-primary">
              {language === 'en' ? "Let's Build Something Exceptional" : 'Construyamos Algo Excepcional'}
            </h2>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8 px-6 text-center text-xs text-fg-muted font-mono">
        <p>© 2026 Jaime de Luiz García. Designed with precision & craftsmanship.</p>
      </footer>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SmoothScrollProvider>
          <PortfolioContent />
        </SmoothScrollProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
