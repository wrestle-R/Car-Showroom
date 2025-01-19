"use client"
import React, { useState, useEffect } from 'react';

const carData = [
  { carCompany: "Porsche", carModel: "911 GT3", carYear: "2024", image: "/images/porche911.jpeg" },
  { carCompany: "Lamborghini", carModel: "Huracán EVO", carYear: "2023", image: "/images/LamborghiniHuracan.jpeg" },
  { carCompany: "Ferrari", carModel: "SF90 Stradale", carYear: "2024", image: "/images/FerrariSF90.jpeg" },
  { carCompany: "Tesla", carModel: "Model S Plaid", carYear: "2025", image: "/images/TeslaModelS.jpeg" },
];

const Hero = () => {
  const [randomCar, setRandomCar] = useState(carData[0]);

  useEffect(() => {
    const newCar = carData[Math.floor(Math.random() * carData.length)];
    setRandomCar(newCar);
  }, []);

  const { carCompany, carModel, carYear, image } = randomCar;

  return (
    <div className="relative h-[90vh] w-full overflow-hidden bg-gradient-to-r from-gray-900 to-black">
      {/* Welcome Section */}
      <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-blue-600/10 to-transparent py-6">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 pb-7 pt-9">
              Welcome to the Auto Show 2024
            </h1>
            <p className="text-gray-300 text-sm md:text-base ">
              Discover the future of automotive excellence
            </p>
          </div>
        </div>
      </div>

      {/* Main Hero Content */}
      <div className="container mx-auto px-4 h-[91vh] flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 z-10">
            <div className="space-y-2">
              <h2 className="text-sm md:text-base text-gray-400 tracking-wider uppercase">
                {carYear} New Arrival
              </h2>
              <h1 className="text-4xl md:text-6xl font-bold text-white">
                {carCompany}
                <span className="block text-3xl md:text-5xl mt-2 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                  {carModel}
                </span>
              </h1>
            </div>

            <p className="text-gray-300 text-lg md:text-xl max-w-md">
              Experience unparalleled performance and luxury with the new {carYear} {carCompany} {carModel}.
            </p>

            <div className="flex gap-4 pt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors duration-200">
                Find this car
              </button>
              <button className="border border-blue-600 text-blue-500 hover:bg-blue-600/10 px-6 py-2 rounded-md transition-colors duration-200">
                Learn more
              </button>
            </div>
          </div>

          <div className="relative h-[350px] md:h-[600px] flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-600/5 rounded-full blur-3xl"></div>
            <img
              src={image}
              alt={`${carCompany} ${carModel}`}
              className="object-contain w-full h-full transform hover:scale-105 transition-transform duration-300 relative z-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;