// app/starships/page.js
import Link from 'next/link';

export const dynamic = 'force-dynamic';

type Starship = {
    name: string;
    model: string;
    manufacturer: string;
    starship_class: string;
    cost_in_credits: string;
    max_atmosphering_speed: string;
    hyperdrive_rating: string;
    MGLT: string;
    crew: string;
    passengers: string;
    cargo_capacity: string;
    consumables: string;
    length: string;
    films: string[];
    pilots: string[];
    url: string;
    created: string;
    edited: string;
};

async function getStarships() {
  const res = await fetch('https://swapi.dev/api/starships/');
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}

export default async function StarshipsPage() {
  const data = await getStarships();
  
  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-12 lg:p-24">
      <h1 className="text-4xl font-bold mb-8 text-yellow-400">Star Wars Starships</h1>
      
      <Link href="/" className="mb-8 text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-2">
        <span>←</span> Back to Home
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
        {data.results.map((starship:Starship) => (
          <div key={starship.name} className="border border-yellow-500 p-5 rounded-lg bg-black bg-opacity-60">
            <h2 className="text-xl font-semibold mb-3 text-yellow-400">{starship.name}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ul className="space-y-2 text-yellow-300">
                <li><strong>Model:</strong> {starship.model}</li>
                <li><strong>Manufacturer:</strong> {starship.manufacturer}</li>
                <li><strong>Class:</strong> {starship.starship_class}</li>
                <li><strong>Cost:</strong> {formatCredits(starship.cost_in_credits)}</li>
                <li><strong>Speed:</strong> {starship.max_atmosphering_speed}</li>
              </ul>
              <ul className="space-y-2 text-yellow-300">
                <li><strong>Hyperdrive:</strong> {starship.hyperdrive_rating}</li>
                <li><strong>Length:</strong> {formatLength(starship.length)}</li>
                <li><strong>Crew:</strong> {starship.crew}</li>
                <li><strong>Passengers:</strong> {starship.passengers}</li>
                <li><strong>Cargo:</strong> {formatMass(starship.cargo_capacity)}</li>
              </ul>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex gap-4">
        {data.previous && (
          <Link href={`/starships?page=${new URL(data.previous).searchParams.get('page')}`} className="px-4 py-2 text-yellow-400 border border-yellow-500 rounded hover:bg-yellow-500 hover:text-black transition-colors">
            Previous Page
          </Link>
        )}
        {data.next && (
          <Link href={`/starships?page=${new URL(data.next).searchParams.get('page')}`} className="px-4 py-2 text-yellow-400 border border-yellow-500 rounded hover:bg-yellow-500 hover:text-black transition-colors">
            Next Page
          </Link>
        )}
      </div>
    </main>
  );
}

function formatCredits(credits:string) {
  if (credits === "unknown") return "Unknown";
  
  const num = parseInt(credits);
  if (isNaN(num)) return credits;
  
  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1)} billion credits`;
  } else if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)} million credits`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}k credits`;
  }
  
  return `${num} credits`;
}

function formatLength(length:string) {
  if (length === "unknown") return "Unknown";
  
  const num = parseFloat(length);
  if (isNaN(num)) return length;
  
  if (num >= 1000) {
    return `${(num / 1000).toFixed(2)} km`;
  }
  
  return `${num} m`;
}

function formatMass(mass:string) {
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