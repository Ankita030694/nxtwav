import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PuzzleComponentProps } from "./PuzzleGateway";
import { CheckCircle, XCircle, GripVertical, ArrowRight } from "lucide-react";

interface TimelineStep {
  id: string;
  label: string;
  icon: string;
  correctPosition: number;
}

const STEPS: TimelineStep[] = [
  { id: "create", label: "Create Music", icon: "🎵", correctPosition: 0 },
  { id: "metadata", label: "Prepare Metadata", icon: "📝", correctPosition: 1 },
  { id: "tiktok", label: "TikTok Campaign", icon: "📱", correctPosition: 2 },
  { id: "release", label: "DIY Release", icon: "🚀", correctPosition: 3 },
  { id: "playlists", label: "Submit to Playlists", icon: "📋", correctPosition: 4 },
  { id: "email", label: "Build Email List", icon: "📧", correctPosition: 5 },
];

export function ReleaseStrategyPuzzle({ onComplete, onClose }: PuzzleComponentProps) {
  const [userOrder, setUserOrder] = useState<TimelineStep[]>(() => 
    [...STEPS].sort(() => Math.random() - 0.5)
  );
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const handleDragStart = (id: string) => {
    setDraggedItem(id);
  };

  const handleDragOver = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedItem || draggedItem === targetId) return;

    const draggedIndex = userOrder.findIndex((s) => s.id === draggedItem);
    const targetIndex = userOrder.findIndex((s) => s.id === targetId);

    const newOrder = [...userOrder];
    const [removed] = newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, removed);
    setUserOrder(newOrder);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const handleTouchMove = (id: string, targetId: string) => {
    if (id === targetId) return;
    
    const draggedIndex = userOrder.findIndex((s) => s.id === id);
    const targetIndex = userOrder.findIndex((s) => s.id === targetId);

    const newOrder = [...userOrder];
    const [removed] = newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, removed);
    setUserOrder(newOrder);
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= userOrder.length) return;

    const newOrder = [...userOrder];
    [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
    setUserOrder(newOrder);
  };

  const checkAnswer = () => {
    let correct = 0;
    userOrder.forEach((step, index) => {
      if (step.correctPosition === index) {
        correct++;
      }
    });
    const calculatedScore = Math.round((correct / STEPS.length) * 100);
    setScore(calculatedScore);
    setShowResult(true);
  };

  const resetOrder = () => {
    setUserOrder([...STEPS].sort(() => Math.random() - 0.5));
    setShowResult(false);
  };

  const handleComplete = () => {
    onComplete(score, 100);
  };

  const getItemStatus = (step: TimelineStep, index: number) => {
    if (!showResult) return "neutral";
    return step.correctPosition === index ? "correct" : "incorrect";
  };

  return (
    <div className="space-y-6">
      {/* Scenario */}
      <div className="p-4 rounded-xl bg-muted/50 border border-border">
        <h4 className="font-medium text-foreground mb-2">🚀 Scenario</h4>
        <p className="text-sm text-muted-foreground">
          You've finished your debut track. Plan your release strategy for maximum 
          reach and revenue. Arrange these steps in the optimal sequence.
          <span className="block mt-2 text-primary">
            Drag and drop to reorder, or use arrows on mobile.
          </span>
        </p>
      </div>

      {/* Timeline */}
      <div className="space-y-3">
        {userOrder.map((step, index) => {
          const status = getItemStatus(step, index);
          
          return (
            <div
              key={step.id}
              draggable
              onDragStart={() => handleDragStart(step.id)}
              onDragOver={(e) => handleDragOver(e, step.id)}
              onDragEnd={handleDragEnd}
              className={`group flex items-center gap-4 p-4 rounded-xl border transition-all cursor-grab active:cursor-grabbing ${
                draggedItem === step.id
                  ? "opacity-50 border-primary bg-primary/10"
                  : status === "correct"
                  ? "border-accent bg-accent/10"
                  : status === "incorrect"
                  ? "border-destructive bg-destructive/10"
                  : "border-border bg-card hover:border-primary/50"
              }`}
            >
              {/* Drag Handle */}
              <div className="text-muted-foreground">
                <GripVertical className="w-5 h-5" />
              </div>

              {/* Step Number */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                status === "correct"
                  ? "bg-accent text-accent-foreground"
                  : status === "incorrect"
                  ? "bg-destructive text-destructive-foreground"
                  : "bg-primary text-primary-foreground"
              }`}>
                {index + 1}
              </div>

              {/* Icon */}
              <span className="text-2xl">{step.icon}</span>

              {/* Label */}
              <span className="flex-1 font-medium text-foreground">
                {step.label}
              </span>

              {/* Mobile Controls */}
              <div className="flex gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveItem(index, "up")}
                  disabled={index === 0 || showResult}
                  className="h-8 w-8 p-0"
                >
                  ↑
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => moveItem(index, "down")}
                  disabled={index === userOrder.length - 1 || showResult}
                  className="h-8 w-8 p-0"
                >
                  ↓
                </Button>
              </div>

              {/* Result Icon */}
              {showResult && (
                status === "correct" ? (
                  <CheckCircle className="w-5 h-5 text-accent" />
                ) : (
                  <XCircle className="w-5 h-5 text-destructive" />
                )
              )}
            </div>
          );
        })}
      </div>

      {/* Connecting Lines */}
      {!showResult && (
        <div className="flex justify-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Tip: Think about what needs to happen before release vs after</span>
          </div>
        </div>
      )}

      {/* Result */}
      {showResult && (
        <div className={`p-4 rounded-xl border ${
          score >= 80
            ? "bg-accent/10 border-accent/30"
            : score >= 50
            ? "bg-amber-500/10 border-amber-500/30"
            : "bg-destructive/10 border-destructive/30"
        }`}>
          <div className="flex items-start gap-3">
            {score >= 80 ? (
              <CheckCircle className="w-6 h-6 text-accent shrink-0" />
            ) : (
              <XCircle className="w-6 h-6 text-destructive shrink-0" />
            )}
            <div>
              <h4 className="font-medium text-foreground mb-1">
                {score >= 80 ? "Excellent!" : score >= 50 ? "Almost there!" : "Keep learning!"}
              </h4>
              <p className="text-sm text-muted-foreground">
                {score >= 80
                  ? "You understand the modern release playbook. Independent artists who coordinate pre-release hype, smart timing, and post-release pitching achieve 3x more streams."
                  : "The key is building anticipation before release (social campaigns), then amplifying after (playlist pitching, email building)."}
              </p>
              <p className="text-lg font-bold text-foreground mt-2">Score: {score}/100</p>
            </div>
          </div>
        </div>
      )}

      {/* Correct Order Hint (shown after wrong answer) */}
      {showResult && score < 100 && (
        <div className="p-4 rounded-xl bg-muted/50 border border-border">
          <h4 className="font-medium text-foreground mb-2">📖 Correct Order:</h4>
          <div className="flex flex-wrap gap-2">
            {STEPS.sort((a, b) => a.correctPosition - b.correctPosition).map((step, i) => (
              <div key={step.id} className="flex items-center gap-1">
                <span className="text-sm text-muted-foreground">{i + 1}.</span>
                <span className="text-sm text-foreground">{step.label}</span>
                {i < STEPS.length - 1 && <ArrowRight className="w-3 h-3 text-muted-foreground" />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={resetOrder} disabled={showResult}>
          Shuffle Again
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
              Check Answer
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
