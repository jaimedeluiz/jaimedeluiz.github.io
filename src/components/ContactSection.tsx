import React, { useState } from 'react';
import { Github, Linkedin, Copy, Check, Send, ArrowUp, Phone, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export const ContactSection: React.FC = () => {
  const { language } = useLanguage();
  const { profile } = portfolioData;

  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    _gotcha: '', // Honeypot field
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData._gotcha) return; // Spam bot caught by honeypot

    // Open mail client or submit
    const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
      `Portfolio Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
    setFormSubmitted(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-6xl mx-auto w-full border-t border-border/40">
      {/* Section Header */}
      <div className="flex flex-col gap-2 mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
          {language === 'en' ? '04 / Connect' : '04 / Contacto'}
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-fg-primary">
          {language === 'en' ? "Let's Build Something Exceptional" : 'Construyamos Algo Excepcional'}
        </h2>
        <p className="text-base text-fg-secondary max-w-xl mt-1">
          {language === 'en'
            ? 'Open to software engineering roles, high-performance systems engineering, and collaborative opportunities.'
            : 'Disponible para posiciones de ingeniería de software, sistemas de alto rendimiento y proyectos colaborativos.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Direct Links & Info */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Email Copy Card */}
          <div className="p-6 rounded-2xl border border-border bg-bg-secondary flex flex-col gap-3 shadow-sm">
            <span className="text-xs font-mono text-fg-muted uppercase tracking-wider">
              {language === 'en' ? 'Direct Email' : 'Correo Electrónico'}
            </span>
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-base sm:text-lg font-bold text-fg-primary truncate">
                {profile.email}
              </span>
              <button
                onClick={handleCopyEmail}
                className="p-2 rounded-xl border border-border bg-bg-tertiary hover:border-accent hover:text-accent transition-colors interactive shrink-0"
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-500" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            {copied && (
              <span className="text-[11px] font-mono text-emerald-500">
                {language === 'en' ? '✓ Copied to clipboard!' : '✓ ¡Copiado al portapapeles!'}
              </span>
            )}
          </div>

          {/* Social Profiles Grid */}
          <div className="grid grid-cols-2 gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl border border-border bg-bg-secondary hover:border-accent hover:bg-bg-tertiary transition-all flex flex-col justify-between gap-4 group interactive"
            >
              <Github className="w-6 h-6 text-fg-primary group-hover:text-accent transition-colors" />
              <div>
                <span className="font-mono text-xs text-fg-muted block">GitHub</span>
                <span className="font-semibold text-sm text-fg-primary group-hover:text-accent transition-colors">
                  @{profile.githubUsername}
                </span>
              </div>
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl border border-border bg-bg-secondary hover:border-accent hover:bg-bg-tertiary transition-all flex flex-col justify-between gap-4 group interactive"
            >
              <Linkedin className="w-6 h-6 text-blue-500 group-hover:scale-105 transition-transform" />
              <div>
                <span className="font-mono text-xs text-fg-muted block">LinkedIn</span>
                <span className="font-semibold text-sm text-fg-primary group-hover:text-accent transition-colors">
                  /in/jaimedeluiz
                </span>
              </div>
            </a>
          </div>

          {/* Location & Status */}
          <div className="p-5 rounded-2xl border border-border bg-bg-secondary flex flex-col gap-2 font-mono text-xs text-fg-muted">
            <div className="flex items-center gap-2 text-fg-secondary">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              <span>{profile.location}</span>
            </div>
            <div className="flex items-center gap-2 text-fg-secondary">
              <Phone className="w-3.5 h-3.5 text-accent" />
              <span>{profile.phone}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Message Form */}
        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 rounded-2xl border border-border bg-bg-secondary flex flex-col gap-5 shadow-sm"
          >
            {/* Honeypot anti-spam */}
            <input
              type="text"
              name="_gotcha"
              value={formData._gotcha}
              onChange={(e) => setFormData({ ...formData, _gotcha: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs font-semibold text-fg-muted">
                  {language === 'en' ? 'Your Name' : 'Tu Nombre'} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={language === 'en' ? 'Ada Lovelace' : 'Ada Lovelace'}
                  className="px-4 py-2.5 rounded-xl border border-border bg-bg-tertiary text-fg-primary text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs font-semibold text-fg-muted">
                  {language === 'en' ? 'Your Email' : 'Tu Correo'} *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@domain.com"
                  className="px-4 py-2.5 rounded-xl border border-border bg-bg-tertiary text-fg-primary text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs font-semibold text-fg-muted">
                {language === 'en' ? 'Message' : 'Mensaje'} *
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={
                  language === 'en'
                    ? 'Tell me about your team, role, or project...'
                    : 'Cuéntame sobre tu equipo, posición o proyecto...'
                }
                className="px-4 py-2.5 rounded-xl border border-border bg-bg-tertiary text-fg-primary text-sm focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-medium text-sm transition-all shadow-md interactive"
            >
              <Send className="w-4 h-4" />
              <span>{language === 'en' ? 'Send Message' : 'Enviar Mensaje'}</span>
            </button>

            {formSubmitted && (
              <p className="text-xs font-mono text-emerald-500 text-center">
                {language === 'en'
                  ? 'Message initiated in your mail client!'
                  : '¡Mensaje preparado en tu cliente de correo!'}
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-fg-muted">
        <p>© 2026 Jaime de Luiz García. Designed with precision & craftsmanship.</p>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-1.5 text-accent hover:underline interactive cursor-pointer"
        >
          <span>{language === 'en' ? 'Back to top' : 'Volver arriba'}</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
};
