import { Button } from "@/components/ui/button";
import { ChevronDown, User } from "lucide-react";

const TopNav = () => {
  const navItems = [
    "Dashboard",
    "Reviews & Sentiment",
    "Competitors",
    "Keywords",
    "Social",
    "Reports",
    "Admin",
  ];

  return (
    <header className="border-b bg-card sticky top-0 z-50">
      <div className="flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold text-primary">Juvanta</h1>
          <nav className="flex items-center gap-6">
            {navItems.map((item) => (
              <Button
                key={item}
                variant="ghost"
                // className="text-sm font-medium hover:text-primary"
                className="gap-2"
              >
                {item}
              </Button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="gap-2">
            English <ChevronDown className="h-4 w-4" />
          </Button>
          <Button variant="ghost" className="gap-2">
            <User className="h-4 w-4" />
            Admin User
          </Button>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
