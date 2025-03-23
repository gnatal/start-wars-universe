import Link from 'next/link';

export const dynamic = 'force-dynamic';

type Person = {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
};

async function getPeople() {
  const res = await fetch('https://swapi.dev/api/people/');
  
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}

export default async function PeoplePage() {
  const data = await getPeople();
  
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold mb-8">Star Wars Characters</h1>
      
      <Link href="/" className="mb-8 text-blue-500 hover:underline">
        ← Back to Home
      </Link>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {data.results.map((person: Person) => (
          <div key={person.name} className="border border-gray-300 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{person.name}</h2>
            <ul className="space-y-1 text-sm">
              <li><strong>Height:</strong> {person.height} cm</li>
              <li><strong>Mass:</strong> {person.mass} kg</li>
              <li><strong>Hair Color:</strong> {person.hair_color}</li>
              <li><strong>Eye Color:</strong> {person.eye_color}</li>
              <li><strong>Birth Year:</strong> {person.birth_year}</li>
              <li><strong>Gender:</strong> {person.gender}</li>
            </ul>
          </div>
        ))}
      </div>
      
      <div className="mt-8">
        {data.previous && (
          <Link href={`/people?page=${new URL(data.previous).searchParams.get('page')}`} className="mr-4 text-blue-500 hover:underline">
            Previous Page
          </Link>
        )}
        {data.next && (
          <Link href={`/people?page=${new URL(data.next).searchParams.get('page')}`} className="text-blue-500 hover:underline">
            Next Page
          </Link>
        )}
      </div>
    </main>
  );
}