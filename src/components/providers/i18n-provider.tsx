'use client';

import '@/lib/translations/i18n';
import React, { useEffect } from 'react';

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {}, []);

  return <>{children}</>;
}
