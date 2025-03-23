import Link from 'next/link';

export const dynamic = 'force-dynamic';

type Species = {
    name: string;
    classification: string;
    designation: string;
    average_height: string;
    skin_colors: string;
    hair_colors: string;
    eye_colors: string;
    average_lifespan: string;
    homeworld: string;
    language: string;
    people: string[];
    films: string[];
    created: string;
    edited: string;
    url: string;
};

async function getSpecies() {
  const res = await fetch('https://swapi.dev/api/species/');
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}

export default async function SpeciesPage() {
  const data = await getSpecies();
  
  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-12 lg:p-24">
      <h1 className="text-4xl font-bold mb-8 text-yellow-400">Star Wars Species</h1>
      
      <Link href="/" className="mb-8 text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-2">
        <span>←</span> Back to Home
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {data.results.map((species: Species) => (
          <div key={species.name} className="border border-yellow-500 p-5 rounded-lg bg-black bg-opacity-60">
            <h2 className="text-xl font-semibold mb-3 text-yellow-400">{species.name}</h2>
            <ul className="space-y-2 text-yellow-300">
              <li><strong>Classification:</strong> {species.classification}</li>
              <li><strong>Designation:</strong> {species.designation}</li>
              <li><strong>Average Height:</strong> {formatHeight(species.average_height)}</li>
              <li><strong>Skin Colors:</strong> {species.skin_colors}</li>
              <li><strong>Hair Colors:</strong> {species.hair_colors}</li>
              <li><strong>Eye Colors:</strong> {species.eye_colors}</li>
              <li><strong>Average Lifespan:</strong> {formatLifespan(species.average_lifespan)}</li>
              <li><strong>Language:</strong> {species.language}</li>
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex gap-4">
        {data.previous && (
          <Link href={`/species?page=${new URL(data.previous).searchParams.get('page')}`} className="px-4 py-2 text-yellow-400 border border-yellow-500 rounded hover:bg-yellow-500 hover:text-black transition-colors">
            Previous Page
          </Link>
        )}
        {data.next && (
          <Link href={`/species?page=${new URL(data.next).searchParams.get('page')}`} className="px-4 py-2 text-yellow-400 border border-yellow-500 rounded hover:bg-yellow-500 hover:text-black transition-colors">
            Next Page
          </Link>
        )}
      </div>
    </main>
  );
}

function formatHeight(height: string) {
  if (height === "unknown") return "Unknown";
  if (height === "n/a") return "Not applicable";
  
  const num = parseInt(height);
  if (isNaN(num)) return height;
  
  return `${num} cm`;
}

function formatLifespan(lifespan: string) {
  if (lifespan === "unknown") return "Unknown";
  if (lifespan === "indefinite") return "Indefinite";
  
  const num = parseInt(lifespan);
  if (isNaN(num)) return lifespan;
  
  return `${num} years`;
}