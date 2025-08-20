'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ModeToggle } from './mode-toggle';
import { LanguageSwitcher } from './language-switcher';

export function Navbar() {
  const { t } = useTranslation();

  const navItems = [
    { key: 'about', id: 'about-me' },
    { key: 'experience', id: 'experience' },
    { key: 'projects', id: 'projects' },
    { key: 'contact', id: 'contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border"
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex justify-center space-x-8 flex-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {t(`nav.${item.key}`)}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <LanguageSwitcher />
            <ModeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
