import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { SmoothScrollProvider } from './components/SmoothScroll';
import { CursorMesh } from './components/CursorMesh';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { IntroScreen } from './components/IntroScreen';
import { ProjectsSection } from './components/ProjectsSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';

const PortfolioContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  // Initial entrance screen where visitors can play with the pointer
  const [showIntro, setShowIntro] = useState(true);

  // Track active section for navbar indicator
  useEffect(() => {
    if (showIntro) return;
    const sectionIds = ['home', 'projects', 'about', 'experience', 'contact'];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
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

      {/* Progress Bar */}
      <ScrollProgressBar />

      {/* Navigation Header */}
      <Navbar
        onOpenCommandPalette={handleOpenCommandPalette}
        activeSection={activeSection}
        onOpenIntro={() => setShowIntro(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        {/* Section 0: Hero */}
        <Hero onOpenTerminal={() => setShowIntro(true)} />

        {/* Section 1: Projects (Folder Cards with Hover Preview & Modal Overlays) */}
        <ProjectsSection />

        {/* Section 2: About Me (Bilingual, Vilnius Univ, Philosophy, Tech Stack) */}
        <AboutSection />

        {/* Section 3: Experience & Education (100/100, 1st/152, UMA, FNAC #1) */}
        <ExperienceSection />

        {/* Section 4: Contact & Socials */}
        <ContactSection />
      </main>
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
