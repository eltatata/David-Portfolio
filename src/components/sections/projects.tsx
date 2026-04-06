'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeInSection } from './fade-in-section';
import { getProjects } from '@/lib/info/projects-info';

export function Projects() {
  const { t } = useTranslation();
  const projects = getProjects(t);

  return (
    <section id="projects" className="py-24 px-6">
      <FadeInSection className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
<h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {t('projects.title')}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {projects.map((project, index: number) => (
            <FadeInSection key={index} delay={index * 0.1}>
              <Card className="backdrop-blur-xl bg-card/60 border-border/60 hover:bg-card/80 hover:border-border transition-all duration-300 group h-full rounded-2xl overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-video bg-muted overflow-hidden">
                    <img
                      src={project.image || '/placeholder.svg'}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold tracking-tight">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-1.5">
                        {project.link && (
                          <Link
                            className="h-8 w-8 flex items-center justify-center rounded-lg border border-border/60 bg-background/60 hover:bg-muted transition-colors"
                            href={project.link}
                            target="_blank"
                            aria-label="Live application"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>
                        )}
                        <Link
                          className="h-8 w-8 flex items-center justify-center rounded-lg border border-border/60 bg-background/60 hover:bg-muted transition-colors"
                          href={project.github}
                          target="_blank"
                          aria-label="Source code on GitHub"
                        >
                          <SiGithub className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech, techIndex) => {
                        const IconComponent = tech.icon;
                        return (
                          <Badge
                            key={techIndex}
                            variant="secondary"
                            className="flex items-center gap-1 text-xs rounded-md bg-muted/60 border-0"
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
            className="inline-flex items-center text-sm font-medium border border-border/60 rounded-xl py-2.5 px-5 bg-background/60 hover:bg-muted transition-colors"
            href="https://github.com/eltatata"
            target="_blank"
          >
            <SiGithub className="mr-2 h-4 w-4" />
            {t('projects.viewProject')}
          </Link>
        </FadeInSection>
      </FadeInSection>
    </section>
  );
}
