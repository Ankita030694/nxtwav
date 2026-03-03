import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getCourseBySlug, getInstructorById, formatPrice, categoryInfo } from "@/data/courses";
import { Clock, Users, GraduationCap, CheckCircle, ArrowLeft, Calendar, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const course = slug ? getCourseBySlug(slug) : undefined;
  const instructor = course ? getInstructorById(course.instructorId) : undefined;

  if (!course) {
    return (
      <main className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 pt-32 pb-16 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Course Not Found</h1>
          <Button asChild><Link to="/courses">Back to Courses</Link></Button>
        </div>
        <Footer />
      </main>
    );
  }

  const category = categoryInfo[course.category];
  const colorClass = course.category === "production" ? "primary" : course.category === "djing" ? "secondary" : "accent";

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <Link to="/courses" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Courses
          </Link>
          
          <div className="flex flex-wrap gap-3 mb-4">
            <span className={cn("px-3 py-1 rounded-full text-xs font-medium uppercase", `bg-${colorClass}/10 text-${colorClass}`)}>
              {category.label}
            </span>
            <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium capitalize">
              {course.level}
            </span>
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">{course.title}</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl">{course.tagline}</p>
          
          <div className="flex flex-wrap gap-6 text-muted-foreground">
            <div className="flex items-center gap-2"><Clock className="w-5 h-5" /> {course.duration.months || course.duration.weeks} {course.duration.months ? "Months" : "Weeks"}</div>
            <div className="flex items-center gap-2"><Users className="w-5 h-5" /> {course.sessionsPerWeek} sessions/week</div>
            <div className="flex items-center gap-2"><GraduationCap className="w-5 h-5" /> {course.totalSessions} Sessions</div>
            <div className="flex items-center gap-2 text-foreground font-semibold">{formatPrice(course.price)}</div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">About This Course</h2>
                <p className="text-muted-foreground leading-relaxed">{course.longDescription}</p>
              </div>

              {/* Learning Outcomes */}
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">What You'll Learn</h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {course.learningOutcomes.map((outcome) => (
                    <div key={outcome} className="flex items-start gap-3">
                      <CheckCircle className={cn("w-5 h-5 shrink-0 mt-0.5", `text-${colorClass}`)} />
                      <span className="text-foreground">{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Curriculum */}
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">Course Curriculum</h2>
                <Accordion type="single" collapsible className="space-y-3">
                  {course.sessions.map((session) => (
                    <AccordionItem key={session.sessionNumber} value={`session-${session.sessionNumber}`} className="border border-border rounded-lg px-4 bg-card">
                      <AccordionTrigger className="hover:no-underline py-4">
                        <div className="flex items-center gap-4 text-left">
                          <span className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium", `bg-${colorClass}/10 text-${colorClass}`)}>
                            {session.sessionNumber}
                          </span>
                          <div>
                            <p className="font-semibold text-foreground">{session.title}</p>
                            <p className="text-sm text-muted-foreground">{session.duration} hours</p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4 pt-2">
                        <div className="pl-12 space-y-4">
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Objectives</h4>
                            <ul className="space-y-1">
                              {session.objectives.map((obj) => (
                                <li key={obj} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="text-primary">•</span> {obj}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground mb-2">Topics</h4>
                            <ul className="space-y-1">
                              {session.topics.map((topic) => (
                                <li key={topic} className="text-sm text-muted-foreground flex items-start gap-2">
                                  <span className="text-secondary">•</span> {topic}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="p-3 bg-muted rounded-lg">
                            <h4 className="font-medium text-foreground mb-1">Exercise</h4>
                            <p className="text-sm text-muted-foreground">{session.exercise}</p>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>

              {/* Post-Course Benefits */}
              {course.postCourseBenefits && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-6">Post-Course Benefits</h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {course.postCourseBenefits.map((benefit) => (
                      <div key={benefit.category} className="p-6 rounded-2xl bg-card border border-border">
                        <h3 className={cn("font-display text-lg font-bold mb-4", `text-${colorClass}`)}>
                          {benefit.category}
                        </h3>
                        <ul className="space-y-3">
                          {benefit.items.map((item) => (
                            <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                              <CheckCircle className={cn("w-4 h-4 shrink-0 mt-0.5", `text-${colorClass}`)} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Enrollment Card */}
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">Enrollment Details</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between"><span className="text-muted-foreground">Price</span><span className="font-semibold text-foreground">{formatPrice(course.price)}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Duration</span><span className="text-foreground">{course.duration.months || course.duration.weeks} {course.duration.months ? "Months" : "Weeks"}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Sessions</span><span className="text-foreground">{course.totalSessions} total</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Level</span><span className="text-foreground capitalize">{course.level}</span></div>
                  </div>
                  <Button className="w-full bg-gradient-cta hover:opacity-90 text-primary-foreground mb-3">Enroll Now</Button>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    {course.whatsIncluded.slice(0, 4).map((item) => (
                      <div key={item} className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-accent" />{item}</div>
                    ))}
                  </div>
                </div>

                {/* Instructor Card */}
                {instructor && (
                  <div className="p-6 rounded-2xl bg-card border border-border">
                    <h3 className="font-display text-lg font-bold text-foreground mb-4">Your Instructor</h3>
                    <div className="flex items-center gap-4 mb-4">
                      <img src={instructor.photo} alt={instructor.name} className="w-16 h-16 rounded-full object-cover bg-muted" />
                      <div>
                        <p className="font-semibold text-foreground">{instructor.name}</p>
                        <p className={cn("text-sm", `text-${colorClass}`)}>{instructor.stageName}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{instructor.specialty}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CourseDetail;
