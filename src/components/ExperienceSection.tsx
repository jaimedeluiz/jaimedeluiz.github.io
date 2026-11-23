import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

export const ExperienceSection: React.FC = () => {
  const { language } = useLanguage();
  const { experience, education, achievements } = portfolioData;

  return (
    <section id="experience" className="py-24 px-6 max-w-6xl mx-auto w-full border-t border-border/40">
      {/* Section Header */}
      <div className="flex flex-col gap-2 mb-14">
        <span className="text-xs font-mono uppercase tracking-widest text-accent font-semibold">
          {language === 'en' ? '03 / Journey' : '03 / Trayectoria'}
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-fg-primary">
          {language === 'en' ? 'Experience & Academic Distinction' : 'Experiencia y Distinción Académica'}
        </h2>
      </div>

      {/* Stats Highlight Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        {achievements.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="p-5 rounded-2xl border border-border bg-bg-secondary flex flex-col justify-between shadow-sm"
          >
            <span className="font-mono text-2xl sm:text-3xl font-extrabold text-accent">
              {item.stat}
            </span>
            <div className="mt-2">
              <p className="text-xs font-semibold text-fg-primary font-mono">
                {item.label[language]}
              </p>
              <p className="text-[11px] text-fg-muted mt-0.5 leading-snug">
                {item.context[language]}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Work Experience */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <Briefcase className="w-4 h-4 text-accent" />
            <h3 className="font-mono text-sm uppercase tracking-wider font-semibold text-fg-primary">
              {language === 'en' ? 'Professional Experience' : 'Experiencia Profesional'}
            </h3>
          </div>

          <div className="space-y-6">
            {experience.map((job, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-border bg-bg-secondary flex flex-col gap-3 shadow-sm hover:border-accent/30 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="font-bold text-lg text-fg-primary">
                    {job.role[language]}
                  </h4>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-fg-muted">
                    <Calendar className="w-3.5 h-3.5 text-accent" />
                    {job.period}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-accent">
                  <span className="font-semibold">{job.company}</span>
                  <span className="text-border-strong">•</span>
                  <span className="text-fg-muted flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {job.location}
                  </span>
                </div>

                {job.highlight && (
                  <div className="my-1 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{job.highlight[language]}</span>
                  </div>
                )}

                <ul className="space-y-2 pt-1">
                  {job.achievements[language].map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-fg-secondary leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Education */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <GraduationCap className="w-4 h-4 text-accent" />
            <h3 className="font-mono text-sm uppercase tracking-wider font-semibold text-fg-primary">
              {language === 'en' ? 'Education & Honors' : 'Educación y Distinciones'}
            </h3>
          </div>

          <div className="space-y-6">
            {education.map((edu, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-border bg-bg-secondary flex flex-col gap-3 shadow-sm hover:border-accent/30 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="font-bold text-lg text-fg-primary">
                    {edu.degree[language]}
                  </h4>
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono text-fg-muted">
                    <Calendar className="w-3.5 h-3.5 text-accent" />
                    {edu.period}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-accent">
                  <span className="font-semibold">{edu.institution}</span>
                  <span className="text-border-strong">•</span>
                  <span className="text-fg-muted flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {edu.location}
                  </span>
                </div>

                {edu.awardBadge && (
                  <div className="my-1 px-3 py-1.5 rounded-lg bg-accent-soft border border-accent/20 text-accent text-xs font-mono flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 shrink-0" />
                    <span>{edu.awardBadge[language]}</span>
                  </div>
                )}

                <ul className="space-y-2 pt-1">
                  {edu.notes[language].map((note, nIdx) => (
                    <li key={nIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-fg-secondary leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" />
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

