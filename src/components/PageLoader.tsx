import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

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
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Show loader when location changes
    setIsLoading(true);

    // Hide loader after a short delay to allow for page transitions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600); // 600ms corresponds to a satisfying transition

    return () => clearTimeout(timer);
  }, [location.pathname, location.search]); // We don't trigger on hash change for smooth anchor navigation

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/90 backdrop-blur-md transition-opacity duration-300">
      <LoadingSpinner />
    </div>
  );
}
