'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { FadeInSection } from './fade-in-section';
import { getExperiences } from '@/lib/info/experience-info';

export function Experience() {
  const { t } = useTranslation();
  const experiences = getExperiences(t);

  return (
    <section id="experience" className="py-24 px-6">
      <FadeInSection className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-medium text-primary mb-3"
          >
            {t('experience.title')}
          </motion.span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            {t('experience.title')}
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[30px] top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-primary/50 via-primary/20 to-transparent" />

          {experiences.map((item, index) => (
            <FadeInSection
              key={index}
              delay={index * 0.1}
              className="relative flex items-start mb-10 last:mb-0"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 300 }}
                className="absolute left-[24px] w-[15px] h-[15px] bg-primary rounded-full border-[3px] border-background shadow-sm shadow-primary/30 z-10"
              />
              <div className="w-full ml-16 backdrop-blur-xl bg-card/60 border border-border/60 rounded-2xl p-6 hover:bg-card/80 transition-colors duration-300">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <Badge variant="secondary" className="text-xs font-medium rounded-lg">
                    {item.period}
                  </Badge>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{item.company}</span>
                </div>
                <h3 className="text-lg font-semibold mb-3 tracking-tight">{item.title}</h3>

                <ul className="space-y-1.5 text-sm text-muted-foreground leading-relaxed mb-4">
                  {item.description.map((line, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-primary mt-1.5 shrink-0">•</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-1.5">
                  {item.techStack.map((tech, i) => (
                    <Badge
                      key={i}
                      variant="secondary"
                      className="flex items-center gap-1 text-xs rounded-md bg-muted/60 border-0"
                    >
                      <tech.icon className="w-3 h-3" />
                      {tech.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </FadeInSection>
          ))}
        </div>
      </FadeInSection>
    </section>
  );
}
