import { useEffect, useRef, useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

export function SearchBar({
  onSearch,
}: {
  onSearch?: (query: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState('');

  const clearSearch = () => setSearchQuery('');

  const searchDebounceRef = useRef<number | null>(null);

  useEffect(() => {
    if (!onSearch) return;
    if (searchDebounceRef.current) clearTimeout(searchDebounceRef.current);

    searchDebounceRef.current = setTimeout(
      () => {
        onSearch(searchQuery);
      },
      searchQuery === '' ? 0 : 500,
    );

    return () => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
      }
    };
  }, [searchQuery, onSearch]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-sm shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700">
      <div className="relative">
        <input
          type="text"
          placeholder="Search bundles and comics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
        />
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-sm transition-colors duration-200"
          >
            <FiX className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        )}
        {!searchQuery && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <FiSearch className="w-5 h-5 text-gray-400 dark:text-gray-500" />
          </div>
        )}
      </div>
    </div>
  );
}
