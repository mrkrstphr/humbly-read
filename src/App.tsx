import { useEffect, useState } from 'react';
import { Bundle } from './Bundle';
import { Footer } from './Footer';
import { Header } from './Header';
import { NoResults } from './NoResults';
import { OverallProgress } from './OverallProgress';
import { SearchBar } from './SearchBar';
import type { Bundles } from './types';

function App() {
  const [bundles, setBundles] = useState<Bundles | undefined>();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/humbly-read/comics.json')
      .then((res) => res.json())
      .then(setBundles);
  }, []);

  // Filter bundles based on search query
  const filteredBundles = bundles
    ? Object.entries(bundles).filter(([bundleName, bundle]) => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return true;

        // Check if bundle name matches
        if (bundleName.toLowerCase().includes(query)) return true;

        // Check if any comic title matches
        return Object.keys(bundle).some((comicTitle) =>
          comicTitle.toLowerCase().includes(query),
        );
      })
    : [];

  if (!bundles) {
    return 'Loading...';
  }

  return (
    <main className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header />

        <OverallProgress bundles={bundles} />
        <SearchBar onSearch={setSearchQuery} />

        <div className="space-y-6">
          {filteredBundles.map(([key, bundle]) => (
            <Bundle key={key} name={key} bundle={bundle} />
          ))}
          {filteredBundles.length === 0 && searchQuery && <NoResults />}
        </div>

        <Footer />
      </div>
    </main>
  );
}

export default App;
