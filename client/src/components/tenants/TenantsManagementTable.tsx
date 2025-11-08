import React, { useState, useEffect } from "react";
import { Eye, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import axios from "axios";

interface Tenant {
  id: number;
  name: string;
  companyType: string;
  status: string;
  accountType: string;
  email: string;
  agency: string;
  agencyId: number;
  locations: number;
}

const TenantsManagementTable = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);

  useEffect(() => {
    fetchTenants();
  }, []);

  const fetchTenants = async () => {
    try {
      const res = await axios.get("http://localhost:5000/tenants");
      setTenants(res.data);
    } catch (error) {
      console.error("Error fetching tenants:", error);
    }
  };

  const deleteTenant = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/tenants/${id}`);
      fetchTenants(); // refresh list after deletion
    } catch (error) {
      console.error("Error deleting tenant:", error);
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Tenant Name</TableHead>
            <TableHead>Company Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Account Type</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Agency</TableHead>
            <TableHead>Locations</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tenants.map((tenant) => (
            <TableRow key={tenant.id}>
              <TableCell className="font-medium">{tenant.id}</TableCell>
              <TableCell>
                <Link
                  to={`/tenants/${tenant.id}`}
                  className="text-primary hover:underline font-medium"
                >
                  {tenant.name}
                </Link>
              </TableCell>
              <TableCell>{tenant.companyType}</TableCell>
              <TableCell>
                <Badge
                  variant={tenant.status === "active" ? "default" : "secondary"}
                  className={
                    tenant.status === "active"
                      ? "bg-status-active text-status-active-foreground"
                      : ""
                  }
                >
                  {tenant.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="default"
                  className="bg-status-active text-status-active-foreground"
                >
                  {tenant.accountType}
                </Badge>
              </TableCell>
              <TableCell>{tenant.email}</TableCell>
              <TableCell>
                <Link
                  to={`/agencies/${tenant.agencyId}`}
                  className="text-primary hover:underline"
                >
                  {tenant.agency}
                </Link>
              </TableCell>
              <TableCell>{tenant.locations}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Link to={`/tenants/${tenant.id}`}>
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon">
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTenant(tenant.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TenantsManagementTable;
