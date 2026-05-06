import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CourseCard } from "@/components/courses/CourseCard";
import { CategoryFilter } from "@/components/courses/CategoryFilter";
import { CategoryHeader } from "@/components/courses/CategoryHeader";
import { Button } from "@/components/ui/button";
import { courses, CourseCategory, getCoursesByCategory } from "@/data/courses";
import { Gamepad2, Wifi, MapPin } from "lucide-react";
import SEO from "@/components/SEO";

// Logic Pro course IDs are online, all others are offline
const ONLINE_COURSE_IDS = ["logic-pro-kickstart", "logic-pro-mastery"];

const CoursesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<CourseCategory | "all">("all");

  useEffect(() => {
    if (location.hash) {
      const scrollWithRetries = (retries = 0) => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        
        if (element) {
          setTimeout(() => {
            const y = element.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }, 50);
        } else if (retries < 10) {
          setTimeout(() => scrollWithRetries(retries + 1), 100);
        }
      };

      scrollWithRetries();
    }
  }, [location.hash]);

  const filteredCourses = activeCategory === "all" 
    ? courses 
    : getCoursesByCategory(activeCategory);

  const productionCourses = getCoursesByCategory("production");
  const onlineProductionCourses = productionCourses.filter(c => ONLINE_COURSE_IDS.includes(c.id));
  const offlineProductionCourses = productionCourses.filter(c => !ONLINE_COURSE_IDS.includes(c.id));
  const djingCourses = getCoursesByCategory("djing");
  const artistDevCourses = getCoursesByCategory("artist-dev");

  // For filtered view of production, also split into online/offline
  const filteredOnlineCourses = filteredCourses.filter(c => c.category === "production" && ONLINE_COURSE_IDS.includes(c.id));
  const filteredOfflineCourses = filteredCourses.filter(c => c.category === "production" && !ONLINE_COURSE_IDS.includes(c.id));

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-50" />
        <div className="absolute inset-0 bg-gradient-glow" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Our Programs
            </span>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6">
              Courses Designed for <span className="text-gradient">Career Success</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10">
              From fundamentals to professional-level skills - choose the path that matches your goals. Real industry experience, real mentors, real results.
            </p>
            
            <CategoryFilter 
              activeCategory={activeCategory} 
              onCategoryChange={setActiveCategory} 
            />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Link to Puzzles */}
          <div className="flex justify-center mb-12">
            <Button 
              variant="outline" 
              onClick={() => navigate("/interactive-learning")}
              className="border-border text-foreground hover:bg-muted"
            >
              <Gamepad2 className="w-4 h-4 mr-2" />
              Try Interactive Learning
            </Button>
          </div>

          {activeCategory === "all" ? (
            <div className="space-y-20">
              {/* Production Category */}
              <div id="production" className="scroll-mt-32">
                <CategoryHeader category="production" />
                
                {/* Offline Sub-section */}
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full">
                      <MapPin className="w-4 h-4 text-secondary" />
                      <span className="text-sm font-semibold text-secondary tracking-wide uppercase">Offline</span>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-secondary/30 to-transparent" />
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {offlineProductionCourses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                </div>

                {/* Online Sub-section */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
                      <Wifi className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-semibold text-green-400 tracking-wide uppercase">Online</span>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-green-500/30 to-transparent" />
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {onlineProductionCourses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                </div>
              </div>

              {/* DJing Category */}
              <div id="djing" className="scroll-mt-32">
                <CategoryHeader category="djing" />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {djingCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>

              {/* Artist Development Category */}
              <div id="artist-dev" className="scroll-mt-32">
                <CategoryHeader category="artist-dev" />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {artistDevCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>
            </div>
          ) : activeCategory === "production" ? (
            <div>
              <CategoryHeader category={activeCategory} />
              
              {/* Offline Sub-section */}
              {filteredOfflineCourses.length > 0 && (
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-2 px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-full">
                      <MapPin className="w-4 h-4 text-secondary" />
                      <span className="text-sm font-semibold text-secondary tracking-wide uppercase">Offline</span>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-secondary/30 to-transparent" />
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredOfflineCourses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                </div>
              )}

              {/* Online Sub-section */}
              {filteredOnlineCourses.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
                      <Wifi className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-semibold text-green-400 tracking-wide uppercase">Online</span>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-green-500/30 to-transparent" />
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredOnlineCourses.map((course) => (
                      <CourseCard key={course.id} course={course} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              <CategoryHeader category={activeCategory} />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CoursesPage;
