import measure from "~/api/measure";

export interface GetItemProps {
    qty: number;
    unitMeasureName: string;
    equivalent: number;
    unitWeight?: number | null;
    ingredientId: number;
    name: string;
    unit: string;
    servings: number;

}

export type Item = {
    ingredientId: number
    name: string
    qty: number
    unit: string
}

const getItem = ({
    qty,
    unitMeasureName,
    equivalent,
    unitWeight,
    ingredientId,
    name,
    unit,
    servings,
}: GetItemProps) => {
    const calQty = () => {
        if (qty === 0) return 0;
        if (isNaN(qty)) return 0;
        if (unitMeasureName === "pieces" && unitWeight) {
            const qtyItem = (qty * unitWeight) / servings;
            return qtyItem;
        }
        return (qty * equivalent) / servings;
    }
    return {
        ingredientId,
        name,
        qty: calQty(),
        unit
    }
};

export async function buildShoppingList(recipesIds: string[]) {
    const ids = recipesIds.map((id: string) => Number(id));
    // measures have to be ordered by ingredient 'asc' or 'desc'
    const measures = await measure.findManyByIds(ids);
    const sumList = initializeList(measures);
    const list = reduceList(sumList);
    return list;
}

export function initializeList(measures: any) {
    const copy = [...measures];
    let list: Array<Item> = [];
    copy.forEach((m, index) => {
        if (m === 1) return;
        if (
            index < copy.length - 1 &&
            m.ingredient_id === copy[index + 1].ingredient_id
        ) {
            const firstItem = getItem({
                qty: m.qty,
                unitMeasureName: m.unit_measure.name,
                equivalent: m.unit_measure.equivalent,
                unitWeight: m.ingredient.unit_weight,
                ingredientId: m.ingredient_id,
                name: m.ingredient.name,
                unit: m.unit_measure.unit,
                servings: m.recipe.servings,
            }
            );

            const secondItem = getItem({
                qty: copy[index + 1].qty,
                unitMeasureName: copy[index + 1].unit_measure.name,
                equivalent: copy[index + 1].unit_measure.equivalent,
                unitWeight: copy[index + 1].ingredient.unit_weight,
                ingredientId: copy[index + 1].ingredient_id,
                name: copy[index + 1].ingredient.name,
                unit: copy[index + 1].unit_measure.unit,
                servings: copy[index + 1].recipe.servings,
            }
            );

            const item: Item = {
                ingredientId: firstItem.ingredientId,
                name: firstItem.name,
                qty: firstItem.qty + secondItem.qty,
                unit: firstItem.unit
            }
            list.push(item);
            m = 1;
            copy[index + 1] = 1;
        } else {
            const item = getItem({
                qty: m.qty,
                unitMeasureName: m.unit_measure.name,
                equivalent: m.unit_measure.equivalent,
                unitWeight: m.ingredient.unit_weight,
                ingredientId: m.ingredient_id,
                name: m.ingredient.name,
                unit: m.unit_measure.unit,
                servings: m.recipe.servings,
            }
            );
            list.push(item);
            m = 1;
        }
    });
    return list;
}

export function reduceList(itemList: Array<Item>) {
    const copy = [...itemList];
    let reducedList: Array<Item> = [];
    copy.forEach((element: Item | 1, index: number) => {
        if (element === 1) return;
        if (
            index < copy.length - 1 &&
            element.ingredientId === copy[index + 1].ingredientId
        ) {
            const item: Item = {
                ingredientId: element.ingredientId,
                name: element.name,
                qty: element.qty + copy[index + 1].qty,
                unit: element.unit
            }
            const nextIndex = index + 1

            reducedList.push(item);
            element = 1;
            copy[nextIndex] = 1;
        } else {
            const item: Item = {
                ingredientId: element.ingredientId,
                name: element.name,
                qty: element.qty,
                unit: element.unit
            }
            reducedList.push(item);
            element = 1;
        }
    });
    if (itemList.length !== reducedList.length) {
        reduceList(reducedList);
    }
    return reducedList;
}
;
