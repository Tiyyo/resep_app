import measure from "~/api/measure";


class ShoppingItem {
    qty: number;
    unitMeasureName: string;
    equivalent: number;
    unitWeight?: number | null;
    ingredientId: number;
    name: string;
    unit: string;
    servings: number;
    qtyItem: number;

    constructor(
        qty: number,
        unitMeasureName: string,
        equivalent: number,
        ingredientId: number,
        name: string,
        unit: string,
        servings: number,
        unitWeight?: number | null
    ) {
        this.qty = qty;
        this.unitMeasureName = unitMeasureName;
        this.equivalent = equivalent;
        this.unitWeight = unitWeight ?? undefined;
        this.servings = servings;
        this.qtyItem = this.calcQty(
            this.qty,
            this.unitMeasureName,
            this.equivalent,
            this.servings,
            this.unitWeight
        );
        this.ingredientId = ingredientId;
        this.name = name;
        this.unit = unit;
    }
    public calcQty(
        qty: number,
        unitMeasureName: string,
        equivalent: number,
        servings: number,
        unitWeight?: number
    ) {
        if (qty === 0) return 0;
        if (isNaN(qty)) return 0;
        if (unitMeasureName === "pieces" && unitWeight) {
            const qtyItem = (qty * unitWeight) / servings;
            return qtyItem;
        }
        return (qty * equivalent) / servings;
    }
    get Item() {
        return {
            ingredientId: this.ingredientId,
            name: this.name,
            qty: this.qtyItem,
            unit: this.unit,
        };
    }
}

class Item {
    ingredientId: number;
    name: string;
    qty: number;
    unit: string;
    constructor(ingredientId: number, name: string, qty: number, unit: string) {
        this.ingredientId = ingredientId;
        this.name = name;
        this.qty = qty;
        this.unit = unit;
    }
}

export async function buildShoppingList(recipesIds: string[]) {
    const ids = recipesIds.map((id: string) => Number(id));
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
            const firstItem = new ShoppingItem(
                m.qty,
                m.unit_measure.name,
                m.unit_measure.equivalent,
                m.ingredient_id,
                m.ingredient.name,
                m.unit_measure.unit,
                m.recipe.servings,
                m.ingredient.unit_weight
            ).Item;

            const secondItem = new ShoppingItem(
                copy[index + 1].qty,
                copy[index + 1].unit_measure.name,
                copy[index + 1].unit_measure.equivalent,
                copy[index + 1].ingredient_id,
                copy[index + 1].ingredient.name,
                copy[index + 1].unit_measure.unit,
                copy[index + 1].recipe.servings,
                copy[index + 1].ingredient.unit_weight
            ).Item;

            const item = new Item(
                firstItem.ingredientId,
                firstItem.name,
                firstItem.qty + secondItem.qty,
                firstItem.unit
            );
            list.push(item);
            m = 1;
            copy[index + 1] = 1;
        } else {
            const item = new ShoppingItem(
                m.qty,
                m.unit_measure.name,
                m.unit_measure.equivalent,
                m.ingredient_id,
                m.ingredient.name,
                m.unit_measure.unit,
                m.recipe.servings,
                m.ingredient.unit_weight
            ).Item;
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
            console.log('reduce is working');
            const item = new Item(
                element.ingredientId,
                element.name,
                element.qty + copy[index + 1].qty,
                element.unit
            );

            reducedList.push(item);
            element = 1;
            copy[index + 1] = 1;
        } else {
            const item = new Item(
                element.ingredientId,
                element.name,
                element.qty,
                element.unit
            );
            reducedList.push(item);
            element = 1;
        }
    });
    if (itemList.length !== reducedList.length) {
        reduceList(reducedList);
    }
    return reducedList;
}
