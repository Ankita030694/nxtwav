import { NavLink, Link } from "react-router-dom";
import { Users, FileText, Home } from "lucide-react";

export function AdminSidebar() {
  const routes = [
    {
      href: "/leads",
      label: "Leads",
      icon: <Users className="w-5 h-5" />
    },
    {
      href: "/addblogs",
      label: "Add Blogs",
      icon: <FileText className="w-5 h-5" />
    }
  ];

  return (
    <div className="w-64 flex-shrink-0 h-screen fixed mt-16 left-0 top-0 border-r border-border bg-card/50 backdrop-blur-xl z-40 hidden md:block">
      <div className="p-4 py-8 flex flex-col gap-2 h-full">
        <h2 className="text-xl font-display font-semibold mb-4 px-4 text-foreground">Admin Panel</h2>
        {routes.map((route) => (
          <NavLink
            key={route.href}
            to={route.href}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive 
                ? "bg-primary/20 text-primary font-medium" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`
            }
          >
            {route.icon}
            {route.label}
          </NavLink>
        ))}
        
        <div className="mt-auto pb-24">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <Home className="w-5 h-5" />
            Website Home
          </Link>
        </div>
      </div>
    </div>
  );
}
