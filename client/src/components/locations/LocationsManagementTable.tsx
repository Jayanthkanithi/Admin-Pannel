import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import axios from "axios";

interface Location {
  id: number;
  name: string;
  code: string;
  type: string;
  locality: string;
  region: string;
  country: string;
}

const LocationsManagementTable = () => {
  const [locations, setLocations] = useState<Location[]>([]);

  // Fetch all locations when component mounts
  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/locations");
      setLocations(res.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const deleteLocation = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/locations/${id}`);
      fetchLocations(); // Refresh list after deletion
    } catch (error) {
      console.error("Error deleting location:", error);
    }
  };

  return (
    <div className="bg-card rounded-lg border">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-muted/50">
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">
              Location
            </th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">
              Code
            </th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">
              Type
            </th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">
              Locality
            </th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">
              Region
            </th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">
              Country
            </th>
            <th className="text-left p-4 text-sm font-medium text-muted-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr
              key={location.id}
              className="border-b last:border-b-0 hover:bg-muted/50"
            >
              <td className="p-4">
                <Link
                  to={`/locations/${location.id}`}
                  className="text-primary font-medium hover:underline cursor-pointer"
                >
                  {location.name}
                </Link>
              </td>
              <td className="p-4 text-sm">{location.code}</td>
              <td className="p-4 text-sm">{location.type}</td>
              <td className="p-4 text-sm">{location.locality}</td>
              <td className="p-4 text-sm">{location.region}</td>
              <td className="p-4 text-sm">{location.country}</td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                    onClick={() => deleteLocation(location.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}

          {locations.length === 0 && (
            <tr>
              <td
                colSpan={7}
                className="p-6 text-center text-muted-foreground text-sm"
              >
                No locations found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LocationsManagementTable;
