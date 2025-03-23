import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Star Wars Explorer',
  description: 'Explore the Star Wars universe using SWAPI',
};

export default function RootLayout({ children } : { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="text-yellow-400 relative">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="stars3"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        <div className="shooting-star"></div>
        
        <div className="relative z-10">
          <header className="py-4 border-b border-yellow-500">
            <div className="container mx-auto px-4">
              <h1 className="text-center font-bold text-2xl">STAR WARS EXPLORER</h1>
            </div>
          </header>
          {children}
          <footer className="py-4 border-t border-yellow-500 text-center text-sm">
            <div className="container mx-auto px-4">
              <p>Data provided by the <a href="https://swapi.dev/" className="underline hover:text-yellow-300" target="_blank" rel="noopener noreferrer">Star Wars API (SWAPI)</a></p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}