import Link from "next/link";

export const dynamic = "force-dynamic";

type Planet = {
    name: string;
    climate: string;
    terrain: string;
    population: number;
    diameter: number;
    gravity: string;
};

async function getPlanets() {
  const res = await fetch("https://swapi.dev/api/planets/");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function PlanetsPage() {
  const data = await getPlanets();

  return (
    <main className="flex min-h-screen flex-col items-center p-6 md:p-12 lg:p-24">
      <h1 className="text-4xl font-bold mb-8 text-yellow-400">
        Star Wars Planets
      </h1>

      <Link
        href="/"
        className="mb-8 text-yellow-400 hover:text-yellow-300 transition-colors flex items-center gap-2"
      >
        <span>←</span> Back to Home
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {data.results.map((planet: Planet) => (
          <div
            key={planet.name}
            className="border border-yellow-500 p-5 rounded-lg bg-black bg-opacity-60"
          >
            <h2 className="text-xl font-semibold mb-3 text-yellow-400">
              {planet.name}
            </h2>
            <ul className="space-y-2 text-yellow-300">
              <li>
                <strong>Climate:</strong> {planet.climate}
              </li>
              <li>
                <strong>Terrain:</strong> {planet.terrain}
              </li>
              <li>
                <strong>Population:</strong>{" "}
                {formatPopulation(planet.population.toString())}
              </li>
              <li>
                <strong>Diameter:</strong> {formatNumber(planet.diameter.toString())} km
              </li>
              <li>
                <strong>Gravity:</strong> {planet.gravity}
              </li>
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-4">
        {data.previous && (
          <Link
            href={`/planets?page=${new URL(data.previous).searchParams.get(
              "page"
            )}`}
            className="px-4 py-2 text-yellow-400 border border-yellow-500 rounded hover:bg-yellow-500 hover:text-black transition-colors"
          >
            Previous Page
          </Link>
        )}
        {data.next && (
          <Link
            href={`/planets?page=${new URL(data.next).searchParams.get(
              "page"
            )}`}
            className="px-4 py-2 text-yellow-400 border border-yellow-500 rounded hover:bg-yellow-500 hover:text-black transition-colors"
          >
            Next Page
          </Link>
        )}
      </div>
    </main>
  );
}

function formatNumber(num: string) {
  if (num === "unknown") return "Unknown";
  return parseInt(num).toLocaleString();
}

function formatPopulation(population: string) {
  if (population === "unknown") return "Unknown";
  if (population === "0") return "Uninhabited";

  const num = parseInt(population);
  if (isNaN(num)) return population;

  if (num >= 1000000000) {
    return `${(num / 1000000000).toFixed(1)} billion`;
  } else if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)} million`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(1)} thousand`;
  }

  return num.toLocaleString();
}
