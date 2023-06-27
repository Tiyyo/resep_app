
export interface NutrientIndicatorProps {
    Icon : JSX.Element;
    value: number;
    addText?: string;
}

function displayValue (value : number) : string { 
    if(!value || value < 0) return ""
    if(typeof value === "string") {
        const newValue = Number(value)
        if(isNaN(newValue)) return ""
        return newValue.toFixed(1)
    }
    return value.toFixed(1)
}

export default function NutrientIndicator({Icon, value , addText}: NutrientIndicatorProps) {
  
  return (
    <div className="flex items-center justify-center my-2 macro">
      <div className="rounded-full text-text-200 flex items-center justify-center h-10 w-10 bg-primary-300 p-2">
        {Icon}
      </div>
      <p className="text-6">
        {displayValue(value)} {" "}
        {addText}
      </p>
    </div>
  );
}
