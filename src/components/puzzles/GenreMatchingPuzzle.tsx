import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, Music2, ArrowRight, RotateCcw } from "lucide-react";
import type { PuzzleComponentProps } from "./PuzzleGateway";

interface Genre {
  id: string;
  name: string;
  bpm: string;
  characteristics: string[];
  color: string;
}

interface Track {
  id: string;
  name: string;
  description: string;
  correctGenre: string;
  bpm: number;
}

const genres: Genre[] = [
  { 
    id: "house", 
    name: "House", 
    bpm: "120-130",
    characteristics: ["4/4 beat", "Off-beat hi-hats", "Soulful vocals"],
    color: "bg-primary/20 border-primary/50"
  },
  { 
    id: "techno", 
    name: "Techno", 
    bpm: "130-150",
    characteristics: ["Repetitive beats", "Synthesizers", "Dark atmosphere"],
    color: "bg-secondary/20 border-secondary/50"
  },
  { 
    id: "dubstep", 
    name: "Dubstep", 
    bpm: "140",
    characteristics: ["Heavy bass drops", "Half-time drums", "Wobble bass"],
    color: "bg-accent/20 border-accent/50"
  },
  { 
    id: "trance", 
    name: "Trance", 
    bpm: "130-150",
    characteristics: ["Euphoric melodies", "Build-ups", "Arpeggiated synths"],
    color: "bg-amber-500/20 border-amber-500/50"
  },
];

const tracks: Track[] = [
  { 
    id: "1", 
    name: "Midnight Groove",
    description: "125 BPM with soulful vocal chops, off-beat hi-hats, and a rolling bassline.",
    correctGenre: "house",
    bpm: 125
  },
  { 
    id: "2", 
    name: "Dark Machine",
    description: "140 BPM featuring driving kicks, industrial synths, and hypnotic percussion.",
    correctGenre: "techno",
    bpm: 140
  },
  { 
    id: "3", 
    name: "Bass Quake",
    description: "140 BPM half-time rhythm with massive wobble bass and aggressive drops.",
    correctGenre: "dubstep",
    bpm: 140
  },
  { 
    id: "4", 
    name: "Euphoria Rising",
    description: "138 BPM with uplifting melodies, long build-ups, and arpeggiated synth leads.",
    correctGenre: "trance",
    bpm: 138
  },
  { 
    id: "5", 
    name: "Club Classic",
    description: "128 BPM featuring disco samples, funky bassline, and classic 4/4 groove.",
    correctGenre: "house",
    bpm: 128
  },
];

