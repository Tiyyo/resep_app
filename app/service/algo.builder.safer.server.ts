import measure from "~/api/measure";


export interface GetItemProps {
    qty: number;
    unitMeasureName: string;
    equivalent: number;
    unitWeight?: number | null;
    ingredientId: number;
    name: string;
    servings: number;
    unit_measure_id: number;

}

export type Item = {
    ingredientId: number
    name: string
    qty: number
    unit_measure_id: number
}

export async function buildShoppingList(meals) {
    // const ids = recipesIds.map((id: string) => Number(id));

    // measures have to be ordered by ingredient 'asc' or 'desc'
    const ids = meals.map((meal) => meal.recipe_id);

    const measures = await measure.findManyByIds(ids);

    // Bad performance find a way to improve this 
    const measuresWithCorrectServigns = associateServingsToMeasure(measures, meals);

    const sumList = initializeList(measuresWithCorrectServigns);
    const list = recursionOverList(sumList);
    return list;
}

const getItem = ({
    qty,
    unitMeasureName,
    equivalent,
    unitWeight,
    ingredientId,
    name,
    servings,
    unit_measure_id
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
        unit_measure_id
    }
};

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
                servings: m.recipe.servings,
                unit_measure_id: m.unit_measure.id,
            }
            );

            const secondItem = getItem({
                qty: copy[index + 1].qty,
                unitMeasureName: copy[index + 1].unit_measure.name,
                equivalent: copy[index + 1].unit_measure.equivalent,
                unitWeight: copy[index + 1].ingredient.unit_weight,
                ingredientId: copy[index + 1].ingredient_id,
                name: copy[index + 1].ingredient.name,
                servings: copy[index + 1].recipe.servings,
                unit_measure_id: copy[index + 1].unit_measure.id,
            }
            );

            const item: Item = {
                ingredientId: firstItem.ingredientId,
                name: firstItem.name,
                qty: firstItem.qty + secondItem.qty,
                unit_measure_id: m.unit_measure.id,
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
                servings: m.recipe.servings,
                unit_measure_id: m.unit_measure.id,
            }
            );
            list.push(item);
            m = 1;
        }
    });
    return list;
}

function pushItem(element: any, list: Array<Item>) {
    const item: Item = {
        ingredientId: element.ingredientId,
        name: element.name,
        qty: element.qty,
        unit_measure_id: element.unit_measure_id,
    }
    list.push(item);
    element = 1;
}

function mergeIntoItem(element: Item, nextElement: Item) {

    const item: Item = {
        ingredientId: element.ingredientId,
        name: element.name,
        qty: element.qty + nextElement.qty,
        unit_measure_id: element.unit_measure_id,
    }
    return item;
}

function associateServingsToMeasure(measures, meals) {
    const measuresWithCorrectServigns = measures.map((m) => {
        const matchMeal = meals.find((meal) => meal.recipe_id === m.recipe_id)
        if (matchMeal) {
            return {
                ...m, recipe: {
                    ...m.recipe, servings: matchMeal.servings
                }
            }
        }
    })
    return measuresWithCorrectServigns;
}

function loopToGetList(copy: Array<Item>, emptyList: Array<Item> | undefined = []): Array<Item> {
    copy.forEach((element: Item | 1, index: number) => {
        if (element === 1) return;
        if (
            index < copy.length - 1 &&
            element.ingredientId === copy[index + 1].ingredientId
        ) {

            const item = mergeIntoItem(element, copy[index + 1]);
            const nextIndex = index + 1

            emptyList.push(item);
            element = 1;
            copy[nextIndex] = 1;

        } else {
            pushItem(element, emptyList);;
        }
    });
    return emptyList;
}

export const getReducedList = (itemList: Array<Item>) => {
    const copy = [...itemList];
    let emptyList: Array<Item> = [];
    const reducedList = loopToGetList(copy, emptyList);
    return reducedList;
};

export function recursionOverList(itemList: Array<Item>) {

    const reducedList = getReducedList(itemList);

    if (itemList.length !== reducedList.length) {
        getReducedList(reducedList);
    }
    return getReducedList(reducedList);
};

