import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { PuzzleComponentProps } from "./PuzzleGateway";
import { CheckCircle, XCircle, Volume2, Play, RotateCcw } from "lucide-react";

interface SynthParam {
  name: string;
  value: number;
  target: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  tolerance: number;
}

export function SoundDesignPuzzle({ onComplete, onClose }: PuzzleComponentProps) {
  const [params, setParams] = useState<SynthParam[]>([
    { name: "Oscillator", value: 0, target: 2, min: 0, max: 3, step: 1, unit: "", tolerance: 0 },
    { name: "Filter Cutoff", value: 50, target: 35, min: 0, max: 100, step: 5, unit: "%", tolerance: 15 },
    { name: "Resonance", value: 0, target: 40, min: 0, max: 100, step: 5, unit: "%", tolerance: 15 },
    { name: "Attack", value: 50, target: 10, min: 0, max: 100, step: 5, unit: "ms", tolerance: 15 },
    { name: "Decay", value: 50, target: 60, min: 0, max: 100, step: 5, unit: "ms", tolerance: 15 },
    { name: "Sustain", value: 50, target: 70, min: 0, max: 100, step: 5, unit: "%", tolerance: 15 },
    { name: "Release", value: 50, target: 40, min: 0, max: 100, step: 5, unit: "ms", tolerance: 15 },
  ]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const oscillatorTypes = ["Sine", "Triangle", "Saw", "Square"];

  const handleParamChange = (index: number, value: number) => {
    setParams((prev) =>
      prev.map((p, i) => (i === index ? { ...p, value } : p))
    );
  };

  const resetParams = () => {
    setParams((prev) =>
      prev.map((p) => ({ ...p, value: p.name === "Oscillator" ? 0 : 50 }))
    );
    setShowResult(false);
  };

  const checkAnswer = () => {
    let correct = 0;
    params.forEach((param) => {
      if (Math.abs(param.value - param.target) <= param.tolerance) {
        correct++;
      }
    });
    const calculatedScore = Math.round((correct / params.length) * 100);
    setScore(calculatedScore);
    setShowResult(true);
  };

  const handleComplete = () => {
    onComplete(score, 100);
  };

  const getParamStatus = (param: SynthParam) => {
    if (!showResult) return "neutral";
    return Math.abs(param.value - param.target) <= param.tolerance ? "correct" : "incorrect";
  };

  // Visual synth display
  const renderWaveform = () => {
    const oscType = params[0].value;
    const paths = {
      0: "M0,50 Q25,20 50,50 T100,50", // Sine
      1: "M0,50 L25,20 L50,50 L75,80 L100,50", // Triangle
      2: "M0,80 L50,20 L50,80 L100,20", // Saw
      3: "M0,20 L25,20 L25,80 L75,80 L75,20 L100,20", // Square
    };
    return paths[oscType as keyof typeof paths] || paths[0];
  };

  return (
    <div className="space-y-6">
      {/* Scenario */}
      <div className="p-4 rounded-xl bg-muted/50 border border-border">
        <h4 className="font-medium text-foreground mb-2">🎹 Scenario</h4>
        <p className="text-sm text-muted-foreground">
          Design a classic bass synth sound. Match the target by adjusting the oscillator type,
          filter, and ADSR envelope.
          <span className="block mt-2 text-primary">
            Target: Punchy, filtered saw bass with quick attack and medium release.
          </span>
        </p>
      </div>

      {/* Synth Visualization */}
      <div className="p-6 rounded-xl bg-card border border-border">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Waveform Display */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Oscillator Waveform</h4>
            <div className="h-24 bg-muted/30 rounded-lg border border-border overflow-hidden relative">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                  d={renderWaveform()}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                />
              </svg>
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-muted rounded text-xs font-medium text-foreground">
                {oscillatorTypes[params[0].value]}
              </div>
            </div>

            {/* Oscillator Selector */}
            <div className="grid grid-cols-4 gap-2">
              {oscillatorTypes.map((type, i) => (
                <button
                  key={type}
                  onClick={() => handleParamChange(0, i)}
                  disabled={showResult}
                  className={`p-2 rounded-lg text-xs font-medium transition-all ${
                    params[0].value === i
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  } ${
                    showResult && i === params[0].target
                      ? "ring-2 ring-accent"
                      : ""
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* ADSR Envelope Visualization */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">ADSR Envelope</h4>
            <div className="h-24 bg-muted/30 rounded-lg border border-border overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* ADSR Shape */}
                <path
                  d={`M0,100 
                      L${params[3].value / 4},${100 - 80} 
                      L${params[3].value / 4 + params[4].value / 4},${100 - params[5].value * 0.8} 
                      L${70},${100 - params[5].value * 0.8} 
                      L${70 + params[6].value / 4},100`}
                  fill="hsl(var(--primary) / 0.2)"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                />
                {/* Labels */}
                <text x="5" y="95" fontSize="8" fill="currentColor" className="text-muted-foreground">A</text>
                <text x="25" y="95" fontSize="8" fill="currentColor" className="text-muted-foreground">D</text>
                <text x="50" y="95" fontSize="8" fill="currentColor" className="text-muted-foreground">S</text>
                <text x="80" y="95" fontSize="8" fill="currentColor" className="text-muted-foreground">R</text>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Parameter Sliders */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Filter Section */}
        <div className="p-4 rounded-xl bg-card border border-border space-y-4">
          <h4 className="font-medium text-foreground">Filter</h4>
          {params.slice(1, 3).map((param, idx) => {
            const actualIndex = idx + 1;
            const status = getParamStatus(param);
            return (
              <div key={param.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{param.name}</span>
                  <span className={`font-mono ${
                    status === "correct" ? "text-accent" : status === "incorrect" ? "text-destructive" : "text-foreground"
                  }`}>
                    {param.value}{param.unit}
                    {showResult && status === "incorrect" && (
                      <span className="text-xs text-muted-foreground ml-2">
                        (target: {param.target}{param.unit})
                      </span>
                    )}
                  </span>
                </div>
                <Slider
                  value={[param.value]}
                  min={param.min}
                  max={param.max}
                  step={param.step}
                  onValueChange={([v]) => handleParamChange(actualIndex, v)}
                  disabled={showResult}
                />
              </div>
            );
          })}
        </div>

        {/* ADSR Section */}
        <div className="p-4 rounded-xl bg-card border border-border space-y-4">
          <h4 className="font-medium text-foreground">Envelope (ADSR)</h4>
          {params.slice(3).map((param, idx) => {
            const actualIndex = idx + 3;
            const status = getParamStatus(param);
            return (
              <div key={param.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{param.name}</span>
                  <span className={`font-mono ${
                    status === "correct" ? "text-accent" : status === "incorrect" ? "text-destructive" : "text-foreground"
                  }`}>
                    {param.value}{param.unit}
                    {showResult && status === "incorrect" && (
                      <span className="text-xs text-muted-foreground ml-2">
                        (target: {param.target}{param.unit})
                      </span>
                    )}
                  </span>
                </div>
                <Slider
                  value={[param.value]}
                  min={param.min}
                  max={param.max}
                  step={param.step}
                  onValueChange={([v]) => handleParamChange(actualIndex, v)}
                  disabled={showResult}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Result */}
      {showResult && (
        <div className={`p-4 rounded-xl border ${
          score >= 70
            ? "bg-accent/10 border-accent/30"
            : score >= 50
            ? "bg-amber-500/10 border-amber-500/30"
            : "bg-destructive/10 border-destructive/30"
        }`}>
          <div className="flex items-start gap-3">
            {score >= 70 ? (
              <CheckCircle className="w-6 h-6 text-accent shrink-0" />
            ) : (
              <XCircle className="w-6 h-6 text-destructive shrink-0" />
            )}
            <div>
              <h4 className="font-medium text-foreground mb-1">
                {score >= 85 ? "Sound design master!" : score >= 70 ? "Great sound!" : score >= 50 ? "Getting there!" : "Keep experimenting!"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {score >= 70
                  ? "By understanding oscillators, filters, and envelopes, you unlock infinite sound possibilities. This foundational knowledge is essential for modern music production."
                  : "For a punchy bass: use Saw wave, lower the filter cutoff, add some resonance, quick attack, medium decay/sustain, and moderate release."}
              </p>
              <p className="text-lg font-bold text-foreground mt-2">Score: {score}/100</p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={resetParams}>
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {showResult ? (
            <Button onClick={handleComplete} className="bg-gradient-cta text-primary-foreground">
              Continue
            </Button>
          ) : (
            <Button onClick={checkAnswer} className="bg-gradient-cta text-primary-foreground">
              Check Sound
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
