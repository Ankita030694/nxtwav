import logo from "@/assets/ableton_certified_trainer_logo.png";
import { cn } from "@/lib/utils";

export function AbletonCertifiedLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center", className)}>
      <img 
        src={logo} 
        alt="Ableton Certified Trainer Logo" 
        className="h-8 w-auto filter invert brightness-200" 
      />
    </div>
  );
}
