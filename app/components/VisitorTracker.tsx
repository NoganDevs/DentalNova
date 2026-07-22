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
    hasTracked.current = true;

    const trackVisit = async () => {
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

    trackVisit();
  }, [pathname, searchParams]);

  return null;
}
