import { useEffect, useState, useCallback } from "react";
import type { LinearMacrosProportionProps, Parts } from "./interface";

export default function LinearMacrosProportion({
  macros,
}: LinearMacrosProportionProps) {
  const [parts, setParts] = useState<Parts>({
    proteins: null,
    carbs: null,
    fat: null,
  });

  const computeParts = useCallback(() => {
    const { proteins, carbs, fat } = macros;
    const total = +fat + +carbs + +proteins;
    const proteinPart = +((+proteins / total) * 100).toFixed(1);
    const carbsPart = +((+carbs / total) * 100).toFixed(1);
    const fatPart = +((+fat / total) * 100).toFixed(1);
    setParts({ proteins: proteinPart, carbs: carbsPart, fat: fatPart });
  }, [macros]);

  useEffect(() => {
    computeParts();
  }, [computeParts]);

  return (
    <div className="flex w-full flex-col items-center gap-y-5">
      <div className="flex h-5 w-4/5 overflow-hidden rounded-xl">
        <div
          className={`center bg-proteins text-6 font-semibold`}
          style={{ width: parts?.proteins + "%" }}
        >
          {parts.proteins}%
        </div>
        <div
          className="center bg-carbs text-6 font-semibold"
          style={{ width: parts?.carbs + "%" }}
        >
          {parts.carbs}%
        </div>
        <div
          className="center bg-fat text-6 font-semibold"
          style={{ width: parts?.fat + "%" }}
        >
          {parts.fat}%
        </div>
      </div>
      <div className="flex gap-x-5 ">
        <div className="flex items-center gap-x-2">
          <div className="aspect-square h-4 rounded-sm bg-proteins"></div>
          <p>Proteins</p>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="aspect-square h-4 rounded-sm bg-carbs"></div>
          <p>Carbs</p>
        </div>
        <div className="flex items-center gap-x-2">
          <div className="aspect-square h-4 rounded-sm bg-fat"></div>
          <p>Fat</p>
        </div>
      </div>
    </div>
  );
}
