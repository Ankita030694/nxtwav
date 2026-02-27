import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { PuzzleComponentProps } from "./PuzzleGateway";
import { Volume2, RotateCcw, CheckCircle, XCircle } from "lucide-react";

interface EQBand {
  name: string;
  frequency: string;
  value: number;
  target: number;
  tolerance: number;
}

export function FrequencyBalancePuzzle({ onComplete, onClose }: PuzzleComponentProps) {
  const [bands, setBands] = useState<EQBand[]>([
    { name: "Sub Bass", frequency: "60Hz", value: 0, target: -3, tolerance: 2 },
    { name: "Low Mids", frequency: "250Hz", value: 0, target: -2, tolerance: 2 },
    { name: "Presence", frequency: "2kHz", value: 0, target: 2, tolerance: 2 },
    { name: "Air", frequency: "8kHz", value: 0, target: 1, tolerance: 2 },
  ]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const audioRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);

  const handleBandChange = (index: number, value: number) => {
    setBands((prev) =>
      prev.map((band, i) => (i === index ? { ...band, value } : band))
    );
  };

  const resetBands = () => {
    setBands((prev) => prev.map((band) => ({ ...band, value: 0 })));
    setShowResult(false);
  };

  const checkAnswer = () => {
    let correct = 0;
    bands.forEach((band) => {
      if (Math.abs(band.value - band.target) <= band.tolerance) {
        correct++;
      }
    });
    const calculatedScore = Math.round((correct / bands.length) * 100);
    setScore(calculatedScore);
    setShowResult(true);
  };

  const handleComplete = () => {
    onComplete(score, 100);
  };

  const getSliderColor = (band: EQBand) => {
    if (!showResult) return "bg-primary";
    const isCorrect = Math.abs(band.value - band.target) <= band.tolerance;
    return isCorrect ? "bg-accent" : "bg-destructive";
  };

  return (
    <div className="space-y-6">
      {/* Scenario */}
      <div className="p-4 rounded-xl bg-muted/50 border border-border">
        <h4 className="font-medium text-foreground mb-2">🎤 Scenario</h4>
        <p className="text-sm text-muted-foreground">
          You're mixing a vocal track that sounds muddy and lacks clarity. 
          Adjust the 4-band EQ to make the vocals clearer without losing warmth.
          <span className="block mt-2 text-primary">
            Hint: Cut the lows, boost the highs slightly.
          </span>
        </p>
      </div>

      {/* EQ Visualization */}
      <div className="p-6 rounded-xl bg-card border border-border">
        <div className="flex items-center justify-between mb-6">
          <h4 className="font-medium text-foreground">4-Band Parametric EQ</h4>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={resetBands}
              className="border-border"
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          </div>
        </div>

        {/* Frequency Response Graph */}
        <div className="relative h-32 mb-8 bg-muted/30 rounded-lg border border-border overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 400 100" preserveAspectRatio="none">
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="400"
                y2={y}
                stroke="currentColor"
                strokeOpacity="0.1"
                className="text-muted-foreground"
              />
            ))}
            {/* Center line (0 dB) */}
            <line
              x1="0"
              y1="50"
              x2="400"
              y2="50"
              stroke="currentColor"
              strokeOpacity="0.3"
              className="text-primary"
            />
            {/* EQ Curve */}
            <path
              d={`M 0,50 
                  Q 50,${50 - bands[0].value * 3} 100,${50 - bands[0].value * 2}
                  Q 150,${50 - bands[1].value * 3} 200,${50 - bands[1].value * 2}
                  Q 250,${50 - bands[2].value * 3} 300,${50 - bands[2].value * 2}
                  Q 350,${50 - bands[3].value * 3} 400,${50 - bands[3].value * 2}`}
              fill="none"
              stroke="url(#eqGradient)"
              strokeWidth="3"
            />
            <defs>
              <linearGradient id="eqGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="50%" stopColor="hsl(var(--secondary))" />
                <stop offset="100%" stopColor="hsl(var(--accent))" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Frequency labels */}
          <div className="absolute bottom-1 left-0 right-0 flex justify-between px-4 text-xs text-muted-foreground">
            <span>20Hz</span>
            <span>200Hz</span>
            <span>2kHz</span>
            <span>20kHz</span>
          </div>
        </div>

        {/* EQ Sliders */}
        <div className="grid grid-cols-4 gap-4">
          {bands.map((band, index) => (
            <div key={band.name} className="space-y-3">
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">{band.name}</p>
                <p className="text-xs text-muted-foreground">{band.frequency}</p>
              </div>
              
              <div className="flex flex-col items-center gap-2">
                <div className="h-40 flex flex-col items-center justify-center">
                  <Slider
                    orientation="vertical"
                    value={[band.value]}
                    min={-12}
                    max={12}
                    step={1}
                    onValueChange={([v]) => handleBandChange(index, v)}
                    className="h-32"
                  />
                </div>
                <div className={`text-sm font-mono px-2 py-1 rounded ${
                  showResult
                    ? Math.abs(band.value - band.target) <= band.tolerance
                      ? "bg-accent/20 text-accent"
                      : "bg-destructive/20 text-destructive"
                    : "bg-muted text-foreground"
                }`}>
                  {band.value > 0 ? "+" : ""}{band.value}dB
                </div>
              </div>

              {showResult && (
                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Target: {band.target > 0 ? "+" : ""}{band.target}dB
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Result */}
      {showResult && (
        <div className={`p-4 rounded-xl border ${
          score >= 75
            ? "bg-accent/10 border-accent/30"
            : score >= 50
            ? "bg-amber-500/10 border-amber-500/30"
            : "bg-destructive/10 border-destructive/30"
        }`}>
          <div className="flex items-start gap-3">
            {score >= 75 ? (
              <CheckCircle className="w-6 h-6 text-accent shrink-0" />
            ) : (
              <XCircle className="w-6 h-6 text-destructive shrink-0" />
            )}
            <div>
              <h4 className="font-medium text-foreground mb-1">
                {score >= 75 ? "Excellent!" : score >= 50 ? "Good effort!" : "Keep practicing!"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {score >= 75
                  ? "You've created clarity without harshness. This 'scooping' EQ technique is used on vocals, guitars, and drums throughout professional music."
                  : "Try cutting the low frequencies and boosting the high-mids for more presence."}
              </p>
              <p className="text-lg font-bold text-foreground mt-2">Score: {score}/100</p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        {showResult ? (
          <Button onClick={handleComplete} className="bg-gradient-cta text-primary-foreground">
            Continue
          </Button>
        ) : (
          <Button onClick={checkAnswer} className="bg-gradient-cta text-primary-foreground">
            Check Answer
          </Button>
        )}
      </div>
    </div>
  );
}
