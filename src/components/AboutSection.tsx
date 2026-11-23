import React from 'react';
import { Globe2, GraduationCap, MapPin } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export const AboutSection: React.FC = () => {
  const { language } = useLanguage();
  const { skills } = portfolioData;

  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto w-full border-t border-border/40">
      {/* Section Header */}
      <div className="flex flex-col gap-2 mb-12">
        <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
          {language === 'en' ? '02 / About Me' : '02 / Sobre mí'}
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-fg-primary">
          {language === 'en' ? 'Background & Engineering Philosophy' : 'Trayectoria y Filosofía de Ingeniería'}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Personal Narrative */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="space-y-4 text-base sm:text-lg text-fg-secondary leading-relaxed font-sans">
            <p>
              {language === 'en' ? (
                <>
                  I am a <strong className="text-fg-primary font-semibold">Software Engineering student</strong> at the{' '}
                  <span className="text-accent font-medium">University of Málaga</span> with a deep passion for low-level systems, distributed architectures, and crafting high-performance, production-ready software.
                </>
              ) : (
                <>
                  Soy un <strong className="text-fg-primary font-semibold">estudiante de Ingeniería de Software</strong> en la{' '}
                  <span className="text-accent font-medium">Universidad de Málaga</span> apasionado por los sistemas de bajo nivel, las arquitecturas distribuidas y el desarrollo de software de alto rendimiento listo para producción.
                </>
              )}
            </p>

            <p>
              {language === 'en' ? (
                <>
                  I am strictly <strong className="text-fg-primary font-semibold">bilingual (English & Spanish)</strong>, with international academic experience through an upcoming exchange semester at{' '}
                  <span className="text-accent font-medium">Vilnius University, Lithuania</span>. I thrive in cross-functional, globally distributed engineering environments and am{' '}
                  <strong className="text-fg-primary font-semibold">fully willing to relocate</strong> internationally for exciting software challenges.
                </>
              ) : (
                <>
                  Soy completamente <strong className="text-fg-primary font-semibold">bilingüe (inglés y español)</strong>, con experiencia académica internacional mediante un semestre de intercambio en{' '}
                  <span className="text-accent font-medium">Vilnius University (Lituania)</span>. Me adapto con rapidez a equipos de ingeniería globales y cuento con{' '}
                  <strong className="text-fg-primary font-semibold">total disponibilidad para reubicarme</strong> en cualquier destino internacional.
                </>
              )}
            </p>

            <p>
              {language === 'en' ? (
                <>
                  Prior to university, I graduated with highest honors achieving a{' '}
                  <strong className="text-accent font-semibold">100/100 perfect average</strong> across every single subject (ranked 1st out of 152 students) and was awarded the official{' '}
                  <strong className="text-fg-primary font-semibold">Best Academic Record Award in the City of Málaga</strong>.
                </>
              ) : (
                <>
                  Antes de la universidad, me gradué con matrícula de honor con un{' '}
                  <strong className="text-accent font-semibold">promedio de 100/100</strong> en todas las asignaturas (1º de 152 alumnos), recibiendo el{' '}
                  <strong className="text-fg-primary font-semibold">Premio al Mejor Expediente Académico de la Ciudad de Málaga</strong>.
                </>
              )}
            </p>
          </div>

          {/* Quick Context Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-4 rounded-xl border border-border bg-bg-secondary flex items-start gap-3">
              <div className="p-2 rounded-lg bg-accent-soft text-accent">
                <Globe2 className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-mono text-fg-muted uppercase">
                  {language === 'en' ? 'International' : 'Internacional'}
                </span>
                <span className="text-sm font-semibold text-fg-primary">
                  {language === 'en' ? 'Bilingual EN/ES · Vilnius Univ.' : 'Bilingüe EN/ES · Vilnius Univ.'}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-border bg-bg-secondary flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-mono text-fg-muted uppercase">
                  {language === 'en' ? 'Mobility' : 'Movilidad'}
                </span>
                <span className="text-sm font-semibold text-fg-primary">
                  {language === 'en' ? 'Willing to Relocate Globally' : 'Disponibilidad de Reubicación'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Tech Stack Groupings */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-6 rounded-2xl border border-border bg-bg-secondary shadow-sm space-y-6">
            <h3 className="text-sm font-mono uppercase tracking-wider text-accent font-semibold flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>{language === 'en' ? 'Technical Competencies' : 'Competencias Técnicas'}</span>
            </h3>

            {skills.map((group) => (
              <div key={group.category.en} className="space-y-2.5">
                <h4 className="text-xs font-mono text-fg-muted uppercase tracking-wider">
                  {group.category[language]}
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono bg-bg-tertiary border border-border text-fg-secondary hover:text-fg-primary hover:border-accent/40 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
