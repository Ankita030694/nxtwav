"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface FlipDigitProps {
  value: number;
  colorClass?: string;
}

const FlipDigit: React.FC<FlipDigitProps> = ({ value, colorClass = "text-primary" }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const [nextValue, setNextValue] = useState(value);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (value !== displayValue) {
      setNextValue(value);
      setIsAnimating(true);

      setTimeout(() => {
        setDisplayValue(value);
        setTimeout(() => setIsAnimating(false), 150);
      }, 150);
    }
  }, [value, displayValue]);

  return (
    <div className="relative w-[0.65em] h-[1.2em] perspective-[1000px]">
      {/* Background card */}
      <div className="absolute inset-0 rounded bg-card/80 border border-border shadow-lg" />
      
      {/* Current value */}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center font-display font-bold",
        colorClass
      )}>
        {displayValue}
      </div>
      
      {/* Next value (for animation) */}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center font-display font-bold opacity-0",
        colorClass,
        isAnimating && "animate-fade-in"
      )}>
        {nextValue}
      </div>
      
      {/* Flip animation overlay */}
      {isAnimating && (
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 to-transparent rounded animate-pulse" />
      )}
      
      {/* Decorative elements */}
      <div className="absolute left-0 right-0 top-1/2 h-px bg-border/30" />
      <div className="absolute top-0 left-0 w-1 h-1 rounded-full bg-primary/20" />
      <div className="absolute top-0 right-0 w-1 h-1 rounded-full bg-primary/20" />
      <div className="absolute bottom-0 left-0 w-1 h-1 rounded-full bg-primary/20" />
      <div className="absolute bottom-0 right-0 w-1 h-1 rounded-full bg-primary/20" />
    </div>
  );
};

interface AnimatedCounterProps {
  targetValue: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  colorClass?: string;
  className?: string;
}

export function AnimatedCounter({ 
  targetValue, 
  duration = 2000, 
  suffix = "", 
  prefix = "",
  colorClass = "text-primary",
  className 
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const animate = useCallback(() => {
    const startTime = performance.now();
    const startValue = 0;

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.round(startValue + (targetValue - startValue) * easeOutQuart);
      
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(step);
      }
    };

    animationRef.current = requestAnimationFrame(step);
  }, [targetValue, duration]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          animate();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, hasStarted]);

  // Format the number with commas
  const formattedValue = displayValue.toLocaleString();
  const digits = formattedValue.split('');

  return (
    <div ref={ref} className={cn("inline-flex items-center gap-0.5", className)}>
      {prefix && <span className={cn("font-display font-bold mr-1", colorClass)}>{prefix}</span>}
      <div className="flex items-center text-2xl sm:text-3xl">
        {digits.map((digit, index) => (
          digit === ',' ? (
            <span key={`comma-${index}`} className={cn("mx-0.5 font-display", colorClass)}>,</span>
          ) : (
            <FlipDigit 
              key={`digit-${index}`} 
              value={parseInt(digit)} 
              colorClass={colorClass}
            />
          )
        ))}
      </div>
      {suffix && <span className={cn("font-display font-bold ml-1", colorClass)}>{suffix}</span>}
    </div>
  );
}

export default AnimatedCounter;
