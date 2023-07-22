import { Category } from "~/api/category";

export interface ItemListCard {
    id: number;
    name: string;
    image: string;
    qty: number | null;
    unit: string | null
}

const unitToConvertToPieces = ['pods', 'pcs']


export function harmonzeUnit(arg: any) {
    const itemList = arg.shopping;
    const finalList = buildIngrListToDisplay([], itemList);
    return finalList;
}
//     const result: ItemListCard[] = [];


//     itemList.forEach((item: any) => {
//         if (unitToConvertToPieces.includes(item.unit_measure.abreviation)) {
//             const ingr = {
//                 id: item.id,
//                 qty: Math.ceil(item.qty / item.ingredient.unit_weight),
//                 name: item.ingredient.name,
//                 image: item.ingredient.icon.link,
//                 unit: item.unit_measure.abreviation,
//             }
//             result.push(ingr);
//         } else if (item.unit_measure.abreviation === 'pch') {

//             const ingr = {
//                 id: item.id,
//                 qty: null,
//                 name: item.ingredient.name,
//                 image: item.ingredient.icon.link,
//                 unit: null,
//             }
//             result.push(ingr);
//         }
//         else {
//             const ingr = {
//                 id: item.id,
//                 qty: item.qty,
//                 name: item.ingredient.name,
//                 image: item.ingredient.icon.link,
//                 unit: isLiquid(item, item.ingredient.category),
//             }
//             result.push(ingr);
//         }

//     })
//     return result;
// }

function buildIngrListToDisplay(finalArray = [], itemList: any) {

    itemList.forEach((item: any) => {
        if (unitToConvertToPieces.includes(item.unit_measure.abreviation)) {
            pushRoundUpQty(finalArray, item);
        }
        else if (item.unit_measure.abreviation === 'pch') {
            pushWithoutUnit(finalArray, item);
        }
        else {
            pushWithGramsOrMl(finalArray, item);
        }
    })
    return finalArray;
}

function pushRoundUpQty(finalArray: ItemListCard[], item: any) {
    const ingr = {
        id: item.id,
        qty: Math.ceil(item.qty / item.ingredient.unit_weight),
        name: item.ingredient.name,
        image: item.ingredient.icon.link,
        unit: item.unit_measure.abreviation,
    }
    finalArray.push(ingr);
}

function pushWithoutUnit(finalArray: ItemListCard[], item: any) {
    const ingr = {
        id: item.id,
        qty: null,
        name: item.ingredient.name,
        image: item.ingredient.icon.link,
        unit: null,
    }
    finalArray.push(ingr);
}

function pushWithGramsOrMl(finalArray: ItemListCard[], item: any) {
    const ingr = {
        id: item.id,
        qty: item.qty,
        name: item.ingredient.name,
        image: item.ingredient.icon.link,
        unit: isLiquid(item, item.ingredient.category),
    }
    finalArray.push(ingr);
}

export function isLiquid(item: any, category: Category) {
    if (category.name.toLowerCase() === 'liquids' || item.unit_measure.abreviation === 'cup') {
        return "ml";
    }
    return "g";
}