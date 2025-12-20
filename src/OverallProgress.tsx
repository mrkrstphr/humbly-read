import type { Bundles } from './types';
import { calculateCollectionLine, colorByPercent } from './utils';

export function OverallProgress({ bundles }: { bundles: Bundles }) {
  const fullList = Object.values(bundles)
    .map((bundle) => Object.values(bundle))
    .flat();

  const totalItems = fullList.length;
  const unreadItems = fullList.filter((item) => item === 'unread').length;

  const percentCompleted = ((totalItems - unreadItems) / totalItems) * 100;

  return (
    <div className="bg-blue-100 dark:bg-blue-950 rounded-sm shadow-xl p-8 mb-8 border border-blue-200 dark:border-blue-900">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Overall Progress
        </h2>
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {calculateCollectionLine(bundles)} comics
          </span>
          <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {Math.floor(percentCompleted)}%
          </span>
        </div>
      </div>
      <div className="bg-gray-200 dark:bg-gray-700 h-4 w-full rounded-sm overflow-hidden shadow-inner">
        <div
          className={`${colorByPercent(
            percentCompleted,
          )} h-4 rounded-sm transition-all duration-500 ease-out shadow-sm`}
          style={{ width: `${percentCompleted}%` }}
        ></div>
      </div>
    </div>
  );
}
