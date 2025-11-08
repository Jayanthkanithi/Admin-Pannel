import React, { useEffect, useState } from "react";
import axios from "axios";
import { Eye, MapPin, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "react-router-dom";

interface Tenant {
  id: number;
  name: string;
  companyType: string;
  status: string;
  locations: number;
}

const TenantsTable = () => {
  const { id: agencyId } = useParams();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch tenants when component mounts or agencyId changes
  useEffect(() => {
    if (agencyId) {
      fetchTenants();
    }
  }, [agencyId]);

  const fetchTenants = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/agencies/${agencyId}/tenants`
      );
      setTenants(res.data);
    } catch (error) {
      console.error("Error fetching tenants:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTenant = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/tenants/${id}`);
      fetchTenants(); // Refresh after delete
    } catch (error) {
      console.error("Error deleting tenant:", error);
    }
  };

  if (loading) {
    return (
      <p className="text-center py-4 text-muted-foreground">
        Loading tenants...
      </p>
    );
  }

  if (tenants.length === 0) {
    return (
      <p className="text-center py-4 text-muted-foreground">
        No tenants found.
      </p>
    );
  }

  return (
    <div className="bg-card rounded-lg border">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">
              ID
            </th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">
              Tenant Name
            </th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">
              Company Type
            </th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">
              Status
            </th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">
              Locations
            </th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => (
            <tr
              key={tenant.id}
              className="border-b last:border-b-0 hover:bg-muted/50"
            >
              <td className="p-4 text-sm">{tenant.id}</td>
              <td className="p-4 text-sm">
                <Link
                  to={`/agencies/${agencyId}/tenants/${tenant.id}/locations`}
                  className="text-primary font-medium hover:underline cursor-pointer"
                >
                  {tenant.name}
                </Link>
              </td>
              <td className="p-4 text-sm text-muted-foreground">
                {tenant.companyType}
              </td>
              <td className="p-4">
                <Badge
                  variant="secondary"
                  className={`${
                    tenant.status === "active"
                      ? "bg-green-500/20 text-green-700"
                      : "bg-gray-300/20 text-gray-700"
                  }`}
                >
                  {tenant.status}
                </Badge>
              </td>
              <td className="p-4 text-sm text-muted-foreground">
                {tenant.locations}{" "}
                {tenant.locations === 1 ? "location" : "locations"}
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MapPin className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => deleteTenant(tenant.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TenantsTable;
