'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function VisitorTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasTracked = useRef(false);

  useEffect(() => {
    // Prevent duplicate tracking on re-renders in React Strict Mode
    if (hasTracked.current) return;

    const trackVisit = async () => {
      // Double check to prevent racing calls inside event listeners
      if (hasTracked.current) return;
      hasTracked.current = true;

      const clientReferrer = document.referrer || '';
      const utmSource = searchParams.get('utm_source') || searchParams.get('ref');

      try {
        await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clientReferrer,
            clientPath: pathname,
            utmSource,
          }),
        });
      } catch (error) {
        console.error('Failed to log visit:', error);
      }
    };

    // If page is already completely loaded, track after browser is idle
    if (document.readyState === 'complete') {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => trackVisit());
      } else {
        setTimeout(trackVisit, 0);
      }
    } else {
      // Wait for the full window load event (images, CSS, subresources completely ready)
      const handleLoad = () => {
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(() => trackVisit());
        } else {
          trackVisit();
        }
      };

      window.addEventListener('load', handleLoad, { once: true });

      return () => {
        window.removeEventListener('load', handleLoad);
      };
    }
  }, [pathname, searchParams]);

  return null;
}
