import { Button } from "@/components/ui/button";
import { Play, Calendar, Clock, Users, MessageCircle } from "lucide-react";

const upcomingSessions = [
  {
    id: 1,
    title: "Building an EDM Drop from Scratch",
    founder: "Arjun Menon",
    date: "January 15, 2025",
    time: "7:00 PM IST",
    viewers: 340,
    live: false,
  },
  {
    id: 2,
    title: "Mixing Vocals Like a Pro",
    founder: "Priya Sharma",
    date: "January 22, 2025",
    time: "7:00 PM IST",
    viewers: 0,
    live: false,
  },
];

export function LiveSessionsSection() {
  return (
    <section id="live" className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
              Live in the Studio
            </span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              Watch the Magic{" "}
              <span className="text-gradient">Happen Live</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Every month, our founders go live producing music from scratch. Ask questions in 
              real-time, watch creative decisions unfold, and learn techniques you won't find 
              in any textbook.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="text-2xl font-bold text-foreground mb-1">12</div>
                <p className="text-sm text-muted-foreground">Sessions Per Year</p>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="text-2xl font-bold text-foreground mb-1">2+ Hours</div>
                <p className="text-sm text-muted-foreground">Per Session</p>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="text-2xl font-bold text-foreground mb-1">Live Q&A</div>
                <p className="text-sm text-muted-foreground">Chat With Founders</p>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="text-2xl font-bold text-foreground mb-1">Replay Access</div>
                <p className="text-sm text-muted-foreground">Watch Anytime</p>
              </div>
            </div>

            <Button size="lg" className="bg-gradient-cta hover:opacity-90 text-primary-foreground shadow-glow-blue">
              <Play className="w-5 h-5 mr-2" />
              Register for Free Access
            </Button>
          </div>

          {/* Upcoming Sessions */}
          <div className="space-y-4">
            <h3 className="font-display text-xl font-semibold text-foreground mb-6">
              Upcoming Sessions
            </h3>
            
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-display font-semibold text-foreground mb-1">
                      {session.title}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      with {session.founder}
                    </p>
                  </div>
                  {session.live && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-destructive/10 text-destructive rounded-full text-xs font-medium">
                      <span className="w-1.5 h-1.5 bg-destructive rounded-full animate-pulse" />
                      LIVE NOW
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {session.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {session.time}
                  </div>
                  {session.viewers > 0 && (
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {session.viewers} registered
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <Button size="sm" variant="outline" className="border-border text-foreground hover:bg-muted">
                    Set Reminder
                  </Button>
                  <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Join Community
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
