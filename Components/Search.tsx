"use client";

import React, { useState } from "react";
import { Car } from "lucide-react";
import axios from "axios";

const Search = () => {
  const [preferences, setPreferences] = useState({
    familySize: "",
    location: "",
    priority: "",
    usage: "",
  });
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const getRecommendedMakes = ({ familySize, location, priority }) => {
    const size = parseInt(familySize);
    let makes = size <= 2 ? carMakes.sedan.concat(carMakes.compact) : size <= 4 ? carMakes.suv.concat(carMakes.sedan) : carMakes.minivan.concat(carMakes.suv);
    if (location === "Rural Area") makes = makes.concat(carMakes.pickup, carMakes.suv);
    if (priority === "Fuel Efficiency") makes = makes.concat(carMakes.compact);
    if (priority === "Cargo Space") makes = makes.concat(carMakes.suv, carMakes.minivan);
    return [...new Set(makes)];
  };

  const fetchCars = async () => {
    setLoading(true);
    setError("");
    try {
      const makes = getRecommendedMakes(preferences).slice(0, 3);
      const responses = await Promise.all(
        makes.map((make) =>
          axios.get("https://api.api-ninjas.com/v1/cars", {
            headers: { "X-Api-Key": "p0gM6mlEEp8lGzk13BGgRQ==L50gLtNkT6XlyGSX" },
            params: { make, year: 2020 },
          })
        )
      );
      setCars(responses.flatMap((res) => res.data));
    } catch (err) {
      setError("Failed to fetch recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCars();
  };

  return (
    <div className="w-full min-h-[300px] bg-gradient-to-r from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-3">
          <Car className="w-10 h-10 text-white" />
          <h1 className="text-4xl font-bold text-white">Find Your Perfect Car Match</h1>
        </div>
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto mt-8 bg-white/10 p-8 rounded-xl shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.keys(options).map((key) => (
              <div key={key}>
                <label className="block text-white text-lg font-medium mb-3">
                  {`Select your ${key}`.replace(/([A-Z])/g, " $1").trim()}:
                </label>
                <select
                  className="w-full bg-white/20 text-white py-4 px-5 rounded-xl border border-white/30 focus:ring-2 focus:ring-white/50"
                  value={preferences[key]}
                  onChange={(e) => setPreferences({ ...preferences, [key]: e.target.value })}
                  required
                >
                  <option value="">Select an option</option>
                  {options[key].map((option) => (
                    <option key={option} value={option} className="text-black">
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="mt-10 bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-xl"
          >
            Get Recommendations
          </button>
        </form>
        <div className="mt-8">
          {loading && <p className="text-center text-gray-400">Loading...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && cars.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cars.map((car, index) => (
                <div key={index} className="p-6 bg-gray-800 rounded-xl shadow-lg">
                  <h3 className="text-xl font-bold text-white mb-2 uppercase">{`${car.make} ${car.model}`}</h3>
                  <p className="text-gray-300">Year: {car.year}</p>
                  <p className="text-gray-300">Class: {car.class}</p>
                  <p className="text-gray-300">Fuel: {car.fuel_type}</p>
                  <p className="text-gray-300">Transmission: {car.transmission === "a" ? "Automatic" : "Manual"}</p>
                </div>
              ))}
            </div>
          )}
          {!loading && !error && cars.length === 0 && (
            <p className="text-center text-gray-400">No cars found. Try different preferences.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
