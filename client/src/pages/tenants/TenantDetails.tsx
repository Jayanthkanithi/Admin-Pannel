import { ArrowLeft, Building, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useParams, useNavigate } from "react-router-dom";
import TopNav from "@/components/layout/TopNav";
import Sidebar from "@/components/layout/Sidebar";

const TenantDetails = () => {
  const { agencyId, tenantId } = useParams();
  const navigate = useNavigate();
  
  // Mock data - in real app, fetch based on tenantId
  const tenant = {
    id: 1,
    name: "TechStart Solutions",
    companyType: "Technology",
    status: "active",
    accountType: "premium",
    email: "contact@techstart.com",
    phone: "+1-234-567-8900",
    address: "123 Tech St, Silicon Valley, CA",
    agency: "Digital Marketing Agency",
    createdDate: "1/15/2024",
    totalLocations: 2,
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <div className="flex">
        <Sidebar activeSection="tenants" />
        <main className="flex-1 p-8">
          {/* Back Button and Title */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => navigate('/tenants')}
              className="mb-4 gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Tenants
            </Button>
            <h1 className="text-2xl font-bold">{tenant.name}</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* General Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  General Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tenant ID</p>
                  <p className="font-medium">{tenant.id}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Name</p>
                  <p className="font-medium">{tenant.name}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Company Type</p>
                  <p className="font-medium">{tenant.companyType}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Status</p>
                  <Badge variant="default" className="bg-status-active text-status-active-foreground">
                    {tenant.status}
                  </Badge>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Account Type</p>
                  <Badge variant="default" className="bg-status-active text-status-active-foreground">
                    {tenant.accountType}
                  </Badge>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="font-medium">{tenant.email}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Phone</p>
                  <p className="font-medium">{tenant.phone}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Address</p>
                  <p className="font-medium">{tenant.address}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Agency</p>
                  <p className="font-medium">{tenant.agency}</p>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Created Date</p>
                  <p className="font-medium">{tenant.createdDate}</p>
                </div>
              </CardContent>
            </Card>

            {/* Locations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Locations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-1">Total Locations</p>
                  <p className="text-3xl font-bold text-primary mb-1">{tenant.totalLocations}</p>
                  <p className="text-sm text-muted-foreground">Configured locations for this tenant</p>
                </div>
                
                <Link to={`/agencies/${agencyId}/tenants/${tenantId}/locations`}>
                  <Button variant="outline" className="w-full gap-2">
                    <MapPin className="h-4 w-4" />
                    View All Locations
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TenantDetails;
