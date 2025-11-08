import { Search, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import AgenciesTable from "@/components/agencies/AgenciesTable";
import TopNav from "@/components/layout/TopNav";
import Sidebar from "@/components/layout/Sidebar";

const Agencies = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <div className="flex">
        <Sidebar activeSection="agencies" />
        <main className="flex-1 p-8">
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-2">Agencies</p>
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-6 w-6" />
              <h1 className="text-2xl font-bold">Agencies Management</h1>
            </div>
            
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search agencies..."
                className="pl-10"
              />
            </div>
          </div>

          <AgenciesTable />
        </main>
      </div>
    </div>
  );
};

export default Agencies;
