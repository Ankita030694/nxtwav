import logo from "@/assets/ableton_certified_trainer_logo.png";
import { cn } from "@/lib/utils";

export function AbletonCertifiedLogo({ className }: { className?: string }) {
  return (
    <img 
      src={logo} 
      alt="Ableton Certified Trainer Logo" 
      className={cn("h-8 w-auto filter invert brightness-200 object-contain shrink-0", className)} 
    />
  );
}
