import { useEffect, useState, useMemo, memo } from 'react';
import { useParams, Link } from "react-router-dom";
import { collection, query, where, getDocs, limit, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import TableOfContents from "@/components/TableOfContents";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUser, faQuoteLeft, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { Loader2, Calendar, User, ArrowRight, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "@/components/SEO";

// Define interfaces
export interface Blog {
  id: string;
  title: string;
  description: string;
  date: string;
  image?: string; 
  subtitle?: string;
  created?: number;
  metaTitle?: string;
  metaDescription?: string;
  slug: string;
  author?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  review: string;
}

const authorBios = {
  "Anuj Anand Malik": {
    name: "Anuj Anand Malik",
    description: "Anuj Anand Malik, Founder of AMA Legal Solutions, is a trusted advocate and loan settlement expert. With over a decade of experience, he leads a result-driven law firm that helps individuals achieve legal and financial stability.",
    image: "/anujbhiya.png",
    linkedInUrl: "https://www.linkedin.com/in/iamanujmalik/"
  },
  "Shrey Arora": {
    name: "Shrey Arora",
    description: "Legal professional specializing in corporate law and regulatory compliance. Brings a strategic approach to legal advisory with extensive experience in contract negotiation.",
    image: "/shreychad.svg",
    linkedInUrl: "https://www.linkedin.com/in/shrey-arora-b0487b67/"
  },
  "NXTwav Team": {
    name: "NXTwav Team",
    description: "The official NXTwav Academy editorial team. Curating the best insights for music and technology enthusiasts.",
    image: "https://api.dicebear.com/7.x/initials/svg?seed=NXTwav",
    linkedInUrl: "#"
  }
};

const processContent = (html: string) => {
  const sections: { id: string, title: string }[] = [];
  if (!html) return { content: "", sections: [] };

  // Track the content more broadly to include h2, h3, and h4
  const modifiedContent = html.replace(/<(h[234])(.*?)>(.*?)<\/\1>/g, (match, tag, attrs, title) => {
    const cleanTitle = title.replace(/<[^>]*>/g, '').trim();
    if (!cleanTitle) return match; // Skip empty headers
    
    // Create a URL-safe ID
    const id = cleanTitle.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
    
    sections.push({ id, title: cleanTitle });
    
    if (attrs.includes('id=')) {
      return match;
    }
    
    return `<${tag} id="${id}"${attrs}>${title}</${tag}>`;
  });

  return { content: modifiedContent, sections };
};

const BlogPostDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedFaqs, setExpandedFaqs] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Get Main Blog
        const q = query(collection(db, "blogs"), where("slug", "==", slug), limit(1));
        const querySnapshot = await getDocs(q);
        
        if (querySnapshot.empty) {
          setBlog(null);
          setLoading(false);
          return;
        }

        const blogDoc = querySnapshot.docs[0];
        const blogData = { id: blogDoc.id, ...blogDoc.data() } as Blog;
        setBlog(blogData);

        // Fetch sub-collections (faqs and reviews)
        const faqsSnap = await getDocs(collection(db, "blogs", blogDoc.id, "faqs"));
        setFaqs(faqsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as FAQ)));

        const reviewsSnap = await getDocs(collection(db, "blogs", blogDoc.id, "reviews"));
        setReviews(reviewsSnap.docs.map(doc => ({ 
          id: doc.id, 
          name: doc.data().author || "Anonymous", 
          rating: doc.data().rating || 5, 
          review: doc.data().comment || "" 
        })));

        // Fetch related blogs (based on date, exclude current)
        const relQ = query(collection(db, "blogs"), orderBy("date", "desc"), limit(4));
        const relSnap = await getDocs(relQ);
        setRelatedBlogs(relSnap.docs
          .map(doc => ({ id: doc.id, ...doc.data() } as Blog))
          .filter(b => b.id !== blogDoc.id)
          .slice(0, 2)
        );

      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug]);

  const { content: processedContent, sections } = useMemo(() => {
    return blog ? processContent(blog.description) : { content: "", sections: [] };
  }, [blog]);

  const toggleFaq = (faqId: string) => {
    setExpandedFaqs(prev => 
      prev.includes(faqId) ? prev.filter(id => id !== faqId) : [...prev, faqId]
    );
  };

  const shareUrl = window.location.href;
  const shareTitle = blog?.title || "";

  const handleShare = (platform: string) => {
    let url = "";
    if (platform === "facebook") url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    if (platform === "twitter") url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;
    if (platform === "linkedin") url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    if (url) window.open(url, '_blank', 'width=600,height=400');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground animate-pulse">Loading Story...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-background flex flex-col pt-32 px-4 text-center">
        <Navigation />
        <h1 className="text-4xl font-display font-bold mb-4">Post not found</h1>
        <p className="text-muted-foreground mb-8">The story you're looking for doesn't exist.</p>
        <Link to="/blog" className="text-primary hover:underline">Back to Journal</Link>
        <Footer />
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "Journal", href: "/blog" },
    { label: blog.title, href: `/blog/${blog.slug}` },
  ];

  const author = authorBios[blog.author as keyof typeof authorBios] || authorBios["NXTwav Team"];

  return (
    <main className="min-h-screen bg-background selection:bg-primary/30">
      <SEO 
        title={blog.metaTitle || `${blog.title} | NXTwav Academy Blog`}
        description={blog.metaDescription || blog.subtitle || blog.description.substring(0, 160)}
        keywords={`${blog.title}, music production blog, ${blog.author}, music industry insights`}
      />
      <Navigation />
      
      {/* Hero Header */}
      <section className="relative w-full pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-30 pointer-events-none" />
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <Breadcrumbs items={breadcrumbItems} />
          
          <div className="max-w-4xl mx-auto text-center mt-12 mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight tracking-tight bg-gradient-to-r from-white via-primary/80 to-white/80 bg-clip-text text-transparent"
            >
              {blog.title}
            </motion.h1>
            {blog.subtitle && (
              <p className="text-xl md:text-2xl text-muted-foreground/80 mb-8 font-light italic">
                {blog.subtitle}
              </p>
            )}
            <div className="flex justify-center items-center gap-6 text-sm text-white/70 border-y border-border/50 py-4 max-w-fit mx-auto px-10 rounded-full bg-card/20 backdrop-blur-md">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-primary" /> {new Date(blog.date).toLocaleDateString()}</span>
              <span className="w-1 h-1 bg-border rounded-full" />
              <span className="flex items-center gap-2"><User className="w-4 h-4 text-primary" /> {blog.author}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="container mx-auto px-4 -mt-24 mb-20 relative z-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="aspect-video max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(var(--primary-rgb),0.15)] border border-border group"
        >
          <img 
            src={blog.image || "https://images.unsplash.com/photo-1514525253361-bee24386b17b?w=1200&auto=format&fit=crop&q=80"} 
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        </motion.div>
      </section>

      <div className="px-8 max-w-8xl pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_280px] gap-12 items-start">
          
          {/* Left Sidebar - TOC (Desktop) */}
          <aside className="hidden lg:block sticky top-24 pt-4">
             <TableOfContents sections={sections} orientation="vertical" />
          </aside>

          {/* Main Content Area */}
          <div className="min-w-0">
            {/* TOC (Mobile) */}
            <div className="lg:hidden mb-12">
               <TableOfContents sections={sections} />
            </div>

            <article className="bg-card/30 backdrop-blur-xl p-8 md:p-16 rounded-[2.5rem] border border-border shadow-2xl space-y-16 text-white">
              {/* Proccessed Article Content */}
              <div 
                className="prose prose-lg dark:prose-invert max-w-none tiptap-content text-white 
                  prose-p:leading-relaxed prose-p:text-white/90 
                  prose-headings:font-display prose-headings:font-bold prose-headings:text-primary 
                  prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:scroll-mt-32
                  prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:scroll-mt-32
                  prose-a:text-primary prose-a:font-semibold hover:prose-a:text-primary-foreground
                  prose-img:rounded-2xl prose-img:shadow-2xl 
                  prose-blockquote:border-primary/50 prose-blockquote:bg-primary/5 prose-blockquote:px-8 prose-blockquote:py-6 prose-blockquote:rounded-r-2xl prose-blockquote:text-white/80"
                dangerouslySetInnerHTML={{ __html: processedContent }}
              />

              {/* Share Section */}
              <div className="border-t border-border/50 pt-10 mt-16 text-white">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <span className="font-display font-bold text-xl flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-primary" /> Spread the Knowledge:
                  </span>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => handleShare('facebook')}
                      className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-all hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)]"
                    >
                      <FontAwesomeIcon icon={faFacebook} className="text-xl" />
                    </button>
                    <button 
                      onClick={() => handleShare('twitter')}
                      className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-all hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)]"
                    >
                      <FontAwesomeIcon icon={faTwitter} className="text-xl" />
                    </button>
                    <button 
                      onClick={() => handleShare('linkedin')}
                      className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-white/70 hover:bg-primary hover:text-white transition-all hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.4)]"
                    >
                      <FontAwesomeIcon icon={faLinkedin} className="text-xl" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              {reviews.length > 0 && (
                <section id="reviews" className="scroll-mt-32 border-t border-border pt-16">
                  <h2 className="text-3xl font-display font-bold mb-10 text-primary">Voice of Students</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    {reviews.map((review) => (
                      <div key={review.id} className="bg-muted/30 p-8 rounded-3xl border border-border relative group overflow-hidden">
                        <FontAwesomeIcon icon={faQuoteLeft} className="text-6xl text-primary/10 absolute -top-2 -left-2 transition-transform group-hover:scale-110" />
                        <div className="relative z-10">
                          <div className="flex items-center mb-6">
                            <div className="flex text-primary mr-3">
                              {[...Array(5)].map((_, i) => (
                                <FontAwesomeIcon 
                                  key={i} 
                                  icon={faStar} 
                                  className={i < review.rating ? "text-primary shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]" : "text-muted"} 
                                />
                              ))}
                            </div>
                            <span className="font-bold text-sm bg-primary/20 text-primary px-2 py-0.5 rounded">{review.rating}.0</span>
                          </div>
                          <p className="text-white/80 italic mb-6 leading-relaxed">"{review.review}"</p>
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-primary/10 rounded-full border border-primary/20 flex items-center justify-center text-primary mr-4 overflow-hidden">
                              <FontAwesomeIcon icon={faUser} />
                            </div>
                            <div>
                                <p className="font-bold text-white">{review.name}</p>
                                <p className="text-xs text-white/50 uppercase tracking-wider">Verified Scholar</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* FAQs Section */}
              {faqs.length > 0 && (
                <section id="faqs" className="scroll-mt-32 border-t border-border pt-16">
                  <h2 className="text-3xl font-display font-bold mb-10 text-primary">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {faqs.map((faq) => (
                      <div key={faq.id} className="bg-muted/20 border border-border rounded-2xl overflow-hidden transition-all hover:bg-muted/30">
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="flex justify-between items-center w-full text-left p-6 font-semibold group"
                        >
                          <span className="flex items-center pr-4 text-white">
                            <span className="text-primary mr-4 font-display text-xl">Q.</span>
                            {faq.question}
                          </span>
                          <span className={`w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center transition-all duration-300 ${expandedFaqs.includes(faq.id) ? 'rotate-180 bg-primary/20 text-primary' : 'group-hover:bg-muted'}`}>
                             <ArrowRight className="w-4 h-4 rotate-90" />
                          </span>
                        </button>
                        <AnimatePresence>
                          {expandedFaqs.includes(faq.id) && (
                            <motion.div 
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                              <div className="px-6 pb-8 pt-0 text-white/70 leading-relaxed pl-14">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Related Articles */}
              {relatedBlogs.length > 0 && (
                <section className="border-t border-border pt-16">
                  <h2 className="text-3xl font-display font-bold mb-10">Read Next</h2>
                  <div className="grid md:grid-cols-2 gap-8">
                    {relatedBlogs.map((article) => (
                      <Link key={article.id} to={`/blog/${article.slug}`} className="group block">
                        <div className="bg-card/50 border border-border rounded-3xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-[0_0_30px_rgba(var(--primary-rgb),0.1)] h-full flex flex-col">
                          <div className="relative h-48 overflow-hidden">
                            <img 
                              src={article.image} 
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-md rounded-full px-4 py-1.5 text-xs font-bold text-white shadow-xl">
                              {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </div>
                          </div>
                          <div className="p-8 flex-1 flex flex-col">
                            <h3 className="text-xl font-display font-bold text-white mb-4 group-hover:text-primary transition-colors line-clamp-2">
                              {article.title}
                            </h3>
                            <p className="text-sm text-white/60 mb-6 line-clamp-2 flex-1">
                                {article.subtitle}
                            </p>
                            <span className="text-primary font-bold text-sm flex items-center mt-auto gap-2 group-hover:gap-4 transition-all">
                              Read Article <ArrowRight className="w-4 h-4" />
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </article>
          </div>

          {/* Right Sidebar - Author & CTA */}
          <aside className="space-y-10 sticky top-24 pt-4">
              {/* Author Card */}
              <div className="bg-card/50 backdrop-blur-xl p-8 rounded-[2rem] shadow-sm border border-border group hover:border-primary/30 transition-all text-white">
                <h3 className="text-lg font-display font-bold text-white mb-6 flex items-center gap-2 border-b border-border/50 pb-4">
                  Meet the Author
                </h3>
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full overflow-hidden mr-4 ring-2 ring-primary/20 p-1 bg-gradient-to-tr from-primary to-purple-500">
                    <img 
                      src={author.image}
                      alt={author.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-primary transition-colors">{author.name}</h4>
                    <p className="text-[10px] text-white/50 uppercase tracking-[0.2em]">Contributor</p>
                  </div>
                </div>
                <p className="text-sm text-white/70 mb-6 leading-relaxed line-clamp-4 italic">
                  "{author.description}"
                </p>
                <a 
                  href={author.linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full gap-2 border border-primary/30 text-primary text-center py-3 rounded-xl text-sm font-semibold hover:bg-primary hover:text-white transition-all group-hover:shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]"
                >
                  <FontAwesomeIcon icon={faLinkedin} /> Connect
                </a>
              </div>

              {/* Newsletter / CTA Card */}
              <div className="bg-gradient-to-br from-primary to-indigo-600 p-8 rounded-[2rem] shadow-2xl text-white relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
                <div className="relative z-10">
                  <h3 className="text-2xl font-display font-bold mb-4 leading-snug">Level Up Your Knowledge</h3>
                  <p className="text-white/80 mb-8 text-sm leading-relaxed">
                    Join 5,000+ music students receiving weekly insights and scholarship alerts.
                  </p>
                  <Link 
                    to="/auth/signup" 
                    className="block w-full bg-white text-primary text-center py-4 rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl hover:shadow-white/20"
                  >
                    Start Learning Free
                  </Link>
                </div>
              </div>
          </aside>
        </div>
      </div>

      {/* Global Tiptap Styles Adaptation */}
      <style>{`
        .tiptap-content h2 { scroll-margin-top: 100px; }
        .tiptap-content h3 { scroll-margin-top: 100px; }
      `}</style>

      <Footer />
    </main>
  );
};

export default BlogPostDetail;
