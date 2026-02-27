import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Instagram, Youtube, TrendingUp, Clock, Play, Heart, MessageCircle, Eye } from "lucide-react";

type FeedType = "instagram" | "youtube";
type SortType = "latest" | "trending";

interface SocialPost {
  id: string;
  platform: "instagram" | "youtube";
  thumbnail: string;
  title: string;
  views: string;
  likes: string;
  comments: string;
  date: string;
  videoUrl: string;
}

const mockPosts: SocialPost[] = [
  {
    id: "1",
    platform: "instagram",
    thumbnail: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400",
    title: "Behind the scenes of our latest production session 🎹",
    views: "45.2K",
    likes: "3.2K",
    comments: "156",
    date: "2 hours ago",
    videoUrl: "#",
  },
  {
    id: "2",
    platform: "youtube",
    thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400",
    title: "How to Mix Vocals Like a Pro | NXTwav Tutorial",
    views: "128K",
    likes: "8.5K",
    comments: "342",
    date: "1 day ago",
    videoUrl: "#",
  },
  {
    id: "3",
    platform: "instagram",
    thumbnail: "https://images.unsplash.com/photo-1614149162883-504ce4d13909?w=400",
    title: "Student spotlight: @maya_beats drops fire! 🔥",
    views: "32.1K",
    likes: "2.8K",
    comments: "98",
    date: "3 days ago",
    videoUrl: "#",
  },
  {
    id: "4",
    platform: "youtube",
    thumbnail: "https://images.unsplash.com/photo-1571974599782-87624638275e?w=400",
    title: "Live DJ Set from NXTwav Studio",
    views: "89.5K",
    likes: "6.2K",
    comments: "421",
    date: "5 days ago",
    videoUrl: "#",
  },
  {
    id: "5",
    platform: "instagram",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400",
    title: "When your student hits 1M streams 💿",
    views: "67.8K",
    likes: "5.1K",
    comments: "234",
    date: "1 week ago",
    videoUrl: "#",
  },
  {
    id: "6",
    platform: "youtube",
    thumbnail: "https://images.unsplash.com/photo-1619983081563-430f63602796?w=400",
    title: "Ableton Live 12 - Complete Beginners Guide",
    views: "256K",
    likes: "15.2K",
    comments: "892",
    date: "2 weeks ago",
    videoUrl: "#",
  },
];

export function TrendingFeedSection() {
  const [activeTab, setActiveTab] = useState<FeedType>("instagram");
  const [sortBy, setSortBy] = useState<SortType>("trending");

  const filteredPosts = mockPosts.filter((post) => post.platform === activeTab);

  return (
    <section className="py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Trending Now
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Fresh from Our Socials
            </h2>
          </div>

          <div className="flex flex-wrap gap-4">
            {/* Platform Toggle */}
            <div className="flex rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => setActiveTab("instagram")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === "instagram"
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <Instagram className="w-4 h-4" />
                Instagram
              </button>
              <button
                onClick={() => setActiveTab("youtube")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                  activeTab === "youtube"
                    ? "bg-destructive text-white"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <Youtube className="w-4 h-4" />
                YouTube
              </button>
            </div>

            {/* Sort Toggle */}
            <div className="flex rounded-lg border border-border overflow-hidden">
              <button
                onClick={() => setSortBy("trending")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                  sortBy === "trending"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <TrendingUp className="w-4 h-4" />
                Trending
              </button>
              <button
                onClick={() => setSortBy("latest")}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                  sortBy === "latest"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                <Clock className="w-4 h-4" />
                Latest
              </button>
            </div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="group relative rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
                
                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center">
                    <Play className="w-6 h-6 text-primary-foreground fill-current" />
                  </div>
                </div>

                {/* Platform badge */}
                <div className="absolute top-3 left-3">
                  {post.platform === "instagram" ? (
                    <div className="p-2 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600">
                      <Instagram className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="p-2 rounded-lg bg-destructive">
                      <Youtube className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <p className="text-sm text-muted-foreground mb-2">{post.date}</p>
                <h3 className="font-medium text-foreground line-clamp-2 mb-3">
                  {post.title}
                </h3>

                {/* Metrics */}
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {post.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" />
                    {post.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    {post.comments}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-10">
          <Button variant="outline" className="border-border text-foreground hover:bg-muted">
            Load More Content
          </Button>
        </div>
      </div>
    </section>
  );
}
