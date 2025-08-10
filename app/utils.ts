import type { Bundle, Bundles } from "./types";

export function colorByPercent(percent: number) {
  if (percent === 100) return "bg-green-500 dark:bg-green-600";
  if (percent >= 75) return "bg-yellow-500 dark:bg-yellow-600";
  if (percent >= 50) return "bg-orange-500 dark:bg-orange-600";
  return "bg-red-500 dark:bg-red-600";
}

export function contrastColorByPercent(percent: number) {
  if (percent === 100) return "bg-green-600 dark:bg-green-500";
  if (percent >= 75) return "bg-yellow-600 dark:bg-yellow-500";
  if (percent >= 50) return "bg-orange-600 dark:bg-orange-500";
  return "bg-red-600 dark:bg-red-500";
}

export function calculateBundleLine(bundle: Bundle) {
  const fullList = Object.values(bundle);
  if (fullList.length === 0) return "0/0";

  const totalItems = fullList.length;
  const unreadItems = fullList.filter((item) => item === "unread").length;

  return `${totalItems - unreadItems}/${totalItems}`;
}

export function calculateCollectionLine(comics: Bundles) {
  const fullList = Object.values(comics)
    .map((bundle) => Object.values(bundle))
    .flat();

  const totalItems = fullList.length;
  const unreadItems = fullList.filter((item) => item === "unread").length;

  return `${totalItems - unreadItems}/${totalItems}`;
}

export function calculateBundlePercentCompleted(bundle: Bundle) {
  const fullList = Object.values(bundle);
  if (fullList.length === 0) return 0;

  const totalItems = fullList.length;
  const unreadItems = fullList.filter((item) => item === "unread").length;

  return ((totalItems - unreadItems) / totalItems) * 100;
}
