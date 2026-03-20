import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { PageLoader } from "@/components/PageLoader";
import { ScrollToTop } from "@/components/ScrollToTop";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";
import { ConsultationButton } from "@/components/ConsultationButton";
import Index from "./pages/Index";
import About from "./pages/About";
import CoursesPage from "./pages/CoursesPage";
import InteractiveLearning from "./pages/InteractiveLearning";
import CourseDetail from "./pages/CourseDetail";
import LiveSessions from "./pages/LiveSessions";
import Pricing from "./pages/Pricing";
import SocialCorner from "./pages/SocialCorner";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import RefundPolicy from "./pages/RefundPolicy";
import NotFound from "./pages/NotFound";
import Leads from "./pages/Leads";
import AddBlogs from "./pages/AddBlogs";
import Blog from "./pages/Blog";
import BlogPostDetail from "./pages/BlogPostDetail";
import ThankYou from "./pages/ThankYou";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <PageLoader />
          <WhatsAppWidget />
          <ConsultationButton />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/interactive-learning" element={<InteractiveLearning />} />
            <Route path="/courses/:slug" element={<CourseDetail />} />
            <Route path="/live" element={<LiveSessions />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/social" element={<SocialCorner />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/addblogs" element={<AddBlogs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPostDetail />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
