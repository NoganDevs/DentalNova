'use client';

import { useEffect, useState } from 'react';

export default function PrivacyOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check hash on mount and hashchange
    const handleHashChange = () => {
      setIsOpen(window.location.hash === '#privacy');
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const closeModal = () => {
    setIsOpen(false);
    if (window.location.hash === '#privacy') {
      window.history.pushState(
        '',
        document.title,
        window.location.pathname + window.location.search
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-zinc-800 bg-zinc-900/95 p-6 text-zinc-100 shadow-2xl backdrop-blur-xl sm:p-8"
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          aria-label="Close Privacy Overlay"
          className="absolute right-5 top-5 text-xl text-zinc-400 transition-colors hover:text-white"
        >
          ✕
        </button>

        {/* Modal Content */}
        <h2 className="mb-3 text-2xl font-bold tracking-tight text-white">
          Privacy Policy
        </h2>

        <p className="mb-4 text-sm leading-relaxed text-zinc-400">
          Your privacy matters to us. We keep data collection to an absolute minimum to ensure a transparent experience.
        </p>

        <div className="space-y-4 text-sm text-zinc-300">
          <div>
            <h3 className="font-semibold text-white">What We Collect</h3>
            <ul className="mt-1.5 list-disc space-y-1 pl-5 text-zinc-400">
              <li>
                <strong className="text-zinc-200">Referral Source:</strong> The site, link, or campaign platform you arrived from.
              </li>
              <li>
                <strong className="text-zinc-200">Landing URL:</strong> The specific page address you visited on our site.
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white">Why We Collect It</h3>
            <p className="mt-1 leading-relaxed text-zinc-400">
              This basic analytics data helps us track traffic sources, measure visitor engagement, and improve site performance.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-white">Data Protection</h3>
            <p className="mt-1 leading-relaxed text-zinc-400">
              We do not track or store personal identifiers (such as names, emails, or IP addresses). This data is strictly used for internal traffic analysis and is never sold or shared.
            </p>
          </div>
        </div>

        {/* Dismiss Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={closeModal}
            className="rounded-xl bg-zinc-100 px-5 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-white"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
