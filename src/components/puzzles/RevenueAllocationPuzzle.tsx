import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { PuzzleComponentProps } from "./PuzzleGateway";
import { CheckCircle, XCircle, Volume2, RotateCcw } from "lucide-react";

interface RevenueStream {
  id: string;
  name: string;
  icon: string;
  description: string;
  riskLevel: "low" | "medium" | "high";
  incomeType: "active" | "passive" | "hybrid";
  allocation: number;
}

const REVENUE_STREAMS: RevenueStream[] = [
  {
    id: "production",
    name: "Production Services",
    icon: "🎹",
    description: "Ghost production, remixes, mixing for clients",
    riskLevel: "low",
    incomeType: "active",
    allocation: 0,
  },
  {
    id: "djgigs",
    name: "DJ Gigs",
    icon: "🎧",
    description: "Club residencies, festivals, private events",
    riskLevel: "medium",
    incomeType: "active",
    allocation: 0,
  },
  {
    id: "streaming",
    name: "Streaming Royalties",
    icon: "📊",
    description: "Spotify, Apple Music, YouTube royalties",
    riskLevel: "medium",
    incomeType: "passive",
    allocation: 0,
  },
  {
    id: "sync",
    name: "Sync Licensing",
    icon: "🎬",
    description: "TV, film, ads, video games placement",
    riskLevel: "high",
    incomeType: "passive",
    allocation: 0,
  },
  {
    id: "teaching",
    name: "Teaching",
    icon: "📚",
    description: "Online courses, 1-on-1 mentoring, workshops",
    riskLevel: "low",
    incomeType: "active",
    allocation: 0,
  },
  {
    id: "merch",
    name: "Merchandise",
    icon: "👕",
    description: "Branded clothing, sample packs, presets",
    riskLevel: "medium",
    incomeType: "hybrid",
    allocation: 0,
  },
];

