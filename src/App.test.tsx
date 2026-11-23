import { describe, it, expect } from 'vitest';
import { portfolioData } from './data/portfolioData';

describe('Portfolio Verification & Facts Integrity', () => {
  it('contains valid portfolio profile data matching resume strictly', () => {
    expect(portfolioData.profile.name).toBe('Jaime de Luiz García');
    expect(portfolioData.profile.email).toBe('jaime.deluiz@gmail.com');
    expect(portfolioData.profile.github).toBe('https://github.com/jaimedeluiz');
    expect(portfolioData.profile.linkedin).toBe('https://linkedin.com/in/jaimedeluiz');
  });

  it('includes all core projects with accurate GitHub repositories', () => {
    const projectIds = portfolioData.projects.map((p) => p.id);
    expect(projectIds).toContain('matching-engine');
    expect(projectIds).toContain('distributed-rate-limiter');
    expect(projectIds).toContain('fairshare');
    expect(projectIds).toContain('outfeed');
    expect(projectIds).toContain('checkstyle');
    expect(projectIds).toContain('barbershop-planner');

    const barbershop = portfolioData.projects.find((p) => p.id === 'barbershop-planner');
    expect(barbershop?.githubUrl).toBe('https://github.com/jaimedeluiz/barbershop-appointment-planner');

    const matchingEngine = portfolioData.projects.find((p) => p.id === 'matching-engine');
    expect(matchingEngine?.tags).toContain('C++20');
    expect(matchingEngine?.badge.text).toBe('2.75M+ ops/s');
    expect(matchingEngine?.githubUrl).toBe('https://github.com/jaimedeluiz/real-time-order-matching-engine');

    const checkstyle = portfolioData.projects.find((p) => p.id === 'checkstyle');
    const prLink = checkstyle?.caseStudy.links.find((l) => l.url.includes('22944'));
    expect(prLink).toBeDefined();
    expect(prLink?.url).toBe('https://github.com/checkstyle/checkstyle/pull/22944');
  });

  it('includes complete work experience from CV', () => {
    const companies = portfolioData.experience.map((e) => e.company);
    expect(companies).toContain('University of Málaga');
    expect(companies).toContain('FNAC');

    const fnac = portfolioData.experience.find((e) => e.company === 'FNAC');
    expect(fnac?.highlight?.en).toContain('#1 in Spain');
  });

  it('includes exact education credentials and honors', () => {
    const softwareEng = portfolioData.education.find((e) =>
      e.institution.includes('University of Málaga')
    );
    expect(softwareEng).toBeDefined();
    expect(softwareEng?.notes.en[0]).toContain('Vilnius University');

    const bachillerato = portfolioData.education.find((e) =>
      e.institution.includes('Santa Rosa de Lima')
    );
    expect(bachillerato).toBeDefined();
    expect(bachillerato?.notes.en[0]).toContain('100/100');
    expect(bachillerato?.notes.en[1]).toContain('1/152');
    expect(bachillerato?.awardBadge?.en).toContain('Best Academic Record');
  });
});
