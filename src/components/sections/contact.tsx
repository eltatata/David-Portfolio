'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Mail } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa';
import { FadeInSection } from './fade-in-section';

export function Contact() {
  const { t } = useTranslation();

  const socialLinks = [
    {
      href: 'https://mail.google.com/mail/?view=cm&fs=1&to=davidtowo75@gmail.com&su=Hello%2C%20I%20come%20from%20your%20portfolio%20and%20I%20would%20like%20to%20contact%20you',
      icon: Mail,
      label: 'Email',
    },
    {
      href: 'https://www.linkedin.com/in/david-tabares-seguro/',
      icon: FaLinkedinIn,
      label: 'LinkedIn',
    },
    {
      href: 'https://github.com/eltatata',
      icon: SiGithub,
      label: 'GitHub',
    },
  ];

  return (
    <section id="contact" className="py-24 px-6">
      <FadeInSection className="max-w-2xl mx-auto text-center">
        <div className="backdrop-blur-xl bg-card/60 border border-border/60 rounded-3xl p-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            {t('contact.title')}
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            {t('contact.description')}
          </p>
          <div className="flex items-center justify-center gap-3">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="h-12 w-12 flex items-center justify-center rounded-xl border border-border/60 bg-background/60 hover:bg-muted hover:border-border transition-all duration-200 group"
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}
