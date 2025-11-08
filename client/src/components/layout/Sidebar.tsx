import { Building2, Users, MapPin, Globe, UserCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSection?: string;
}

const Sidebar = ({ activeSection = "agencies" }: SidebarProps) => {
  const sections = [
    { id: "agencies", label: "Agencies", icon: Building2, path: "/agencies" },
    { id: "tenants", label: "Tenants", icon: Users, path: "/tenants" },
    { id: "locations", label: "Locations", icon: MapPin, path: "/locations" },
    { id: "platforms", label: "Platforms", icon: Globe, path: "/platforms" },
    { id: "users", label: "Users", icon: UserCircle, path: "/users" },
  ];

  return (
    <aside className="w-64 border-r bg-sidebar min-h-screen p-6">
      <div className="flex items-center gap-2 mb-8">
        <Shield className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold">Admin Panel</h2>
      </div>
      
      <div className="space-y-2">
        <p className="text-xs font-semibold text-muted-foreground mb-3 px-3">Sections</p>
        {sections.map((section) => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          return (
            <Link key={section.id} to={section.path}>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3",
                  isActive && "bg-sidebar-accent text-sidebar-accent-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {section.label}
              </Button>
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
