import React from 'react';
import { Navbar } from '@/components/navbar/navbar';
import { AboutMe } from '@/components/sections/about-me';
import { Experience } from '@/components/sections/experience';
import { Projects } from '@/components/sections/projects';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';

export default function Portfolio() {
  return (
    <div className="min-h-screen text-foreground">
      <Navbar />
      <AboutMe />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
