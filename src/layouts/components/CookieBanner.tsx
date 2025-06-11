"use client";

import { useEffect, useState } from "react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
    // Optional: Trigger GA script load here if using manual setup
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow z-50 text-sm flex flex-col sm:flex-row items-center justify-between">
      <span className="mb-2 sm:mb-0 text-center sm:text-left">
        We use cookies to improve your experience and understand how our site is used.
      </span>
      <div className="flex gap-2">
        <button
          onClick={acceptCookies}
          className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Accept
        </button>
        {/* Optional: add a “Manage” button if you offer granular choices later */}
      </div>
    </div>
  );
}
