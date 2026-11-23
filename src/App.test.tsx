import { describe, it, expect } from 'vitest';
import { portfolioData } from './data/portfolioData';

describe('Portfolio Stage 1 Smoke Tests', () => {
  it('contains valid portfolio profile data matching resume', () => {
    expect(portfolioData.profile.name).toBe('Jaime de Luiz García');
    expect(portfolioData.profile.email).toBe('jaime.deluiz@gmail.com');
    expect(portfolioData.projects.length).toBeGreaterThanOrEqual(5);
  });

  it('includes the C++20 real-time matching engine project', () => {
    const matchingEngine = portfolioData.projects.find((p) => p.id === 'matching-engine');
    expect(matchingEngine).toBeDefined();
    expect(matchingEngine?.tags).toContain('C++20');
    expect(matchingEngine?.badge.text).toBe('2.75M+ ops/s');
  });

  it('includes education with Málaga city best record award', () => {
    const bachillerato = portfolioData.education.find((e) =>
      e.institution.includes('Santa Rosa de Lima')
    );
    expect(bachillerato).toBeDefined();
    expect(bachillerato?.notes.en[0]).toContain('100/100');
  });
});

