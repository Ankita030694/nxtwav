import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, BookOpen, Users, Trophy, Play, ArrowRight } from "lucide-react";
import SEO from "@/components/SEO";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const quickActions = [
    {
      icon: Play,
      title: "Continue Learning",
      description: "Pick up where you left off",
      href: "/courses",
      color: "text-primary",
    },
    {
      icon: BookOpen,
      title: "Browse Courses",
      description: "Explore all available courses",
      href: "/courses",
      color: "text-secondary",
    },
    {
      icon: Users,
      title: "Join Live Session",
      description: "Connect with instructors live",
      href: "/live",
      color: "text-accent",
    },
    {
      icon: Trophy,
      title: "Social Corner",
      description: "Share your creations",
      href: "/social",
      color: "text-[hsl(var(--neon-orange))]",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEO title="Dashboard | NXTwav Academy" description="Your student dashboard." noindex={true} />
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              Welcome back{user.displayName ? `, ${user.displayName}` : ''}!
            </h1>
            <p className="text-muted-foreground">
              Ready to create your next hit? Let's get started.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {quickActions.map((action) => (
              <Link key={action.title} to={action.href}>
                <Card className="h-full bg-card hover:bg-card/80 border-border hover:border-primary/50 transition-all duration-300 group cursor-pointer">
                  <CardHeader>
                    <action.icon className={`h-8 w-8 ${action.color} mb-2`} />
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {action.title}
                    </CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Get started <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Progress Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Music className="h-5 w-5 text-primary" />
                  Your Learning Journey
                </CardTitle>
                <CardDescription>
                  Track your progress across all courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-muted-foreground">
                  <Music className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="mb-4">Start your first course to track your progress here!</p>
                  <Button asChild className="bg-gradient-cta hover:opacity-90 text-primary-foreground">
                    <Link to="/courses">Browse Courses</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-accent" />
                  Achievements
                </CardTitle>
                <CardDescription>
                  Your earned badges and milestones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Complete courses to earn achievements!</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
