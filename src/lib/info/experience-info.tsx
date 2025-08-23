import { TFunction } from 'i18next';
import {
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiNodedotjs,
  SiExpress,
  SiDocker,
  SiPostgresql,
  SiLangchain,
  SiSocketdotio,
  SiGit,
  SiGithub,
  SiShadcnui,
  SiNestjs,
  SiOpenai,
  SiReact,
} from 'react-icons/si';
import { FaCode, FaAws } from 'react-icons/fa';

import { VscAzureDevops } from 'react-icons/vsc';
import { Experience } from '../interfaces';

export const getExperiences = (t: TFunction): Experience[] => [
  {
    period: t('experience.jobs.job1.period') as string,
    title: t('experience.fullStackDeveloper') as string,
    company: t('experience.jobs.job1.company') as string,
    description: t('experience.jobs.job1.description', {
      returnObjects: true,
    }) as string[],
    techStack: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'React', icon: SiReact },
      { name: 'Express', icon: SiExpress },
      { name: 'Docker', icon: SiDocker },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'Socket.io', icon: SiSocketdotio },
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Azure DevOps', icon: VscAzureDevops },
    ],
  },
  {
    period: t('experience.jobs.job2.period') as string,
    title: t('experience.nodeJSDeveloper') as string,
    company: t('experience.jobs.job2.company') as string,
    description: t('experience.jobs.job2.description', {
      returnObjects: true,
    }) as string[],
    techStack: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Nest.js', icon: SiNestjs },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Shadcn UI', icon: SiShadcnui },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Inngest', icon: FaCode },
      { name: 'AWS', icon: FaAws },
    ],
  },
  {
    period: t('experience.jobs.job3.period') as string,
    title: t('experience.fullStackDeveloper') as string,
    company: t('experience.jobs.job3.company') as string,
    description: t('experience.jobs.job3.description', {
      returnObjects: true,
    }) as string[],
    techStack: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Nest.js', icon: SiNestjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'Shadcn UI', icon: SiShadcnui },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
    ],
  },
  {
    period: t('experience.jobs.job4.period') as string,
    title: t('experience.fullStackDeveloper') as string,
    company: t('experience.jobs.job4.company') as string,
    description: t('experience.jobs.job4.description', {
      returnObjects: true,
    }) as string[],
    techStack: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'OpenAI', icon: SiOpenai },
      { name: 'Langchain', icon: SiLangchain },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Tailwind CSS', icon: SiTailwindcss },
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'Docker', icon: SiDocker },
    ],
  },
];
