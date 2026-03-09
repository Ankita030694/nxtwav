import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Play, Calendar, Clock, Users, Bell } from "lucide-react";
import heroStudio from "@/assets/hero-studio.jpg";
import SEO from "@/components/SEO";

const sessions = [
  {
    id: 1,
    title: "Building an EDM Drop from Scratch",
    founder: "Arjun Menon",
    founderRole: "Platinum Producer, Armada Signee",
    date: "January 15, 2025",
    time: "7:00 PM IST",
    duration: "2.5 Hours",
    registered: 340,
    description: "Watch as Arjun builds a complete EDM drop from an empty project - sound design, arrangement, mixing, and all creative decisions explained live.",
    topics: ["Sound Design", "Arrangement", "Build-ups", "Mixing"],
    upcoming: true,
  },
  {
    id: 2,
    title: "Mixing Vocals Like a Pro",
    founder: "Priya Sharma",
    founderRole: "Mix Engineer, Grammy-nominated",
    date: "January 22, 2025",
    time: "7:00 PM IST",
    duration: "2 Hours",
    registered: 285,
    description: "Learn professional vocal mixing techniques - from comp and EQ to creative effects chains that make vocals sit perfectly in any mix.",
    topics: ["Compression", "EQ", "De-essing", "Reverb & Delay"],
    upcoming: true,
  },
  {
    id: 3,
    title: "Creating a Progressive House Track",
    founder: "Arjun Menon",
    founderRole: "Platinum Producer, Armada Signee",
    date: "December 18, 2024",
    time: "7:00 PM IST",
    duration: "3 Hours",
    registered: 520,
    description: "Complete progressive house production from start to finish, including the signature melodic elements and driving basslines.",
    topics: ["Chord Progressions", "Sidechaining", "Automation", "Mastering"],
    upcoming: false,
  },
];

const LiveSessions = () => {
  return (
    <main className="min-h-screen bg-background">
      <SEO 
        title="Live Music Production Sessions | Watch & Learn from Experts"
        description="Join our live monthly sessions with platinum producers and industry experts. Get real-time feedback, ask questions, and watch professional workflows unfold."
        keywords="live music production sessions, producer Q&A, online music masterclass, music career coaching, expert music production"
      />
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroStudio} alt="Studio" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/90 to-background" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium mb-4">
              Live in the Studio
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
              Watch the Magic{" "}
              <span className="text-gradient">Happen Live</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Monthly founder sessions streamed live. Ask questions in real-time, watch creative 
              decisions unfold, and learn techniques you won't find anywhere else.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-gradient-cta hover:opacity-90 text-primary-foreground shadow-glow-blue">
                <Bell className="w-5 h-5 mr-2" />
                Get Notified for Next Session
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Sessions List */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8">
            Upcoming Sessions
          </h2>
          
          <div className="space-y-6 mb-16">
            {sessions.filter(s => s.upcoming).map((session) => (
              <div
                key={session.id}
                className="group p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        <Calendar className="w-4 h-4" />
                        {session.date}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {session.time}
                      </span>
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Users className="w-4 h-4" />
                        {session.registered} registered
                      </span>
                    </div>

                    <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                      {session.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      with <span className="text-foreground">{session.founder}</span> • {session.founderRole}
                    </p>
                    <p className="text-muted-foreground mb-6">
                      {session.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {session.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center gap-3 lg:min-w-[200px]">
                    <Button className="bg-gradient-cta hover:opacity-90 text-primary-foreground">
                      Register for Free
                    </Button>
                    <Button variant="outline" className="border-border text-foreground hover:bg-muted">
                      <Bell className="w-4 h-4 mr-2" />
                      Set Reminder
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="font-display text-2xl font-bold text-foreground mb-8">
            Past Sessions (Replays Available)
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {sessions.filter(s => !s.upcoming).map((session) => (
              <div
                key={session.id}
                className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-sm text-muted-foreground">{session.date}</span>
                  <span className="text-sm text-muted-foreground">• {session.duration}</span>
                </div>

                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {session.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  with {session.founder}
                </p>

                <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted">
                  <Play className="w-4 h-4 mr-2" />
                  Watch Replay
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default LiveSessions;
