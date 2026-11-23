declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let lastConversionTimestamp = 0;

export function trackGoogleAdsConversion(): boolean {
  const now = Date.now();
  // Prevent duplicate conversion fires within a short window (e.g. accidental double-invoke)
  if (now - lastConversionTimestamp < 1500) {
    return false;
  }

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    lastConversionTimestamp = now;
    window.gtag('event', 'conversion', {
      send_to: 'AW-18587761111/SgojCNu_yrwdENfzqp9F',
    });
    return true;
  }

  return false;
}
