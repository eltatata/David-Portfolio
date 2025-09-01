import { IconType } from 'react-icons';

export interface TechStack {
  name: string;
  icon: IconType;
}

export interface Experience {
  period: string;
  title: string;
  company: string;
  description: string[];
  techStack: TechStack[];
}

export interface Project {
  title: string;
  description: string;
  image: string;
  link?: string;
  github: string;
  techStack: TechStack[];
}
