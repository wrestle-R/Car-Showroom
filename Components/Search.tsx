"use client"

import React, { useState } from "react";
import { Car, Search as SearchIcon, AlertCircle, Loader2 } from "lucide-react";
import axios from "axios";

// Define the types for preferences
interface Preferences {
  familySize: string;
  location: string;
  priority: string;
  usage: string;
}

// Define the car data structure (from the API response)
interface CarData {
  make: string;
  model: string;
  year: number;
  class: string;
  fuel_type: string;
  transmission: string;
}

const Search: React.FC = () => {
  const [preferences, setPreferences] = useState<Preferences>({
    familySize: "",
    location: "",
    priority: "",
    usage: "",
  });

  const [cars, setCars] = useState<CarData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const options = {
    location: ["Urban City", "Suburban Area", "Rural Area", "Mixed Terrain"],
    priority: ["Fuel Efficiency", "Safety Features", "Cargo Space", "Performance"],
    usage: ["Daily Commute", "Family Trips", "Off-road Adventures", "City Navigation"],
  };

  const carMakes = {
    sedan: ["toyota", "honda", "bmw"],
    suv: ["ford", "toyota", "honda"],
    minivan: ["honda", "toyota", "chrysler"],
    pickup: ["ford", "chevrolet", "toyota"],
    compact: ["toyota", "honda", "volkswagen"],
    luxury: ["bmw", "mercedes-benz", "lexus"],
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPreferences((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getRecommendedMakes = ({ familySize, location, priority }: Preferences): string[] => {
    const size = parseInt(familySize);
    let makes = size <= 2 ? carMakes.sedan.concat(carMakes.compact) : size <= 4 ? carMakes.suv.concat(carMakes.sedan) : carMakes.minivan.concat(carMakes.suv);
    if (location === "Rural Area") makes = makes.concat(carMakes.pickup, carMakes.suv);
    if (priority === "Fuel Efficiency") makes = makes.concat(carMakes.compact);
    if (priority === "Cargo Space") makes = makes.concat(carMakes.suv, carMakes.minivan);
    return [...new Set(makes)];
  };

  const fetchCars = async (): Promise<void> => {
    
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    if (!apiKey) {
      setError("API Key is missing. Please check your .env file.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const makes = getRecommendedMakes(preferences).slice(0, 3);
      const responses = await Promise.all(
        makes.map((make) =>
          axios.get("https://api.api-ninjas.com/v1/cars", {
            headers: { "X-Api-Key": apiKey },
            params: { make, year: 2020 },
          })
        )
      );

      const carsData = responses.flatMap((res) => res.data);
      if (carsData.length === 0) {
        setError("No cars found. Try different preferences.");
      }
      setCars(carsData);
    } catch (err: any) {
      console.error(err);
      if (err.response?.status === 400) {
        setError("Bad Request (400). Please check API parameters or Key.");
      } else {
        setError("Failed to fetch recommendations. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    fetchCars();
  };

  return (
    <div className="w-full min-h-[500px] bg-background text-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center gap-4 mb-8">
          <div className="p-3 bg-primary/10 rounded-full">
            <Car className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-center">Find Your Perfect Car Match</h1>
          <p className="text-muted-foreground text-center max-w-2xl">
            Tell us about your needs and we'll recommend the perfect vehicles for you.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-card border border-border rounded-xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Family Size (People)
                </label>
                <input
                  type="number"
                  name="familySize"
                  min="1"
                  max="10"
                  value={preferences.familySize}
                  onChange={handleInputChange}
                  placeholder="e.g. 4"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Location</label>
                <select
                  name="location"
                  value={preferences.location}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                >
                  <option value="" disabled>Select Location</option>
                  {options.location.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Priority</label>
                <select
                  name="priority"
                  value={preferences.priority}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                >
                  <option value="" disabled>Select Priority</option>
                  {options.priority.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Primary Usage</label>
                <select
                  name="usage"
                  value={preferences.usage}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                >
                  <option value="" disabled>Select Usage</option>
                  {options.usage.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Finding Best Cars...
                </>
              ) : (
                <>
                  <SearchIcon className="mr-2 h-4 w-4" />
                  Find My Car
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 rounded-md bg-destructive/10 text-destructive flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              <p>{error}</p>
            </div>
          )}
        </div>

        {/* Results Section */}
        {cars.length > 0 && (
          <div className="mt-12 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center">Recommended For You</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car, index) => (
                <div key={index} className="rounded-lg border border-border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-primary capitalize">{car.model}</h3>
                        <p className="text-muted-foreground capitalize">{car.make}</p>
                      </div>
                      <span className="inline-flex items-center rounded-full border border-transparent px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 bg-secondary text-secondary-foreground">
                        {car.year}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-1 border-b border-border/50">
                        <span className="text-muted-foreground">Class</span>
                        <span className="font-medium capitalize">{car.class}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-border/50">
                        <span className="text-muted-foreground">Fuel Type</span>
                        <span className="font-medium capitalize">{car.fuel_type}</span>
                      </div>
                      <div className="flex justify-between py-1 border-b border-border/50">
                        <span className="text-muted-foreground">Transmission</span>
                        <span className="font-medium capitalize">{car.transmission === 'a' ? 'Automatic' : 'Manual'}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
