import React from 'react';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Particles from '@/components/animated/particles';
import { ThemeProvider } from '@/components/providers/theme-provider';
import './globals.css';
import { I18nProvider } from '@/components/providers/i18n-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'David Portfolio',
  description:
    'Full Stack Developer portfolio showcasing modern web applications built with Next.js, TypeScript, and AI integration. Features interactive chat, multilingual support, dark/light themes, animated UI components, and a comprehensive showcase of professional experience and projects in software development.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative z-10 w-full">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <I18nProvider>{children}</I18nProvider>
          </ThemeProvider>
        </div>
        <div className="fixed inset-0 w-full h-full -z-10">
          <Particles
            particleColors={['#00FF00']}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={130}
            moveParticlesOnHover={false}
            alphaParticles={true}
            disableRotation={false}
          />
        </div>
      </body>
    </html>
  );
}
