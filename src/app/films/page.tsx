import Link from 'next/link';

export const dynamic = 'force-dynamic';

type Film = {
    title: string;
    episode_id: number;
    release_date: string;
    opening_crawl: string;
    director: string;
    producer: string;
};

async function getFilms() {
  const res = await fetch('https://swapi.dev/api/films/');
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}

export default async function FilmsPage() {
  const data = await getFilms();
  
  const sortedFilms = [...data.results].sort((a, b) => a.episode_id - b.episode_id);
  
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Star Wars Films</h1>
      
      <Link href="/" className="mb-8 text-blue-500 hover:underline">
        ← Back to Home
      </Link>
      
      <div className="w-full max-w-5xl space-y-8">
        {sortedFilms.map((film: Film) => (
          <div key={film.title} className="border border-gray-300 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Episode {film.episode_id}: {film.title}</h2>
            <p className="text-sm text-gray-500 mb-4">Released: {new Date(film.release_date).toLocaleDateString()}</p>
            <p className="mb-4">{film.opening_crawl}</p>
            <div className="text-sm">
              <p><strong>Director:</strong> {film.director}</p>
              <p><strong>Producer:</strong> {film.producer}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}