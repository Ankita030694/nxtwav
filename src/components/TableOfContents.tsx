import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { List } from "lucide-react";
import { cn } from "@/lib/utils";

interface Section {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  sections: Section[];
  orientation?: "vertical" | "horizontal";
}

export default function TableOfContents({ sections, orientation = "horizontal" }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -40% 0px" }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  if (sections.length === 0) return null;

  if (orientation === "vertical") {
    return (
      <nav className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/70 mb-4 flex items-center gap-2">
          <List className="w-4 h-4 text-primary" /> On This Page
        </h3>
        <ul className="space-y-2 text-sm border-l-2 border-border/50">
          {sections.map((section) => (
            <li key={section.id}>
              <Link
                to={section.id}
                smooth={true}
                offset={-100}
                duration={500}
                spy={true}
                className={cn(
                  "block py-1 pl-4 -ml-[2px] cursor-pointer transition-all border-l-2",
                  activeId === section.id
                    ? "text-primary border-primary font-semibold"
                    : "text-muted-foreground border-transparent hover:text-primary hover:border-primary/30"
                )}
              >
                {section.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  // Mobile/Horizontal version
  return (
    <div className="bg-card/50 backdrop-blur-xl border border-border rounded-xl p-4 sm:p-6 mb-8 lg:hidden">
      <h3 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
        <List className="w-5 h-5 text-primary" /> Table of Contents
      </h3>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <Link
              to={section.id}
              smooth={true}
              offset={-100}
              duration={500}
              className="text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors block py-0.5 line-clamp-1"
            >
              • {section.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
