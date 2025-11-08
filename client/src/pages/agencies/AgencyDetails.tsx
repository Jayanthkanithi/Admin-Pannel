import { Search, Users, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link, useParams } from "react-router-dom";
import TenantsTable from "@/components/agencies/TenantsTable";
import TopNav from "@/components/layout/TopNav";
import Sidebar from "@/components/layout/Sidebar";

const AgencyDetails = () => {
  const { id } = useParams();

  // Mock data - in real app, fetch based on id
  const agencyName = "Digital Marketing Agency";

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <div className="flex">
        <Sidebar activeSection="agencies" />
        <main className="flex-1 p-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm mb-6">
            <Link to="/agencies" className="text-primary hover:underline">
              Agencies
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">{agencyName}</span>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Users className="h-6 w-6" />
              <h1 className="text-2xl font-bold">{agencyName} - Tenants</h1>
            </div>

            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search tenants..." className="pl-10" />
            </div>
          </div>

          <TenantsTable />
        </main>
      </div>
    </div>
  );
};

export default AgencyDetails;
