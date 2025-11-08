import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import TopNav from "@/components/layout/TopNav";
import Sidebar from "@/components/layout/Sidebar";
import TenantsManagementTable from "@/components/tenants/TenantsManagementTable";

const Tenants = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <div className="flex">
        <Sidebar activeSection="tenants" />
        <main className="flex-1 p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-6">All Tenants</h1>
            
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tenants..."
                className="pl-10"
              />
            </div>
          </div>

          <TenantsManagementTable />
        </main>
      </div>
    </div>
  );
};

export default Tenants;
