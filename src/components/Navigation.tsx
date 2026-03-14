import { useState, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { UserMenu } from "@/components/UserMenu";
import nxtwavLogo from "@/assets/nxtwav-logo-v2.png";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { 
    href: "/about", 
    label: "About Us",
    children: [
      { href: "/about#founders", label: "Our Founders" },
      { href: "/about#faculty", label: "Our Faculties" },
    ]
  },
  { 
    href: "/courses", 
    label: "Courses",
    children: [
      { href: "/courses#production", label: "Music Production" },
      { href: "/courses#djing", label: "DJing" },
      { href: "/courses#artist-dev", label: "Artist Development" },
    ]
  },
  { href: "/interactive-learning", label: "Interactive Learning" },
  { href: "/blog", label: "Journal" },
  { href: "/pricing", label: "Pricing" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    setActiveDropdown(null);
    
    if (href.includes('#')) {
      const [path, hash] = href.split('#');
      if (location.pathname === path) {
        const element = document.getElementById(hash);
        if (element) {
          const y = element.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      } else {
        navigate(href);
      }
    } else {
      navigate(href);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
          <img 
            src={nxtwavLogo} 
            alt="NXTwav Academy" 
            className="h-10 md:h-12 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <div 
              key={link.label}
              className="relative py-4"
              onMouseEnter={() => link.children && handleMouseEnter(link.label)}
              onMouseLeave={() => link.children && handleMouseLeave()}
            >
              <Link
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary flex items-center gap-1",
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
                {link.children && (
                  <ChevronDown className={cn(
                    "w-3 h-3 transition-transform duration-200",
                    activeDropdown === link.label ? "rotate-180" : ""
                  )} />
                )}
              </Link>

              {/* Dropdown Content */}
              {link.children && (
                <div className={cn(
                  "absolute top-full left-0 w-48 bg-card border border-border rounded-lg shadow-xl py-2 transition-all duration-200 origin-top",
                  activeDropdown === link.label 
                    ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" 
                    : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
                )}>
                  {link.children.map((child) => (
                    <Link
                      key={child.href}
                      to={child.href}
                      onClick={() => handleLinkClick(child.href)}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA / User Menu */}
        <div className="hidden md:flex items-center gap-4">
          {loading ? (
            <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
          ) : user ? (
            <UserMenu />
          ) : (
            <Button size="sm" className="bg-gradient-cta hover:opacity-90 text-primary-foreground" asChild>
              <Link to="/auth/signup">Start Learning</Link>
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-border max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <div key={link.label} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <Link
                    to={link.href}
                    onClick={() => handleLinkClick(link.href)}
                    className={cn(
                      "text-base font-semibold transition-colors",
                      location.pathname === link.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </div>
                {link.children && (
                  <div className="flex flex-col pl-4 border-l-2 border-primary/20 gap-3 mt-1">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        to={child.href}
                        onClick={() => handleLinkClick(child.href)}
                        className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="flex flex-col gap-3 pt-6 border-t border-border">
              {loading ? (
                <div className="h-10 bg-muted animate-pulse rounded" />
              ) : user ? (
                <>
                  <Button variant="outline" size="lg" className="w-full justify-start" asChild onClick={() => setIsOpen(false)}>
                    <Link to="/dashboard">Dashboard</Link>
                  </Button>
                  <UserMenu />
                </>
              ) : (
                <Button size="lg" className="w-full bg-gradient-cta hover:opacity-90 text-primary-foreground" asChild onClick={() => setIsOpen(false)}>
                  <Link to="/auth/signup">Start Learning</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
