import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface Blog {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  date: string;
  image: string;
  author: string;
  slug: string;
  category?: string;
}

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(collection(db, "blogs"), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);
        const fetchedBlogs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Blog[];
        setBlogs(fetchedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-30 pointer-events-none" />
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="outline" className="mb-4 border-primary/50 text-primary px-4 py-1">
              Our Journal
            </Badge>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 bg-gradient-to-r from-primary via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Latest Insights & Stories
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Explore the intersection of music, technology, and career growth. Tips, trends, and inspiration for the next generation of music professionals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
              <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground font-medium">Synthesizing latest posts...</p>
            </div>
          ) : blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full group hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-xl border-border flex flex-col">
                    <div className="relative aspect-video overflow-hidden rounded-t-lg">
                      <img
                        src={blog.image || "https://images.unsplash.com/photo-1514525253361-bee24386b17b?w=800&auto=format&fit=crop&q=60"}
                        alt={blog.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <CardHeader className="flex-grow">
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-primary" />
                          {new Date(blog.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3 text-primary" />
                          {blog.author}
                        </span>
                      </div>
                      <CardTitle className="text-xl font-display group-hover:text-primary transition-colors line-clamp-2">
                        {blog.title}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm mt-3 line-clamp-3 leading-relaxed">
                        {blog.subtitle}
                      </p>
                    </CardHeader>
                    
                    <CardFooter className="pt-0">
                      <Button variant="ghost" className="p-0 hover:bg-transparent text-primary group-hover:gap-2 transition-all font-semibold" asChild>
                        <Link to={`/blog/${blog.slug}`}>
                          Read Article <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-card/30 backdrop-blur-sm rounded-3xl border border-dashed border-border">
              <h3 className="text-2xl font-display font-semibold mb-2">No stories yet</h3>
              <p className="text-muted-foreground">Our contributors are currently crafting new content. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BlogPage;
