'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Download, ArrowDown } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import LogoLoop from '@/components/animated/logo-loop';
import { FadeInSection } from './fade-in-section';
import { logosInfo } from '@/lib/info/logos-info';

export function AboutMe() {
  const { t } = useTranslation();

  return (
    <section
      id="about-me"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-16 sm:pt-20 pb-8"
    >
      <FadeInSection className="max-w-4xl mx-auto text-center w-full">
        <div className="backdrop-blur-xl bg-card/60 border border-border/60 rounded-3xl p-8 sm:p-10 md:p-14 shadow-sm">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {t('about.title')}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
            className="text-5xl md:text-7xl font-bold mb-6 tracking-tight"
          >
            {t('about.greeting')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
            className="text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-base md:text-lg"
          >
            {t('about.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: 'easeOut' }}
            className="flex items-center justify-center gap-3 mb-10"
          >
            <Button
              asChild
              className="rounded-xl px-6 h-11 text-sm font-medium shadow-sm"
            >
              <Link
                className="flex items-center"
                href="/docs/CV David Tabares Seguro 2025-3.pdf"
                download
              >
                <Download className="mr-2 h-4 w-4" />
                {t('about.downloadCV')}
              </Link>
            </Button>
            <Link
              className="h-11 w-11 flex items-center justify-center rounded-xl border border-border bg-background/60 hover:bg-muted transition-colors"
              href="https://www.linkedin.com/in/david-tabares-seguro/"
              target="_blank"
            >
              <FaLinkedinIn className="h-4 w-4" />
            </Link>
            <Link
              className="h-11 w-11 flex items-center justify-center rounded-xl border border-border bg-background/60 hover:bg-muted transition-colors"
              href="https://github.com/eltatata"
              target="_blank"
            >
              <SiGithub className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6, ease: 'easeOut' }}
          >
            <LogoLoop
              logos={logosInfo}
              speed={80}
              direction="left"
              logoHeight={40}
              gap={40}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="#00000000"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-10 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="h-5 w-5 text-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </FadeInSection>
    </section>
  );
}
