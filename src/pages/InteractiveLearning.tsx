import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { PuzzleGateway, PuzzleConfig } from "@/components/puzzles/PuzzleGateway";
import { FrequencyBalancePuzzle } from "@/components/puzzles/FrequencyBalancePuzzle";
import { GenreMatchingPuzzle } from "@/components/puzzles/GenreMatchingPuzzle";
import { ReleaseStrategyPuzzle } from "@/components/puzzles/ReleaseStrategyPuzzle";
import { BeatDetectionPuzzle } from "@/components/puzzles/BeatDetectionPuzzle";
import { SoundDesignPuzzle } from "@/components/puzzles/SoundDesignPuzzle";
import { RevenueAllocationPuzzle } from "@/components/puzzles/RevenueAllocationPuzzle";
import { Sliders, Calendar, Music, Headphones, DollarSign } from "lucide-react";
import SEO from "@/components/SEO";

const puzzles: PuzzleConfig[] = [
  {
    id: "eq-challenge",
    title: "Frequency Balance",
    description: "Clear up muddy vocals using a 4-band EQ. Learn the fundamentals of frequency mixing.",
    difficulty: 1,
    timeEstimate: "3 min",
    category: "Mixing",
    icon: <Sliders className="w-6 h-6" />,
    recommendedCourse: "Intermediate Music Production",
    component: FrequencyBalancePuzzle,
  },
  {
    id: "release-strategy",
    title: "Release Strategy",
    description: "Plan the perfect release timeline for maximum reach and engagement.",
    difficulty: 2,
    timeEstimate: "4 min",
    category: "Business",
    icon: <Calendar className="w-6 h-6" />,
    recommendedCourse: "NXTwav ACADEMY ~ REMIX PRODUCTION MASTERCLASS w/ Su Real",
    component: ReleaseStrategyPuzzle,
  },
  {
    id: "beat-detection",
    title: "Beat Detection",
    description: "Train your ear to identify kick drums and build rhythmic awareness.",
    difficulty: 1,
    timeEstimate: "2 min",
    category: "DJing",
    icon: <Headphones className="w-6 h-6" />,
    recommendedCourse: "DJ Beginner",
    component: BeatDetectionPuzzle,
  },
  {
    id: "sound-design",
    title: "Synth Explorer",
    description: "Design a bass sound by manipulating oscillator, filter, and ADSR envelope.",
    difficulty: 2,
    timeEstimate: "4 min",
    category: "Production",
    icon: <Music className="w-6 h-6" />,
    recommendedCourse: "Advanced Production Mastery",
    component: SoundDesignPuzzle,
  },
  {
    id: "revenue-allocation",
    title: "Revenue Diversification",
    description: "Build a sustainable income strategy across multiple revenue streams.",
    difficulty: 3,
    timeEstimate: "5 min",
    category: "Business",
    icon: <DollarSign className="w-6 h-6" />,
    recommendedCourse: "Artist Development Programme",
    component: RevenueAllocationPuzzle,
  },
  {
    id: "genre-matching",
    title: "Genre Master",
    description: "Match audio clips to their genres and build your ear for different styles.",
    difficulty: 1,
    timeEstimate: "3 min",
    category: "Knowledge",
    icon: <Music className="w-6 h-6" />,
    recommendedCourse: "Intermediate Music Production",
    component: GenreMatchingPuzzle,
  },
];

const InteractiveLearning = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-background">
      <SEO 
        title="Interactive Music Learning Challenges | NXTwav Academy"
        description="Test your music production, mixing, and DJing skills with our interactive challenges. Find the right learning path for your musical journey."
        keywords="music production puzzles, ear training, mixing challenges, DJ skill test, interactive music education"
      />
      <Navigation />      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-50" />
        <div className="absolute inset-0 bg-gradient-glow" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Interactive Learning
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
              Prove Your Skills, <span className="text-gradient">Find Your Path</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10">
              Complete quick challenges to discover the perfect courses for your skill level.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <PuzzleGateway 
            puzzles={puzzles} 
            onStartCourses={() => navigate("/courses")} 
          />
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default InteractiveLearning;
