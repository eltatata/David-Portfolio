'use client';

import React from 'react';
import { Navbar } from '@/components/navbar';
import { AboutMe } from '@/components/sections/about-me';
import { Experience } from '@/components/sections/experience';
import { Projects } from '@/components/sections/projects';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';

export default function Portfolio() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen text-foreground">
      <Navbar onNavigate={scrollToSection} />
      <AboutMe />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
