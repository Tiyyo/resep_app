export function displayValue (value : number) : string { 
    if(!value || value < 0) return ""
    if(typeof value === "string") {
        const newValue = Number(value)
        if(isNaN(newValue)) return ""
        return newValue.toFixed(1)
    }
    return value.toFixed(1)
}