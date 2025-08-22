'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Github, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { FadeInSection } from './fade-in-section';

export function Projects() {
  const { t } = useTranslation();

  const projects = [
    {
      title: t('projects.items.felipe.title'),
      description: t('projects.items.felipe.description'),
      image: '/images/felipe.webp',
      link: 'https://github.com/eltatata/Nextjs-langchain-retrievalQA',
    },
    {
      title: t('projects.items.ecommerce.title'),
      description: t('projects.items.ecommerce.description'),
      image: '/images/ecommerce.webp',
      link: 'https://github.com/eltatata/Nodejs-Scalable-Ecommerce',
    },
    {
      title: t('projects.items.reume.title'),
      description: t('projects.items.reume.description'),
      image: '/images/reume.webp',
      link: 'https://github.com/eltatata/Reume-Frontend',
    },
    {
      title: t('projects.items.tasktraker.title'),
      description: t('projects.items.tasktraker.description'),
      image: '/images/tasktraker.webp',
      link: 'https://github.com/eltatata/TASKTRAKER',
    },
  ];

  return (
    <section id="projects" className="py-20 px-6">
      <FadeInSection className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">
          {t('projects.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {projects.map((project, index) => (
            <FadeInSection key={index} delay={index * 0.1}>
              <Card className="backdrop-blur-md bg-card/50 border-border hover:bg-card/70 transition-all duration-300 group">
                <CardContent className="p-0">
                  <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                    <img
                      src={project.image || '/placeholder.svg'}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <Link
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-md hover:bg-muted"
                        href={project.link}
                        target="_blank"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection className="text-center">
          <Link
            className="inline-flex items-center text-sm font-medium border border-border rounded-md py-2 px-4 bg-muted/50 hover:bg-muted transition-colors"
            href="https://github.com/eltatata"
            target="_blank"
          >
            <Github className="mr-2 h-4 w-4" />
            {t('projects.viewProject')}
          </Link>
        </FadeInSection>
      </FadeInSection>
    </section>
  );
}
