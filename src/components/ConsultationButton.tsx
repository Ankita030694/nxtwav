import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function ConsultationButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past hero section (approx window innerHeight)
      if (window.scrollY > window.innerHeight * 0.8) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible && !isOpen) return null;

  return (
    <Link
      to="/auth/signup"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-white text-black font-bold py-6 px-3 rounded-l-xl shadow-[0_0_20px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-x-2 group border border-gray-100 flex items-center justify-center overflow-hidden"
      style={{
        writingMode: 'vertical-rl',
        textOrientation: 'mixed',
      }}
    >
      <div className="absolute inset-0 bg-black translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
      <span className="relative block transform rotate-180 uppercase tracking-[0.2em] text-[10px] sm:text-xs group-hover:text-white transition-colors duration-300">
        Get a Free Consultation
      </span>
    </Link>
  );
}
