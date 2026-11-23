export type Language = 'en' | 'es';

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ArchitectureStep {
  name: string;
  detail: string;
  subtext?: string;
}

export interface ProjectDecision {
  title: string;
  reason: string;
}

export interface Project {
  id: string;
  featured?: boolean;
  category: {
    en: string;
    es: string;
  };
  title: string;
  subtitle: {
    en: string;
    es: string;
  };
  summary: {
    en: string;
    es: string;
  };
  badge: {
    text: string;
    subtext?: string;
  };
  tags: string[];
  metrics: ProjectMetric[];
  githubUrl?: string;
  demoUrl?: string;
  interactiveDemo?: 'matching-engine' | 'token-bucket';
  
  caseStudy: {
    problem: {
      en: string;
      es: string;
    };
    architecture: {
      en: string;
      es: string;
      steps: ArchitectureStep[];
    };
    keyDecisions: {
      en: ProjectDecision[];
      es: ProjectDecision[];
    };
    results: {
      en: string[];
      es: string[];
    };
    links: {
      label: string;
      url: string;
      isPlaceholder?: boolean;
    }[];
  };
}

export interface WorkExperience {
  role: {
    en: string;
    es: string;
  };
  company: string;
  location: string;
  period: string;
  achievements: {
    en: string[];
    es: string[];
  };
  highlight?: {
    en: string;
    es: string;
  };
}

export interface EducationItem {
  degree: {
    en: string;
    es: string;
  };
  institution: string;
  location: string;
  period: string;
  notes: {
    en: string[];
    es: string[];
  };
  awardBadge?: {
    en: string;
    es: string;
  };
}

export interface SkillCategory {
  category: {
    en: string;
    es: string;
  };
  skills: string[];
}

export interface PortfolioData {
  profile: {
    name: string;
    title: {
      en: string;
      es: string;
    };
    tagline: {
      en: string;
      es: string;
    };
    heroHighlight: {
      en: {
        prefix: string;
        highlight1: string;
        middle: string;
        highlight2: string;
        suffix: string;
      };
      es: {
        prefix: string;
        highlight1: string;
        middle: string;
        highlight2: string;
        suffix: string;
      };
    };
    summary: {
      en: string;
      es: string;
    };
    status: {
      en: string;
      es: string;
    };
    email: string;
    phone: string;
    github: string;
    githubUsername: string;
    linkedin: string;
    location: string;
    willingToRelocate: boolean;
  };
  skills: SkillCategory[];
  projects: Project[];
  experience: WorkExperience[];
  education: EducationItem[];
  achievements: {
    stat: string;
    label: {
      en: string;
      es: string;
    };
    context: {
      en: string;
      es: string;
    };
  }[];
}

