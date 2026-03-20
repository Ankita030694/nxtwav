import { Link, useLocation } from "react-router-dom";

export function ConsultationButton() {
  const location = useLocation();

  // Hide the button if already on the career expert signup page
  if (location.pathname === "/auth/signup") return null;

  return (
    <Link
      to="/auth/signup"
      className="fixed right-0 top-1/2 -translate-y-1/2 z-[49] bg-white text-black font-bold py-6 px-3 rounded-l-xl shadow-[0_0_20px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-x-2 group border border-gray-100 flex items-center justify-center overflow-hidden"
      style={{
        writingMode: 'vertical-rl',
        textOrientation: 'mixed',
      }}
    >
      <div className="absolute inset-0 bg-black translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
      <span className="relative block transform rotate-180 uppercase tracking-[0.2em] text-[10px] sm:text-xs group-hover:text-white transition-colors duration-300">
        Talk to our Career Expert
      </span>
    </Link>
  );
}
