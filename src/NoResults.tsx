import { FiSearch } from 'react-icons/fi';

export function NoResults() {
  return (
    <div className="text-center py-12">
      <div className="text-gray-400 dark:text-gray-500 mb-2">
        <FiSearch className="w-16 h-16 mx-auto mb-4" />
      </div>
      <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-1">
        No results found
      </h3>
      <p className="text-gray-500 dark:text-gray-500">
        Try searching for a different bundle or comic title
      </p>
    </div>
  );
}
