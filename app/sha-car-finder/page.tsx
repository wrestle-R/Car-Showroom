"use client";

import React, { useState } from "react";
import { Car, Search, Filter, ArrowRight } from "lucide-react";
import axios from "axios";

// Shadcn-like components (styled with Tailwind classes configured in globals.css)
const Button = ({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Input = ({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Label = ({ children, className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    {...props}
  >
    {children}
  </label>
);

const Card = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-lg border border-border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);

interface CarData {
  make: string;
  model: string;
  year: number;
  class: string;
  fuel_type: string;
  transmission: string;
  cylinders?: number;
  drive?: string;
  city_mpg?: number;
  highway_mpg?: number;
  combination_mpg?: number;
}

export default function ShaCarFinder() {
  const [model, setModel] = useState("camry");
  const [loading, setLoading] = useState(false);
  const [cars, setCars] = useState<CarData[]>([]);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY;
      if (!apiKey) {
        throw new Error("API Key is missing in environment variables.");
      }

      const response = await axios.get("https://api.api-ninjas.com/v1/cars", {
        headers: { "X-Api-Key": apiKey },
        params: { model: model, limit: 10 },
      });

      setCars(response.data);
    } catch (err: unknown) {
      console.error(err);
      setError("Failed to fetch cars. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Sha Car Finder
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
             Experience the modern, sleek, and efficient way to explore vehicles.
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto">
          <Card className="p-6">
            <form onSubmit={handleSearch} className="flex gap-4 items-end">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="model">Car Model</Label>
                <Input
                  id="model"
                  placeholder="e.g. Camry, Civic, Mustang"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={loading}>
                {loading ? "Searching..." : <><Search className="mr-2 h-4 w-4" /> Search</>}
              </Button>
            </form>
          </Card>
        </div>

        {/* Results Section */}
        {error && (
            <div className="p-4 rounded-md bg-destructive/15 text-destructive font-medium text-center">
                {error}
            </div>
        )}

        {cars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {cars.map((car, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="bg-muted p-6 flex flex-col items-center justify-center border-b border-border">
                  <Car className="h-16 w-16 text-primary/40 mb-2" />
                  <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60 capitalize">
                    {car.make}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{car.model}</p>
                </div>
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <span className="text-muted-foreground text-xs uppercase">Year</span>
                      <p className="font-medium">{car.year}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-muted-foreground text-xs uppercase">Class</span>
                      <p className="font-medium capitalize">{car.class}</p>
                    </div>
                    <div className="space-y-1">
                        <span className="text-muted-foreground text-xs uppercase">MPG</span>
                        <p className="font-medium">{car.city_mpg} City / {car.highway_mpg} Hwy</p>
                    </div>
                    <div className="space-y-1">
                        <span className="text-muted-foreground text-xs uppercase">Trans</span>
                        <p className="font-medium capitalize">{car.transmission === 'a' ? 'Auto' : 'Manual'}</p>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/80">
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          !loading && !error && (
            <div className="text-center py-20 text-muted-foreground">
              <Filter className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p>Type a car model above to get started.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
