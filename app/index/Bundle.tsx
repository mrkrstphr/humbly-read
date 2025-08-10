import { useState } from "react";
import type { Bundle } from "~/types";
import {
  calculateBundleLine,
  calculateBundlePercentCompleted,
  colorByPercent,
  contrastColorByPercent,
} from "~/utils";

export type BundleProps = {
  bundle: Bundle;
  name: string;
};

export function Bundle({ name, bundle }: BundleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const percentCompleted = calculateBundlePercentCompleted(bundle);

  return (
    <div className="mb-1">
      <h2 className="">
        <span className="text-white mr-1 text-xs rounded">
          <span
            className={`${colorByPercent(percentCompleted)} pl-1 py-0.5 pr-1 rounded-tl rounded-bl`}
          >
            {calculateBundleLine(bundle)}
          </span>
          <span
            className={`${contrastColorByPercent(percentCompleted)} py-0.5 pr-1 pl-1 rounded-tr rounded-br`}
          >
            {Math.floor(percentCompleted)}%
          </span>
        </span>
        <span>{name}</span>
        <button
          onClick={() => setIsOpen((o) => !o)}
          className="ml-2 cursor-pointer"
        >
          [{isOpen ? "x" : "v"}]
        </button>
      </h2>
      {isOpen && (
        <div className="ml-8 mt-2 mb-4">
          {Object.entries(bundle).map(([comic, status]) => (
            <div key={comic}>
              <span
                className={`inline-block size-3 rounded ${colorByPercent(status === "unread" ? 0 : 100)}`}
              />{" "}
              {comic}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
