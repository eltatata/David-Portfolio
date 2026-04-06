'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="py-8 px-6 backdrop-blur-xl bg-card/40 border-t border-border/40">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-sm text-muted-foreground/80">
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
}
