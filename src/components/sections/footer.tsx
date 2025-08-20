'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="py-8 px-6 backdrop-blur-md bg-card/50 border-t border-border">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm text-muted-foreground">{t('footer.copyright')}</p>
      </div>
    </footer>
  );
}
