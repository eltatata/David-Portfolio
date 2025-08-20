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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
