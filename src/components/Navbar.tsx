import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Command, Menu, X, FileDown, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { portfolioData } from '../data/portfolioData';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette, activeSection }) => {
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: language === 'en' ? 'Home' : 'Inicio' },
    { id: 'projects', label: language === 'en' ? 'Projects' : 'Proyectos' },
    { id: 'about', label: language === 'en' ? 'About' : 'Sobre mí' },
    { id: 'experience', label: language === 'en' ? 'Experience' : 'Experiencia' },
    { id: 'contact', label: language === 'en' ? 'Contact' : 'Contacto' },
  ];

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'py-3.5 glass-nav border-b border-border shadow-sm'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollTo('home');
          }}
          className="group flex items-center gap-3 interactive cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-fg-primary text-bg-primary flex items-center justify-center font-bold text-xs tracking-wider transition-transform group-hover:scale-105">
            JDL
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-fg-primary group-hover:text-accent transition-colors">
              Jaime de Luiz
            </span>
            <span className="flex items-center gap-1.5 text-[11px] text-fg-muted font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {portfolioData.profile.status[language]}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-bg-secondary/70 border border-border px-3 py-1.5 rounded-full backdrop-blur-md shadow-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`relative px-3.5 py-1 text-xs font-medium rounded-full transition-colors interactive ${
                  isActive ? 'text-fg-primary' : 'text-fg-muted hover:text-fg-primary'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute inset-0 bg-accent-soft border border-accent/30 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right utility buttons */}
        <div className="flex items-center gap-2">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border bg-bg-secondary text-fg-muted hover:text-fg-primary hover:border-border-strong text-xs font-mono transition-colors interactive"
            title={language === 'en' ? 'Open Command Palette (Cmd+K)' : 'Abrir Paleta de Comandos (Cmd+K)'}
          >
            <Command className="w-3.5 h-3.5 text-accent" />
            <span className="text-[11px] font-medium">⌘K</span>
          </button>

          {/* Language Switch */}
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1.5 rounded-lg border border-border bg-bg-secondary text-xs font-mono font-medium text-fg-muted hover:text-fg-primary hover:border-border-strong transition-colors interactive"
            aria-label="Toggle language"
            title={language === 'en' ? 'Cambiar a Español' : 'Switch to English'}
          >
            <span className={language === 'en' ? 'text-accent font-bold' : ''}>EN</span>
            <span className="mx-0.5 text-border-strong">/</span>
            <span className={language === 'es' ? 'text-accent font-bold' : ''}>ES</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-border bg-bg-secondary text-fg-muted hover:text-fg-primary hover:border-border-strong transition-colors interactive"
            aria-label="Toggle color theme"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>

          {/* Resume Download / View */}
          <a
            href="/Jaime_de_Luiz_Garcia_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-fg-primary text-bg-primary hover:opacity-90 text-xs font-medium transition-all interactive shadow-sm"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>CV</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-border bg-bg-secondary text-fg-muted hover:text-fg-primary"
            aria-label="Open navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-b border-border bg-bg-secondary/95 backdrop-blur-xl px-6 py-4 flex flex-col gap-2"
          >
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-left py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-accent-soft text-accent font-semibold'
                    : 'text-fg-secondary hover:text-fg-primary hover:bg-bg-tertiary'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-border flex items-center justify-between">
              <a
                href="/Jaime_de_Luiz_Garcia_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-accent font-medium"
              >
                <span>Descargar CV / Download CV</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

