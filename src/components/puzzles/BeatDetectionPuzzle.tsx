import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { PuzzleComponentProps } from "./PuzzleGateway";
import { CheckCircle, XCircle, Play, Pause, RotateCcw, Volume2 } from "lucide-react";
import { Slider } from "@/components/ui/slider";

interface Beat {
  time: number; // in seconds
  clicked: boolean;
  correct: boolean | null;
}

// Simulated beat positions for an 8-bar loop at 120 BPM (each beat is 0.5s)
const BEAT_TIMES = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5];
const KICK_TIMES = [0, 1, 2, 3, 4, 5, 6, 7]; // Kick on every downbeat
const TOLERANCE = 0.25; // 250ms tolerance

export function BeatDetectionPuzzle({ onComplete, onClose }: PuzzleComponentProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [userClicks, setUserClicks] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [accuracy, setAccuracy] = useState<("hit" | "miss" | "extra")[]>([]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const startTimeRef = useRef<number>(0);
  const animationRef = useRef<number>(0);

  const duration = 8; // 8 seconds

  const playBeat = useCallback((frequency: number = 100, duration: number = 0.1) => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    
    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.frequency.value = frequency;
    osc.type = "sine";
    
    gain.gain.setValueAtTime(0.5, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  }, []);

  const startPlayback = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }
    
    audioContextRef.current.resume();
    startTimeRef.current = audioContextRef.current.currentTime;
    setIsPlaying(true);
    setUserClicks([]);
    setShowResult(false);
    
    // Schedule beats
    BEAT_TIMES.forEach((beatTime) => {
      const isKick = KICK_TIMES.includes(beatTime);
      setTimeout(() => {
        if (isKick) {
          playBeat(80, 0.15); // Lower frequency for kick
        } else {
          playBeat(200, 0.05); // Higher frequency for hi-hat
        }
      }, beatTime * 1000);
    });

    // Animation loop
    const animate = () => {
      if (!audioContextRef.current) return;
      
      const elapsed = audioContextRef.current.currentTime - startTimeRef.current;
      setCurrentTime(elapsed);
      
      if (elapsed < duration) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsPlaying(false);
        calculateScore();
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
  }, [playBeat]);

  const stopPlayback = () => {
    setIsPlaying(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleClick = () => {
    if (!isPlaying || !audioContextRef.current) return;
    
    const clickTime = audioContextRef.current.currentTime - startTimeRef.current;
    setUserClicks((prev) => [...prev, clickTime]);
    
    // Visual feedback
    playBeat(400, 0.05);
  };

  const calculateScore = () => {
    const kicksHit: boolean[] = new Array(KICK_TIMES.length).fill(false);
    const clickAccuracy: ("hit" | "miss" | "extra")[] = [];
    
    userClicks.forEach((click) => {
      let foundMatch = false;
      KICK_TIMES.forEach((kickTime, index) => {
        if (Math.abs(click - kickTime) <= TOLERANCE && !kicksHit[index]) {
          kicksHit[index] = true;
          foundMatch = true;
        }
      });
      clickAccuracy.push(foundMatch ? "hit" : "extra");
    });

    const hitsCount = kicksHit.filter(Boolean).length;
    const calculatedScore = Math.round((hitsCount / KICK_TIMES.length) * 100);
    
    setScore(calculatedScore);
    setAccuracy(clickAccuracy);
    setShowResult(true);
  };

  const reset = () => {
    stopPlayback();
    setCurrentTime(0);
    setUserClicks([]);
    setShowResult(false);
    setScore(0);
  };

  const handleComplete = () => {
    onComplete(score, 100);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      audioContextRef.current?.close();
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Scenario */}
      <div className="p-4 rounded-xl bg-muted/50 border border-border">
        <h4 className="font-medium text-foreground mb-2">🎧 Scenario</h4>
        <p className="text-sm text-muted-foreground">
          Listen to this 8-second loop. Click or tap when you hear the <strong>kick drum</strong> (the low, thumping beat).
          <span className="block mt-2 text-primary">
            There are 8 kick hits. Try to click as close to each beat as possible!
          </span>
        </p>
      </div>

      {/* Waveform Visualization */}
      <div className="relative h-32 bg-card rounded-xl border border-border overflow-hidden">
        {/* Progress bar */}
        <div
          className="absolute inset-y-0 left-0 bg-primary/20 transition-all"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
        
        {/* Beat markers */}
        {KICK_TIMES.map((time, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-0.5 bg-primary/50"
            style={{ left: `${(time / duration) * 100}%` }}
          />
        ))}
        
        {/* User clicks */}
        {userClicks.map((time, i) => (
          <div
            key={i}
            className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full ${
              showResult
                ? accuracy[i] === "hit"
                  ? "bg-accent"
                  : "bg-destructive"
                : "bg-secondary"
            }`}
            style={{ left: `${(time / duration) * 100}%` }}
          />
        ))}

        {/* Center click zone */}
        <div className="absolute inset-0 flex items-center justify-center">
          {!isPlaying && !showResult && (
            <p className="text-muted-foreground text-sm">Press Play, then click to mark beats</p>
          )}
          {isPlaying && (
            <p className="text-primary text-lg font-bold animate-pulse">
              Click when you hear the KICK! 🥁
            </p>
          )}
        </div>
      </div>

      {/* Click Zone Button */}
      <Button
        onClick={handleClick}
        disabled={!isPlaying}
        className={`w-full h-24 text-xl font-bold transition-all ${
          isPlaying
            ? "bg-gradient-cta hover:opacity-90 text-primary-foreground animate-pulse"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {isPlaying ? "🥁 TAP HERE ON THE BEAT!" : "Press Play to Start"}
      </Button>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <Button
          variant="outline"
          size="lg"
          onClick={reset}
          disabled={isPlaying}
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          Reset
        </Button>
        <Button
          size="lg"
          onClick={isPlaying ? stopPlayback : startPlayback}
          className="bg-gradient-cta text-primary-foreground"
          disabled={showResult}
        >
          {isPlaying ? (
            <>
              <Pause className="w-5 h-5 mr-2" />
              Stop
            </>
          ) : (
            <>
              <Play className="w-5 h-5 mr-2" />
              Play Loop
            </>
          )}
        </Button>
      </div>

      {/* Stats */}
      <div className="flex justify-center gap-6 text-sm">
        <div className="text-center">
          <p className="text-muted-foreground">Your Clicks</p>
          <p className="text-2xl font-bold text-foreground">{userClicks.length}</p>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground">Target Kicks</p>
          <p className="text-2xl font-bold text-foreground">{KICK_TIMES.length}</p>
        </div>
        <div className="text-center">
          <p className="text-muted-foreground">Time</p>
          <p className="text-2xl font-bold text-foreground">{currentTime.toFixed(1)}s</p>
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
                {score >= 90 ? "Perfect timing!" : score >= 75 ? "Great rhythm!" : score >= 50 ? "Good effort!" : "Keep practicing!"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {score >= 75
                  ? "You've got a solid beat sense. This is the foundation for DJing - knowing beat location is crucial for beatmatching and scratching."
                  : "Listen for the low 'thump' of the kick drum. It's usually the loudest, lowest sound in the loop."}
              </p>
              <div className="mt-2 flex items-center gap-4">
                <p className="text-lg font-bold text-foreground">Score: {score}/100</p>
                <p className="text-sm text-muted-foreground">
                  ({accuracy.filter(a => a === "hit").length}/{KICK_TIMES.length} kicks hit)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onClose}>
          Close
        </Button>
        {showResult && (
          <Button onClick={handleComplete} className="bg-gradient-cta text-primary-foreground">
            Continue
          </Button>
        )}
      </div>
    </div>
  );
}
