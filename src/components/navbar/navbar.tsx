'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Bot, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatWindow } from '@/components/sections/chat-window';
import { ShineBorder } from '@/components/animated/shine-border';
import { AnimatedThemeToggler } from '@/components/navbar/animated-theme-toggler';
import { LanguageSwitcher } from '@/components/navbar/language-switcher';

export function Navbar() {
  const { t } = useTranslation();
  const [isChatOpen, setIsChatOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const navItems = [
    { key: 'about', id: 'about-me' },
    { key: 'experience', id: 'experience' },
    { key: 'projects', id: 'projects' },
    { key: 'contact', id: 'contact' },
  ];

  const scrollToSection = (sectionId: string, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();

    setIsMobileMenuOpen(false);

    requestAnimationFrame(() => {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const navbarHeight = 80;
          const elementTop =
            element.getBoundingClientRect().top + window.pageYOffset;
          const offsetPosition = elementTop - navbarHeight;

          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth',
          });
        }
      }, 250);
    });
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/80 border-b border-border"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex justify-between items-center">
            {/* Desktop Navigation */}
            <div className="hidden md:flex justify-center space-x-6 lg:space-x-8 flex-1">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={(e) => scrollToSection(item.id, e)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  {t(`nav.${item.key}`)}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-muted/50 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <Button
                onClick={() => setIsChatOpen(true)}
                variant="outline"
                size="sm"
                className="relative flex items-center cursor-pointer"
              >
                <Bot className="h-4 w-4" />
                <span className="hidden sm:inline ml-1.5">David AI</span>
                <ShineBorder
                  shineColor={['#00FF00']}
                  borderWidth={3}
                  duration={5}
                />
              </Button>
              <LanguageSwitcher />
              <AnimatedThemeToggler className="cursor-pointer" />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-md"
            >
              <div className="px-4 py-4 space-y-2">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.key}
                    onClick={(e) => scrollToSection(item.id, e)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="w-full text-left px-4 py-3 rounded-md text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                    type="button"
                  >
                    {t(`nav.${item.key}`)}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <ChatWindow isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}
