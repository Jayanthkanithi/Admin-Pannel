import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import TopNav from "@/components/layout/TopNav";
import Sidebar from "@/components/layout/Sidebar";
import LocationsManagementTable from "@/components/locations/LocationsManagementTable";

const Locations = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <div className="flex">
        <Sidebar activeSection="locations" />
        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Locations Management</h1>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Location
            </Button>
          </div>

          <LocationsManagementTable />
        </main>
      </div>
    </div>
  );
};

export default Locations;
