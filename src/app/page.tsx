import Link from "next/link";

interface CategoryCardProps {
  title: string;
  href: string;
  description: string;
  icon: string;
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-6 md:p-12 lg:p-24">
      <div className="w-full max-w-6xl">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-12 text-yellow-400">
          <span className="block">STAR WARS</span>
          <span className="block mt-2 text-4xl md:text-5xl">UNIVERSE EXPLORER</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CategoryCard
            title="People"
            href="/people"
            description="Famous characters from the Star Wars universe"
            icon="👤"
          />
          <CategoryCard
            title="Planets"
            href="/planets"
            description="Explore planets from across the galaxy"
            icon="🪐"
          />
          <CategoryCard
            title="Starships"
            href="/starships"
            description="View the epic starships of Star Wars"
            icon="🚀"
          />
          <CategoryCard
            title="Vehicles"
            href="/vehicles"
            description="Land vehicles from the Star Wars universe"
            icon="🏍️"
          />
          <CategoryCard
            title="Species"
            href="/species"
            description="Different species from Star Wars"
            icon="👽"
          />
          <CategoryCard
            title="Films"
            href="/films"
            description="All the Star Wars films"
            icon="🎬"
          />
        </div>
      </div>
    </main>
  );
}

function CategoryCard({ title, href, description, icon }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-col justify-between h-48 rounded-lg border border-yellow-500 px-6 py-5 transition-all duration-300 bg-black bg-opacity-60 hover:bg-opacity-80 hover:shadow-lg hover:shadow-yellow-500/20 transform hover:-translate-y-1"
    >
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-2xl">{icon}</span>
          <h2 className="text-2xl font-semibold text-yellow-400">
            {title}
          </h2>
        </div>
        <p className="text-sm text-yellow-300 opacity-80">{description}</p>
      </div>
      
      <div className="flex justify-end mt-4">
        <span className="text-yellow-400 inline-block transition-transform group-hover:translate-x-2 motion-reduce:transform-none">
          →
        </span>
      </div>
    </Link>
  );
}