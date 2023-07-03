import { useEffect, useState } from "react";
import type { LinearMacrosProportionProps, Parts } from "./interface";



export default function LinearMacrosProportion({macros} : LinearMacrosProportionProps ) {
    const [parts , setParts] = useState<Parts>({proteins: null, carbs: null, fat: null})

    const computeParts = () => {
        const {proteins, carbs, fat} = macros
        const total = +fat + +carbs + +proteins
        const proteinPart = +(+proteins / total * 100).toFixed(1)
        const carbsPart = +(+carbs / total * 100).toFixed(1)
        const fatPart = +(+fat / total * 100).toFixed(1)
        setParts({proteins: proteinPart, carbs: carbsPart, fat: fatPart})
    }

    useEffect(() => {
        computeParts()
    }, [])

  return (
    <div className="w-full flex flex-col gap-y-5 items-center">
        <div className="flex w-4/5 h-5 rounded-xl overflow-hidden">
            <div className={`bg-proteins font-semibold center text-6`} style={{ width : parts?.proteins + "%"}}>{parts.proteins}%</div>
            <div className="bg-carbs font-semibold center text-6" style={{ width : parts?.carbs + "%"}}>{parts.carbs}%</div>
            <div className="bg-fat font-semibold center text-6" style={{ width : parts?.fat + "%"}}>{parts.fat}%</div>
        </div>
        <div className="flex gap-x-5 ">
            <div className="flex gap-x-2 items-center">
                <div className="aspect-square h-4 rounded-sm bg-proteins"></div>
                <p>Proteins</p>
            </div>
            <div className="flex gap-x-2 items-center">
                <div className="aspect-square h-4 rounded-sm bg-carbs"></div>
                <p>Carbs</p>
            </div>
            <div className="flex gap-x-2 items-center">
                <div className="aspect-square h-4 rounded-sm bg-fat"></div>
                <p>Fat</p>
            </div>
        </div>
      
    </div>
  );
}