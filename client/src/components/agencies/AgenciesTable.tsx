import React, { useState, useEffect } from "react";
import { Eye, Users, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import axios from "axios";

interface Agency {
  id: number;
  name: string;
  companyType: string;
  status: string;
  tenants: number;
}

const AgenciesTable = () => {
  const [agencies, setAgencies] = useState<Agency[]>([]);

  // Fetch all agencies on mount
  useEffect(() => {
    fetchAgencies();
  }, []);

  const fetchAgencies = async () => {
    try {
      const res = await axios.get("http://localhost:5000/agencies");
      setAgencies(res.data);
    } catch (error) {
      console.error("Error fetching agencies:", error);
    }
  };

  const deleteAgency = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/agencies/${id}`);
      fetchAgencies(); // Refresh after deletion
    } catch (error) {
      console.error("Error deleting agency:", error);
    }
  };

  return (
    <div className="bg-card rounded-lg border">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">
              ID
            </th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">
              Agency Name
            </th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">
              Company Type
            </th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">
              Status
            </th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">
              Tenants
            </th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {agencies.map((agency) => (
            <tr
              key={agency.id}
              className="border-b last:border-b-0 hover:bg-muted/50"
            >
              <td className="p-4 text-sm">{agency.id}</td>
              <td className="p-4 text-sm">
                <Link
                  to={`/agencies/${agency.id}`}
                  className="text-primary font-medium hover:underline cursor-pointer"
                >
                  {agency.name}
                </Link>
              </td>
              <td className="p-4 text-sm text-muted-foreground">
                {agency.companyType}
              </td>
              <td className="p-4">
                <Badge
                  variant="secondary"
                  className={`${
                    agency.status === "active"
                      ? "bg-[hsl(var(--status-active))] text-[hsl(var(--status-active-foreground))]"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {agency.status}
                </Badge>
              </td>
              <td className="p-4 text-sm text-muted-foreground">
                {agency.tenants} {agency.tenants === 1 ? "tenant" : "tenants"}
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <Link to={`/agencies/${agency.id}`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to={`/agencies/${agency.id}/tenants`}>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Users className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => deleteAgency(agency.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}

          {agencies.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="p-6 text-center text-muted-foreground text-sm"
              >
                No agencies found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AgenciesTable;
