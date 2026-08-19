// app/components/VisitorTracker.tsx
'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function VisitorTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasTracked = useRef(false);

  useEffect(() => {
    // 1. ADD THIS GUARD: TypeScript now knows searchParams isn't null after this line.
    if (!searchParams) return;

    if (hasTracked.current) return;

    const trackVisit = async () => {
      if (hasTracked.current) return;
      hasTracked.current = true;

      const clientReferrer = document.referrer || '';
      
      // 2. SAFE ACCESS: Now that we checked if searchParams exists, get() is safe.
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

    if (document.readyState === 'complete') {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => trackVisit());
      } else {
        setTimeout(trackVisit, 0);
      }
    } else {
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
