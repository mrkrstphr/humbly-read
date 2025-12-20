import { useState } from 'react';
import { FaCircleCheck, FaCircleXmark } from 'react-icons/fa6';
import { FiChevronDown } from 'react-icons/fi';
import type { Bundle } from './types';
import {
  calculateBundleLine,
  calculateBundlePercentCompleted,
  colorByPercent,
} from './utils';

export type BundleProps = {
  bundle: Bundle;
  name: string;
};

export function Bundle({ name, bundle }: BundleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const percentCompleted = calculateBundlePercentCompleted(bundle);
  const comicCount = Object.keys(bundle).length;
  const readCount = Object.values(bundle).filter(
    (status) => status !== 'unread',
  ).length;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-sm shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div
        className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
        onClick={() => setIsOpen((o) => !o)}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 leading-tight">
                {name}
              </h3>
              <span
                className={`${colorByPercent(
                  percentCompleted,
                )} text-white px-2 py-1 rounded-sm text-xs font-bold`}
              >
                {calculateBundleLine(bundle)}
              </span>
            </div>

            <div className="flex items-center space-x-4 mb-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {comicCount} comics • {readCount} complete •{' '}
                {comicCount - readCount} remaining
              </span>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center space-x-3">
              <div className="flex-1 bg-gray-200 dark:bg-gray-700 h-2 rounded-sm overflow-hidden">
                <div
                  className={`${colorByPercent(
                    percentCompleted,
                  )} h-2 rounded-sm transition-all duration-500 ease-out`}
                  style={{ width: `${percentCompleted}%` }}
                ></div>
              </div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 min-w-[3rem]">
                {Math.floor(percentCompleted)}%
              </span>
            </div>
          </div>

          <div className="ml-4 flex items-center">
            <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
              <FiChevronDown
                className={`"w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Collapsible Content */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-full opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 border-t border-gray-100 dark:border-gray-700 pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(bundle).map(([comic, status]) => (
              <div
                key={comic}
                className="flex items-start space-x-3 p-3 rounded-lg"
              >
                <div className="flex-shrink-0 mt-0.5">
                  {status === 'read' ? (
                    <FaCircleCheck className="w-5 h-5 text-green-500 dark:text-green-600" />
                  ) : status === 'unread' ? (
                    <div className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700"></div>
                  ) : (
                    <FaCircleXmark className="w-5 h-5 text-red-500 dark:text-red-600" />
                  )}
                </div>
                <span
                  className={`text-sm leading-relaxed ${
                    status === 'read'
                      ? 'text-gray-600 dark:text-gray-400 line-through'
                      : 'text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {comic}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
