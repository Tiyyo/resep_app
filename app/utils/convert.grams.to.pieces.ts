

export interface ItemListCard {
    id: number;
    name: string;
    image: string;
    quantity: number;
    unit: string;
}

const unitToConvertToPieces = ['pods', 'pcs']


export function harmonzeUnit(arg: any) {
    const itemList = arg.shopping;

    let result: ItemListCard[] = [];


    itemList.forEach(item => {
        if (unitToConvertToPieces.includes(item.unit_measure.abreviation)) {
            const ingr = {
                id: item.id,
                qty: Math.ceil(item.qty / item.ingredient.unit_weight),
                name: item.ingredient.name,
                image: item.ingredient.icon.link,
                unit: item.unit_measure.abreviation,
            }
            result.push(ingr);
        } else if (item.unit_measure.abreviation === 'pch') {
            const ingr = {
                id: item.id,
                qty: null,
                name: item.ingredient.name,
                image: item.ingredient.icon.link,
                unit: null,
            }
            result.push(ingr);
        }
        else {
            const ingr = {
                id: item.id,
                qty: item.qty,
                name: item.ingredient.name,
                image: item.ingredient.icon.link,
                unit: isLiquid(item, item.ingredient.category),
            }
            result.push(ingr);
        }

    })
    return result;

}

export function isLiquid(item, category) {
    if (category.name.toLowerCase() === 'liquids' || item.unit_measure.abreviation === 'cup') {
        return "ml";
    }
    return "g";
}