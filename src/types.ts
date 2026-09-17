export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  accomplishments?: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  categoryId: 'web' | 'design' | 'mobile' | string;
  description: string;
  detailedDescription?: string;
  imageUrl: string;
  gallery?: string[];
  technicalSpecs?: string[];
  challenges?: string;
  link?: string;
  demoUrl?: string;
  githubUrl?: string;
  techStack?: string[];
  milestones?: { phase: string; date: string; description: string }[];
  year?: string;
  isFeatured?: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
}

export interface SkillItem {
  name: string;
  proficiency: number;
  description?: string;
  yearsOfExperience?: number;
  isVerified?: boolean;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  imageUrl?: string;
  credentialUrl?: string;
  credentialId?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: SkillItem[];
}

export interface Post {
  id: string;
  title_en: string;
  title_th: string;
  excerpt_en: string;
  excerpt_th: string;
  content_en: string;
  content_th: string;
  category: string;
  tag: string;
  readTime: string;
  published: boolean;
  createdAt: any;
  updatedAt: any;
  authorId: string;
}
