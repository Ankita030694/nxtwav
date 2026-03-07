import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-t-2 border-secondary animate-spin [animation-duration:1.5s]"></div>
        <div className="absolute inset-4 rounded-full border-t-2 border-accent animate-spin [animation-duration:2s]"></div>
      </div>
      <div className="text-primary font-display font-medium animate-pulse">Loading NXTwav...</div>
    </div>
  );
}

export function PageLoader() {
  const { loading: authLoading } = useAuth();
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    // Trigger "loading" state on navigation
    setIsNavigating(true);
    
    // Total transition duration (artificial for smooth feel)
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 500); // Reduced from 600ms

    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);

  useEffect(() => {
    // Only show if we are still loading after a grace period
    if (authLoading || isNavigating) {
      const gracePeriod = setTimeout(() => {
        setShouldShow(true);
      }, 150); // 150ms grace period to avoid flashing on instant loads

      return () => clearTimeout(gracePeriod);
    } else {
      setShouldShow(false);
    }
  }, [authLoading, isNavigating]);

  if (!shouldShow) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md transition-opacity duration-300">
      <LoadingSpinner />
    </div>
  );
}
