import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Gamepad2, 
  Zap, 
  Clock, 
  Star,
  Trophy,
  Target,
  CheckCircle,
  ArrowRight
} from "lucide-react";

export interface PuzzleConfig {
  id: string;
  title: string;
  description: string;
  difficulty: 1 | 2 | 3;
  timeEstimate: string;
  category: string;
  icon: React.ReactNode;
  recommendedCourse: string;
  component: React.ComponentType<PuzzleComponentProps>;
}

export interface PuzzleComponentProps {
  onComplete: (score: number, maxScore: number) => void;
  onClose: () => void;
}

interface PuzzleGatewayProps {
  puzzles: PuzzleConfig[];
  onStartCourses: () => void;
}

export function PuzzleGateway({ puzzles, onStartCourses }: PuzzleGatewayProps) {
  const [selectedPuzzle, setSelectedPuzzle] = useState<PuzzleConfig | null>(null);
  const [completedPuzzles, setCompletedPuzzles] = useState<Set<string>>(new Set());
  const [puzzleScores, setPuzzleScores] = useState<Record<string, { score: number; max: number }>>({});

  const handlePuzzleComplete = (puzzleId: string, score: number, maxScore: number) => {
    setCompletedPuzzles((prev) => new Set([...prev, puzzleId]));
    setPuzzleScores((prev) => ({ ...prev, [puzzleId]: { score, max: maxScore } }));
    setSelectedPuzzle(null);
  };

  const getDifficultyStars = (level: 1 | 2 | 3) => {
    return Array.from({ length: 3 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < level ? "text-amber-400 fill-amber-400" : "text-muted-foreground"
        }`}
      />
    ));
  };

  const totalScore = Object.values(puzzleScores).reduce((acc, { score }) => acc + score, 0);
  const maxPossibleScore = Object.values(puzzleScores).reduce((acc, { max }) => acc + max, 0);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
          <Gamepad2 className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Interactive Learning</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
          Ready to Level Up? <span className="text-gradient">Prove It.</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
          Learn music production concepts while you play. 2-5 minutes per puzzle, 
          instantly rewarding. Your knowledge, your pace, your path.
        </p>

        {/* Progress Stats */}
        {completedPuzzles.size > 0 && (
          <div className="flex justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent/10 border border-accent/20">
              <Trophy className="w-5 h-5 text-accent" />
              <span className="text-foreground font-medium">
                {completedPuzzles.size}/{puzzles.length} Completed
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
              <Target className="w-5 h-5 text-primary" />
              <span className="text-foreground font-medium">
                {totalScore}/{maxPossibleScore} Points
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Featured Puzzles Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {puzzles.map((puzzle) => {
          const isCompleted = completedPuzzles.has(puzzle.id);
          const score = puzzleScores[puzzle.id];

          return (
            <div
              key={puzzle.id}
              className={`group relative rounded-2xl overflow-hidden bg-card border transition-all duration-300 ${
                isCompleted
                  ? "border-accent/50 bg-accent/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              {/* Completed Badge */}
              {isCompleted && (
                <div className="absolute top-4 right-4 z-10">
                  <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                    <CheckCircle className="w-3 h-3" />
                    {score && `${score.score}/${score.max}`}
                  </div>
                </div>
              )}

              <div className="p-6">
                {/* Icon & Category */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    {puzzle.icon}
                  </div>
                  <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                    {puzzle.category}
                  </span>
                </div>

                {/* Title & Description */}
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {puzzle.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {puzzle.description}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {getDifficultyStars(puzzle.difficulty)}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    {puzzle.timeEstimate}
                  </div>
                </div>

                {/* Recommended Course */}
                <p className="text-xs text-muted-foreground mb-4">
                  <Zap className="w-3 h-3 inline mr-1 text-primary" />
                  Recommended: <span className="text-primary">{puzzle.recommendedCourse}</span>
                </p>

                {/* CTA */}
                <Button
                  onClick={() => setSelectedPuzzle(puzzle)}
                  className={`w-full ${
                    isCompleted
                      ? "bg-muted text-foreground hover:bg-muted/80"
                      : "bg-gradient-cta hover:opacity-90 text-primary-foreground"
                  }`}
                >
                  {isCompleted ? "Play Again" : "Play Now"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Skip to Courses CTA */}
      <div className="text-center pt-8 border-t border-border">
        <p className="text-muted-foreground mb-4">
          Already know what you want to learn?
        </p>
        <Button
          variant="outline"
          size="lg"
          onClick={onStartCourses}
          className="border-border text-foreground hover:bg-muted"
        >
          Skip to All Courses
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      {/* Puzzle Modal */}
      <Dialog open={!!selectedPuzzle} onOpenChange={() => setSelectedPuzzle(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedPuzzle?.icon}
              <span>{selectedPuzzle?.title}</span>
            </DialogTitle>
          </DialogHeader>
          {selectedPuzzle && (
            <selectedPuzzle.component
              onComplete={(score, max) => handlePuzzleComplete(selectedPuzzle.id, score, max)}
              onClose={() => setSelectedPuzzle(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
