import { Search, MapPin, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link, useParams } from "react-router-dom";
import TopNav from "@/components/layout/TopNav";
import Sidebar from "@/components/layout/Sidebar";
import LocationsTable from "@/components/tenants/LocationsTable";

const TenantLocations = () => {
  const { agencyId, tenantId } = useParams();

  // Mock data
  const agencyName = "Digital Marketing Agency";
  const tenantName = "TechStart Solutions";

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
            <Link
              to={`/agencies/${agencyId}`}
              className="text-primary hover:underline"
            >
              {agencyName}
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link
              to={`/agencies/${agencyId}/tenants/${tenantId}`}
              className="text-primary hover:underline"
            >
              {tenantName}
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">Branches</span>
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="h-6 w-6" />
              <h1 className="text-2xl font-bold">{tenantName} Branches</h1>
            </div>

            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search branches..." className="pl-10" />
            </div>
          </div>

          <LocationsTable agencyId={agencyId || ""} tenantId={tenantId || ""} />
        </main>
      </div>
    </div>
  );
};

export default TenantLocations;
