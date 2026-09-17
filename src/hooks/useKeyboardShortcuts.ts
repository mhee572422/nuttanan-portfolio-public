import { useEffect } from 'react';

export function useKeyboardShortcuts() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input, textarea, or contenteditable
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      // Ignore if modifier keys are pressed (except shift)
      if (e.metaKey || e.ctrlKey || e.altKey) {
        return;
      }

      const key = e.key.toLowerCase();
      
      const sectionMap: Record<string, string> = {
        'h': 'home',
        'a': 'about',
        's': 'skills',
        'e': 'experience',
        'c': 'contact',
        'p': 'projects',
        't': 'testimonials',
        'u': 'activity', // 'u' for updates/activity
      };

      if (sectionMap[key]) {
        if (key === 'h') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const element = document.getElementById(sectionMap[key]);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}
