export interface NavItem {
  label: string;
  href: string;
}

export interface Ability {
  name: string;
  value: number;
  description: string;
}

export interface SkillItem {
  name: string;
  description: string;
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export interface ProjectItem {
  id: string;
  name: string;
  type: string;
  content: string;
  details?: string[];
  tags: string[];
  status: string;
}

export interface ReviewItem {
  content: string;
  author: string;
  status: string;
}

export interface PatchNoteItem {
  version: string;
  updates: string[];
}

export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  instagram: string;
  youtube: string;
}
