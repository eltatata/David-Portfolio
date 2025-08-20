'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FadeInSection } from './fade-in-section';

export function AboutMe() {
  const { t } = useTranslation();

  return (
    <section
      id="about-me"
      className="min-h-screen flex items-center justify-center px-6 pt-20"
    >
      <FadeInSection className="max-w-4xl mx-auto text-center">
        <div className="backdrop-blur-md bg-card/50 border border-border rounded-2xl p-8 md:p-12">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            {t('about.greeting')}
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
            className="text-xl md:text-2xl text-muted-foreground mb-6"
          >
            {t('about.title')}
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6, ease: 'easeOut' }}
            className="flex justify-center space-x-4 mb-8"
          >
            <Link
              className="border border-border rounded-md p-2 bg-muted/50 hover:bg-muted transition-colors"
              href="https://www.linkedin.com/in/david-tabares-seguro/"
              target="_blank"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link
              className="border border-border rounded-md p-2 bg-muted/50 hover:bg-muted transition-colors"
              href="https://github.com/eltatata"
              target="_blank"
            >
              <Github className="h-5 w-5" />
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
            className="text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            {t('about.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
          >
            <Button className="backdrop-blur-md bg-primary/90 hover:bg-primary">
              <Link
                className="flex items-center"
                href="/docs/CV David Tabares Seguro 2025-3.pdf"
                download
              >
                <Download className="mr-2 h-4 w-4" />
                {t('about.downloadCV')}
              </Link>
            </Button>
          </motion.div>
        </div>
      </FadeInSection>
    </section>
  );
}
