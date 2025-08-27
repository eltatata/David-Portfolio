'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Github, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeInSection } from './fade-in-section';
import { getProjects } from '@/lib/info/projects-info';

export function Projects() {
  const { t } = useTranslation();
  const projects = getProjects(t);

  return (
    <section id="projects" className="py-20 px-6">
      <FadeInSection className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-16">
          {t('projects.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {projects.map((project, index: number) => (
            <FadeInSection key={index} delay={index * 0.1}>
              <Card className="backdrop-blur-md bg-card/50 border-border hover:bg-card/70 transition-all duration-300 group h-full">
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
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech, techIndex) => {
                        const IconComponent = tech.icon;
                        return (
                          <Badge
                            key={techIndex}
                            variant="secondary"
                            className="flex items-center gap-1 text-xs"
                          >
                            <IconComponent className="h-3 w-3" />
                            {tech.name}
                          </Badge>
                        );
                      })}
                    </div>
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
