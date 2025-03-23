// app/vehicles/page.js
import Link from 'next/link';

export const dynamic = 'force-dynamic';

type Vehicle = {
    name: string;
    model: string;
    manufacturer: string;
    cost_in_credits: string;
    length: string;
    max_atmosphering_speed: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    vehicle_class: string;
};

async function getVehicles() {
  const res = await fetch('https://swapi.dev/api/vehicles/');
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}

export default async function VehiclesPage() {
  const data = await getVehicles();
  
  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-12 lg:p-24">
      <h1 className="text-4xl font-bold mb-8 text-yellow-400">Star Wars Vehicles</h1>
      
      <Link href="/" className="mb-8 text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-2">
        <span>←</span> Back to Home
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {data.results.map((vehicle: Vehicle) => (
          <div key={vehicle.name} className="border border-yellow-500 p-5 rounded-lg bg-black bg-opacity-60">
            <h2 className="text-xl font-semibold mb-3 text-yellow-400">{vehicle.name}</h2>
            <ul className="space-y-2 text-yellow-300">
              <li><strong>Model:</strong> {vehicle.model}</li>
              <li><strong>Manufacturer:</strong> {vehicle.manufacturer}</li>
              <li><strong>Class:</strong> {vehicle.vehicle_class}</li>
              <li><strong>Speed:</strong> {vehicle.max_atmosphering_speed} km/h</li>
              <li><strong>Crew:</strong> {vehicle.crew}</li>
              <li><strong>Passengers:</strong> {vehicle.passengers}</li>
              <li><strong>Cargo Capacity:</strong> {formatMass(vehicle.cargo_capacity)}</li>
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex gap-4">
        {data.previous && (
          <Link href={`/vehicles?page=${new URL(data.previous).searchParams.get('page')}`} className="px-4 py-2 text-yellow-400 border border-yellow-500 rounded hover:bg-yellow-500 hover:text-black transition-colors">
            Previous Page
          </Link>
        )}
        {data.next && (
          <Link href={`/vehicles?page=${new URL(data.next).searchParams.get('page')}`} className="px-4 py-2 text-yellow-400 border border-yellow-500 rounded hover:bg-yellow-500 hover:text-black transition-colors">
            Next Page
          </Link>
        )}
      </div>
    </main>
  );
}

function formatMass(mass: string) {
  if (mass === "unknown") return "Unknown";
  if (mass === "0") return "None";
  
  const num = parseInt(mass);
  if (isNaN(num)) return mass;
  
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)} metric tons`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)} kg`;
  }
  
  return `${num} kg`;
}