export function RevenueAllocationPuzzle({ onComplete, onClose }: PuzzleComponentProps) {
  const [streams, setStreams] = useState<RevenueStream[]>(REVENUE_STREAMS);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string[]>([]);

  const totalAllocation = streams.reduce((acc, s) => acc + s.allocation, 0);

  const handleAllocationChange = (id: string, value: number) => {
    setStreams((prev) =>
      prev.map((s) => (s.id === id ? { ...s, allocation: value } : s))
    );
  };

  const resetAllocations = () => {
    setStreams(REVENUE_STREAMS);
    setShowResult(false);
    setFeedback([]);
  };

  const analyzeStrategy = () => {
    const analysis: string[] = [];
    let calculatedScore = 0;

    // Check total allocation
    if (totalAllocation !== 100) {
      analysis.push(`⚠️ Total allocation is ${totalAllocation}%. Aim for exactly 100%.`);
    } else {
      calculatedScore += 20;
      analysis.push("✅ Total allocation equals 100%.");
    }

    // Count active vs passive income
    const activeIncome = streams
      .filter((s) => s.incomeType === "active")
      .reduce((acc, s) => acc + s.allocation, 0);
    const passiveIncome = streams
      .filter((s) => s.incomeType === "passive")
      .reduce((acc, s) => acc + s.allocation, 0);
    const hybridIncome = streams
      .filter((s) => s.incomeType === "hybrid")
      .reduce((acc, s) => acc + s.allocation, 0);

    if (passiveIncome >= 20 && passiveIncome <= 40) {
      calculatedScore += 20;
      analysis.push("✅ Good balance of passive income streams.");
    } else if (passiveIncome < 20) {
      analysis.push("💡 Consider more passive income for long-term sustainability.");
    } else {
      analysis.push("💡 Don't rely too heavily on passive income early on.");
    }

    // Check diversification
    const activeStreams = streams.filter((s) => s.allocation > 0).length;
    if (activeStreams >= 4) {
      calculatedScore += 20;
      analysis.push("✅ Excellent diversification across income streams.");
    } else if (activeStreams >= 3) {
      calculatedScore += 10;
      analysis.push("💡 Consider adding one more income stream for stability.");
    } else {
      analysis.push("⚠️ Too concentrated. Diversify to reduce risk.");
    }

    // Check for overreliance on high-risk
    const highRiskAllocation = streams
      .filter((s) => s.riskLevel === "high")
      .reduce((acc, s) => acc + s.allocation, 0);

    if (highRiskAllocation <= 25) {
      calculatedScore += 20;
      analysis.push("✅ Appropriate risk management.");
    } else {
      analysis.push("⚠️ High-risk streams are too dominant. Sync deals are unpredictable.");
    }

    // Check for teaching (low risk, great for beginners)
    const teachingStream = streams.find((s) => s.id === "teaching");
    if (teachingStream && teachingStream.allocation >= 15) {
      calculatedScore += 10;
      analysis.push("✅ Teaching is a reliable income while building your brand.");
    }

    // Check for production services
    const productionStream = streams.find((s) => s.id === "production");
    if (productionStream && productionStream.allocation >= 20) {
      calculatedScore += 10;
      analysis.push("✅ Production services provide steady client-based income.");
    }

    setScore(Math.min(calculatedScore, 100));
    setFeedback(analysis);
    setShowResult(true);
  };

  const handleComplete = () => {
    onComplete(score, 100);
  };

  const getRiskColor = (risk: "low" | "medium" | "high") => {
    switch (risk) {
      case "low": return "text-accent";
      case "medium": return "text-amber-400";
      case "high": return "text-destructive";
    }
  };

  const getIncomeTypeColor = (type: "active" | "passive" | "hybrid") => {
    switch (type) {
      case "active": return "bg-primary/10 text-primary";
      case "passive": return "bg-accent/10 text-accent";
      case "hybrid": return "bg-secondary/10 text-secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Scenario */}
      <div className="p-4 rounded-xl bg-muted/50 border border-border">
        <h4 className="font-medium text-foreground mb-2">💰 Scenario</h4>
        <p className="text-sm text-muted-foreground">
          You've built a following and want to go full-time in music. 
          Plan your revenue diversification by allocating effort (as %) to different income streams.
          <span className="block mt-2 text-primary">
            Goal: Create a sustainable, diversified income strategy that totals 100%.
          </span>
        </p>
      </div>

      {/* Allocation Meter */}
      <div className="p-4 rounded-xl bg-card border border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Total Allocation</span>
          <span className={`text-lg font-bold ${
            totalAllocation === 100 ? "text-accent" : totalAllocation > 100 ? "text-destructive" : "text-amber-400"
          }`}>
            {totalAllocation}%
          </span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${
              totalAllocation === 100 ? "bg-accent" : totalAllocation > 100 ? "bg-destructive" : "bg-primary"
            }`}
            style={{ width: `${Math.min(totalAllocation, 100)}%` }}
          />
        </div>
      </div>

      {/* Revenue Streams */}
      <div className="space-y-4">
        {streams.map((stream) => (
          <div
            key={stream.id}
            className="p-4 rounded-xl bg-card border border-border"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{stream.icon}</span>
                <div>
                  <h4 className="font-medium text-foreground">{stream.name}</h4>
                  <p className="text-xs text-muted-foreground">{stream.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded ${getIncomeTypeColor(stream.incomeType)}`}>
                  {stream.incomeType}
                </span>
                <span className={`text-xs ${getRiskColor(stream.riskLevel)}`}>
                  {stream.riskLevel} risk
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Slider
                value={[stream.allocation]}
                min={0}
                max={50}
                step={5}
                onValueChange={([v]) => handleAllocationChange(stream.id, v)}
                className="flex-1"
                disabled={showResult}
              />
              <span className="w-12 text-right font-mono text-lg font-bold text-foreground">
                {stream.allocation}%
              </span>
            </div>
          </div>
        ))}
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
            <div className="flex-1">
              <h4 className="font-medium text-foreground mb-2">
                {score >= 70 ? "Smart diversification!" : score >= 50 ? "Good start!" : "Room for improvement"}
              </h4>
              <ul className="space-y-1">
                {feedback.map((item, i) => (
                  <li key={i} className="text-sm text-muted-foreground">{item}</li>
                ))}
              </ul>
              <p className="text-lg font-bold text-foreground mt-3">Score: {score}/100</p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={resetAllocations}>
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
            <Button 
              onClick={analyzeStrategy} 
              className="bg-gradient-cta text-primary-foreground"
              disabled={totalAllocation !== 100}
            >
              Analyze Strategy
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
