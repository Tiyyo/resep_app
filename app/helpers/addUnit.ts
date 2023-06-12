export function addUnit(arg: string) {
    let unit: string
    switch (arg) {
        case 'calories':
            unit = "(kcal)"
            break;
        case 'proteins':
            unit = "(g)"
            break;
        case 'carbs':
            unit = '(g)'
            break;
        case 'fat':
            unit = '(g)'
            break
        case 'water':
            unit = '(ml)'
            break
        default:
            unit = ""
            break;
    }
    return unit
}