'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Mail } from 'lucide-react';
import { FadeInSection } from './fade-in-section';

export function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="py-20 px-6">
      <FadeInSection className="max-w-2xl mx-auto text-center">
        <div className="backdrop-blur-md bg-card/50 border border-border rounded-2xl p-8">
          <h2 className="text-3xl font-bold mb-8">{t('contact.title')}</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              I&apos;m interested in freelance opportunities – especially
              ambitious or large projects. However, if you have other requests
              or questions, don&apos;t hesitate to contact me.
            </p>
            <div className="flex space-x-4 items-center justify-center text-muted-foreground">
              <div className="flex items-center gap-4">
                <Link
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=davidtowo75@gmail.com&su=Hello%2C%20I%20come%20from%20your%20portfolio%20and%20I%20would%20like%20to%20contact%20you"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Mail className="h-6 w-6" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/david-tabares-seguro/"
                  target="_blank"
                >
                  <Linkedin className="h-6 w-6" />
                </Link>
                <Link href="https://github.com/eltatata" target="_blank">
                  <Github className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </FadeInSection>
    </section>
  );
}
