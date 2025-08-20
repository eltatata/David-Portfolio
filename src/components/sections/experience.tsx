'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { FadeInSection } from './fade-in-section';

export function Experience() {
  const { t } = useTranslation();

  const experiences = [
    {
      period: t('experience.jobs.job1.period'),
      title: t('experience.fullStackDeveloper'),
      company: t('experience.jobs.job1.company'),
      description: t('experience.jobs.job1.description', {
        returnObjects: true,
      }) as string[],
    },
    {
      period: t('experience.jobs.job2.period'),
      title: t('experience.nodeJSDeveloper'),
      company: t('experience.jobs.job2.company'),
      description: t('experience.jobs.job2.description', {
        returnObjects: true,
      }) as string[],
    },
    {
      period: t('experience.jobs.job3.period'),
      title: t('experience.fullStackDeveloper'),
      company: t('experience.jobs.job3.company'),
      description: t('experience.jobs.job3.description', {
        returnObjects: true,
      }) as string[],
    },
    {
      period: t('experience.jobs.job4.period'),
      title: t('experience.fullStackDeveloper'),
      company: t('experience.jobs.job4.company'),
      description: t('experience.jobs.job4.description', {
        returnObjects: true,
      }) as string[],
    },
  ];

  return (
    <section id="experience" className="py-20 px-6">
      <FadeInSection className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">
          {t('experience.title')}
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

          {experiences.map((item, index) => (
            <FadeInSection
              key={index}
              delay={index * 0.1}
              className="relative flex items-start mb-12"
            >
              <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>
              <div className="w-full ml-16 backdrop-blur-md bg-card/50 border border-border rounded-lg p-6">
                <Badge variant="secondary" className="mb-2">
                  {item.period}
                </Badge>
                <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                <p className="text-muted-foreground mb-3">{item.company}</p>

                <ul className="list-disc list-inside space-y-1 text-sm leading-relaxed">
                  {item.description.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
              </div>
            </FadeInSection>
          ))}
        </div>
      </FadeInSection>
    </section>
  );
}
