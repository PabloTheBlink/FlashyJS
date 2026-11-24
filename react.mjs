import React from 'react';
import flashy from './dist/flashy.mjs';

export function Toaster({ position, theme, duration, visibleToasts } = {}) {
  React.useEffect(() => {
    flashy.setDefaults(Object.fromEntries(Object.entries({ position, theme, duration, visibleToasts }).filter(([, value]) => value !== undefined)));
  }, [position, theme, duration, visibleToasts]);
  return null;
}

export function useFlashy() {
  return flashy;
}