export function GenreMatchingPuzzle({ onComplete, onClose }: PuzzleComponentProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [answers, setAnswers] = useState<{ track: Track; selected: string; correct: boolean }[]>([]);

  const currentTrack = tracks[currentTrackIndex];
  const progress = ((currentTrackIndex + (isRevealed ? 1 : 0)) / tracks.length) * 100;

  const handleGenreSelect = (genreId: string) => {
    if (isRevealed) return;
    setSelectedGenre(genreId);
  };

  const handleSubmit = () => {
    if (!selectedGenre) return;
    
    const isCorrect = selectedGenre === currentTrack.correctGenre;
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setAnswers([...answers, { track: currentTrack, selected: selectedGenre, correct: isCorrect }]);
    setIsRevealed(true);
  };

  const handleNext = () => {
    if (currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
      setSelectedGenre(null);
      setIsRevealed(false);
    } else {
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentTrackIndex(0);
    setSelectedGenre(null);
    setIsRevealed(false);
    setScore(0);
    setIsComplete(false);
    setAnswers([]);
  };

  const handleComplete = () => {
    onComplete(score, tracks.length);
  };

  if (isComplete) {
    return (
      <div className="text-center py-8">
        <div className="w-20 h-20 mx-auto rounded-full bg-accent/20 flex items-center justify-center mb-6">
          <Music2 className="w-10 h-10 text-accent" />
        </div>
        <h3 className="font-display text-2xl font-bold text-foreground mb-2">
          Genre Master!
        </h3>
        <p className="text-muted-foreground mb-6">
          You scored {score} out of {tracks.length} tracks correctly!
        </p>
        
        <div className="bg-muted/50 rounded-xl p-4 mb-6 max-w-md mx-auto">
          <h4 className="font-medium text-foreground mb-3">Your Answers:</h4>
          <div className="space-y-2 text-left">
            {answers.map((answer, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                {answer.correct ? (
                  <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                ) : (
                  <XCircle className="w-4 h-4 text-destructive shrink-0" />
                )}
                <span className="text-foreground">{answer.track.name}:</span>
                <span className={answer.correct ? "text-accent" : "text-destructive"}>
                  {genres.find(g => g.id === answer.selected)?.name}
                </span>
                {!answer.correct && (
                  <span className="text-muted-foreground">
                    (was {genres.find(g => g.id === answer.track.correctGenre)?.name})
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <Button variant="outline" onClick={handleRestart}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Try Again
          </Button>
          <Button onClick={handleComplete} className="bg-gradient-cta hover:opacity-90 text-primary-foreground">
            Continue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Track {currentTrackIndex + 1} of {tracks.length}</span>
          <span className="text-foreground font-medium">Score: {score}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Track Description */}
      <div className="bg-muted/50 rounded-xl p-6 border border-border">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
            <Music2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="font-display text-lg font-bold text-foreground">{currentTrack.name}</h4>
            <p className="text-sm text-muted-foreground">{currentTrack.bpm} BPM</p>
          </div>
        </div>
        <p className="text-foreground">{currentTrack.description}</p>
      </div>

      {/* Genre Options */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">What genre is this track?</h4>
        <div className="grid grid-cols-2 gap-3">
          {genres.map((genre) => {
            const isSelected = selectedGenre === genre.id;
            const isCorrect = genre.id === currentTrack.correctGenre;
            
            let borderClass = "border-border";
            if (isRevealed) {
              if (isCorrect) {
                borderClass = "border-accent bg-accent/10";
              } else if (isSelected) {
                borderClass = "border-destructive bg-destructive/10";
              }
            } else if (isSelected) {
              borderClass = "border-primary bg-primary/10";
            }

            return (
              <button
                key={genre.id}
                onClick={() => handleGenreSelect(genre.id)}
                disabled={isRevealed}
                className={`p-4 rounded-xl border-2 text-left transition-all ${borderClass} ${
                  !isRevealed && "hover:border-primary/50 cursor-pointer"
                } disabled:cursor-default`}
              >
                <h5 className="font-display font-bold text-foreground mb-1">{genre.name}</h5>
                <p className="text-xs text-muted-foreground mb-2">{genre.bpm} BPM</p>
                <div className="flex flex-wrap gap-1">
                  {genre.characteristics.slice(0, 2).map((char) => (
                    <span key={char} className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                      {char}
                    </span>
                  ))}
                </div>
                
                {isRevealed && isCorrect && (
                  <div className="flex items-center gap-1 mt-2 text-accent text-sm">
                    <CheckCircle className="w-4 h-4" />
                    Correct!
                  </div>
                )}
                {isRevealed && isSelected && !isCorrect && (
                  <div className="flex items-center gap-1 mt-2 text-destructive text-sm">
                    <XCircle className="w-4 h-4" />
                    Incorrect
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        {!isRevealed ? (
          <Button 
            onClick={handleSubmit} 
            disabled={!selectedGenre}
            className="bg-gradient-cta hover:opacity-90 text-primary-foreground"
          >
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNext} className="bg-gradient-cta hover:opacity-90 text-primary-foreground">
            {currentTrackIndex < tracks.length - 1 ? (
              <>
                Next Track
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            ) : (
              "See Results"
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
