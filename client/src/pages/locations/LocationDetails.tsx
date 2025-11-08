import { ChevronRight, ArrowLeft, FileText, Settings, Users as UsersIcon, Package } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import TopNav from "@/components/layout/TopNav";
import Sidebar from "@/components/layout/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MoreVertical } from "lucide-react";

const LocationDetails = () => {
  const { agencyId, tenantId, locationId } = useParams();
  
  // Mock data
  const agencyName = "Digital Marketing Agency";
  const tenantName = "TechStart Solutions";
  const locationName = "TechStart Main Office";

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
            <Link to={`/agencies/${agencyId}`} className="text-primary hover:underline">
              {agencyName}
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link to={`/agencies/${agencyId}/tenants/${tenantId}`} className="text-primary hover:underline">
              {tenantName}
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground">{locationName}</span>
          </div>

          {/* Back button and title */}
          <div className="mb-6">
            <Link to={`/agencies/${agencyId}/tenants/${tenantId}/locations`}>
              <Button variant="ghost" className="mb-4 gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Locations
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">{locationName}</h1>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="general" className="gap-2">
                <FileText className="h-4 w-4" />
                General Information
              </TabsTrigger>
              <TabsTrigger value="platforms" className="gap-2">
                <Settings className="h-4 w-4" />
                Platform Integrations
              </TabsTrigger>
              <TabsTrigger value="staff" className="gap-2">
                <UsersIcon className="h-4 w-4" />
                Staff Details
              </TabsTrigger>
              <TabsTrigger value="products" className="gap-2">
                <Package className="h-4 w-4" />
                Products
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <div className="bg-card rounded-lg border p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">General Information</h2>
                  <Button>Edit</Button>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Public Location Name</Label>
                    <Input value="TechStart Main Office" disabled className="bg-muted" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Location Code</Label>
                    <Input value="TS001" disabled className="bg-muted" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>UID</Label>
                    <Input value="UID001" disabled className="bg-muted" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>SKU</Label>
                    <Input value="SKU001" disabled className="bg-muted" />
                  </div>
                  
                  <div className="space-y-2 col-span-2">
                    <Label>Address</Label>
                    <Textarea value="123 Tech St, Silicon Valley, CA" disabled className="bg-muted" rows={3} />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input value="+1-234-567-8900" disabled className="bg-muted" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Website</Label>
                    <Input value="https://techstart.com" disabled className="bg-muted" />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="platforms">
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-xl font-semibold mb-6">Platform Integrations</h2>
                
                <div className="space-y-4">
                  {/* Google Maps */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Google Maps</h3>
                      <p className="text-sm text-muted-foreground">https://maps.google.com/example</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Zomato */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Zomato</h3>
                      <p className="text-sm text-muted-foreground">https://zomato.com/example</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Swiggy */}
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Swiggy</h3>
                      <p className="text-sm text-muted-foreground">https://github.com/juvanta-eng/juvanta.git</p>
                      <p className="text-xs text-muted-foreground mt-1">Type: Scraping</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Twitter */}
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-3">Twitter</h3>
                    <div className="flex items-center gap-2">
                      <Input placeholder="Enter URL" className="flex-1" />
                      <Button variant="secondary">Add</Button>
                      <Button variant="outline">Integration</Button>
                      <Button variant="outline">Cancel</Button>
                    </div>
                  </div>

                  {/* Facebook */}
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-3">Facebook</h3>
                    <div className="flex items-center gap-2">
                      <Input placeholder="Enter URL" className="flex-1" />
                      <Button variant="secondary">Add</Button>
                      <Button variant="outline">Integration</Button>
                      <Button variant="outline">Cancel</Button>
                    </div>
                  </div>

                  {/* Instagram */}
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium">Instagram</h3>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="staff">
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-xl font-semibold">Staff Details</h2>
                <p className="text-muted-foreground mt-2">Staff information will be displayed here.</p>
              </div>
            </TabsContent>

            <TabsContent value="products">
              <div className="bg-card rounded-lg border p-6">
                <h2 className="text-xl font-semibold">Products</h2>
                <p className="text-muted-foreground mt-2">Product information will be displayed here.</p>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default LocationDetails;
