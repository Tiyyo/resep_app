import { getMeasuresByRecipeId } from "~/api/get.many.by.request";


class ShoppingItem {
    qty: number
    unitMeasureName: string
    equivalent: number
    unitWeight?: number | null
    ingredientId: number
    name: string
    unit: string
    servings: number
    qtyItem: number

    constructor(qty: number, unitMeasureName: string, equivalent: number, ingredientId: number, name: string, unit: string, servings: number, unitWeight?: number | null) {
        this.qty = qty
        this.unitMeasureName = unitMeasureName
        this.equivalent = equivalent
        this.unitWeight = unitWeight ?? undefined
        this.servings = servings
        this.qtyItem = this.calcQty(this.qty, this.unitMeasureName, this.equivalent, this.servings, this.unitWeight)
        this.ingredientId = ingredientId
        this.name = name
        this.unit = unit
    }
    public calcQty(qty: number, unitMeasureName: string, equivalent: number, servings: number, unitWeight?: number,) {
        if (qty === 0) return 0
        if (isNaN(qty)) return 0
        if (unitMeasureName === 'pieces' && unitWeight) {
            const qtyItem = qty * unitWeight / servings
            return qtyItem
        }
        return qty * equivalent / servings
    }
    get Item() {
        return {
            ingredientId: this.ingredientId,
            name: this.name,
            qty: this.qtyItem,
            unit: this.unit,
        }
    }
}

class Item {
    ingredientId: number
    name: string
    qty: number
    unit: string
    constructor(ingredientId: number, name: string, qty: number, unit: string) {
        this.ingredientId = ingredientId
        this.name = name
        this.qty = qty
        this.unit = unit
    }
}



export async function buildShoppingList(recipesIds: string[]) {
    const ids = recipesIds.map((id: string) => Number(id))
    const measures = await getMeasuresByRecipeId(ids)
    const sumList = initializeList(measures)
    console.log(sumList, 'SUM LIST');
    const list = reduceList(sumList)
    console.log(list, 'FINAL LIST');
}

export function initializeList(measure) {
    const copy = [...measure]
    let list = []
    for (let i = 0; i < copy.length; i++) {
        if (copy[i] === 1) continue
        if (i < copy.length - 1 && copy[i].ingredient_id === copy[i + 1].ingredient_id && copy[i] !== 1) {
            const firstItem = new ShoppingItem(
                copy[i].qty,
                copy[i].unit_measure.name,
                copy[i].unit_measure.equivalent,
                copy[i].ingredient_id,
                copy[i].ingredient.name,
                copy[i].unit_measure.unit,
                copy[i].recipe.servings,
                copy[i].ingredient.unit_weight).Item

            const secondItem = new ShoppingItem(
                copy[i + 1].qty,
                copy[i + 1].unit_measure.name,
                copy[i + 1].unit_measure.equivalent,
                copy[i + 1].ingredient_id,
                copy[i + 1].ingredient.name,
                copy[i + 1].unit_measure.unit,
                copy[i + 1].recipe.servings,
                copy[i + 1].ingredient.unit_weight).Item

            const item = new Item(firstItem.ingredientId, firstItem.name, firstItem.qty + secondItem.qty, firstItem.unit)

            list.push(item)
            copy.splice(i, 1, 1)
            copy.splice(i + 1, 1, 1)
        }
        else {
            const item = new ShoppingItem(
                copy[i].qty,
                copy[i].unit_measure.name,
                copy[i].unit_measure.equivalent,
                copy[i].ingredient_id,
                copy[i].ingredient.name,
                copy[i].unit_measure.unit,
                copy[i].recipe.servings,
                copy[i].ingredient.unit_weight
            ).Item
            list.push(item)
            copy.splice(i, 1, 1)
        }
    }
    console.log(list, 'LIST');
    return list
}


export function reduceList(list) {
    const copy = [...list]
    let reducedList = []
    for (let i = 0; i < copy.length; i++) {
        if (copy[i] === 1) continue
        if (i < copy.length - 1 && copy[i].ingredientId === copy[i + 1].ingredientId) {
            const item = new Item(copy[i].ingredientId, copy[i].name, copy[i].qty + copy[i + 1].qty, copy[i].unit)
            reducedList.push(item)
            copy.splice(i, 1, 1)
            copy.splice(i + 1, 1, 1)
        } else {
            const item = new Item(copy[i].ingredientId, copy[i].name, copy[i].qty, copy[i].unit)
            reducedList.push(item)
            copy.splice(i, 1, 1)
        }
    }
    if (list.length !== reducedList.length) {
        reduceList(reducedList)
    }
    return reducedList
}