import { useEffect, useState } from "react";
import type { Bundles } from "~/types";
import { calculateCollectionLine, colorByPercent } from "~/utils";
import { Bundle } from "./Bundle";

export function IndexPage() {
  const [bundles, setBundles] = useState<Bundles | undefined>();
  const [percentCompleted, setPercentCompleted] = useState(0);

  useEffect(() => {
    fetch("/comics.json")
      .then((res) => res.json())
      .then((data: Bundles) => {
        setBundles(data);

        const fullList = Object.values(data)
          .map((bundle) => Object.values(bundle))
          .flat();

        const totalItems = fullList.length;
        const unreadItems = fullList.filter((item) => item === "unread").length;

        setPercentCompleted(((totalItems - unreadItems) / totalItems) * 100);
      });
  }, []);

  if (!bundles) {
    return "Loading...";
  }

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Humbly Read</h1>

      <p className="mb-4">
        I buy a lot of comics on{" "}
        <a href="https://www.humblebundle.com/books" target="_blank">
          Humble Bundle
        </a>{" "}
        and <a href="https://www.fanatical.com/en/bundle/books">Fanatical</a>,
        but I don't read a lot of them. So I made this to keep track of things
        I've purchased and read to try to convince myself to stop throwing away
        money.
      </p>

      <div className="bg-gray-500 dark:bg-gray-700 h-5 w-full rounded">
        <div
          className={`${colorByPercent(percentCompleted)} h-5 rounded`}
          style={{ width: `${percentCompleted}%` }}
        ></div>
      </div>

      <p className="mb-4 mt-1 text-sm">
        {calculateCollectionLine(bundles)} - {Math.floor(percentCompleted)}%
      </p>

      {Object.entries(bundles || {}).map(([key, bundle]) => (
        <Bundle key={key} name={key} bundle={bundle} />
      ))}
    </main>
  );
}
