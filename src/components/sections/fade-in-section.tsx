'use client';

import React, { type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FadeInSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function FadeInSection({
  children,
  delay = 0,
  className = '',
}: FadeInSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
