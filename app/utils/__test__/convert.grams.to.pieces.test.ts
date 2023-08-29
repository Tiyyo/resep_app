import { isLiquid, buildIngrListToDisplay, harmonzeUnit } from "../../utils/convert.grams.to.pieces";
import type { totalIngredientQty, totalIngredientList } from "~/types";

const ingrQtyTest = {
    qty: 10,
    ingredient_id: 1,
    name: "test",
    ingredient: {
        id: 1,
        name: "test",
        unit_weight: 10,
        icon: {
            link: "test"
        }
    },
    unit_measure: {
        abreviation: "cup",
    }
}

const ingrQtyTest2 = {
    qty: 10,
    ingredient_id: 1,
    name: "test",
    ingredient: {
        id: 1,
        name: "test",
        unit_weight: 10,
        icon: {
            link: "test"
        }
    },
    unit_measure: {
        abreviation: "tbsp",
    }
}

const ingrQtyTest3 = {
    qty: 10,
    ingredient_id: 1,
    name: "test",
    ingredient: {
        id: 1,
        name: "test",
        unit_weight: 10,
        icon: {
            link: "test"
        }
    }
}

const ingrList = {
    meal_plan_id: 1,
    items: [
        {
            qty: 10,
            ingredient_id: 1,
            name: "test",
            ingredient: {
                id: 1,
                name: "test",
                unit_weight: 10,
                icon: {
                    link: "test"
                },
                category: {
                    id: 1,
                    name: "liquids"
                }
            },
            unit_measure: {
                abreviation: "cup",
            }
        },
    ]
}


describe('isLquid', () => {
    test("should returns '' if unit_measure is not provided", () => {
        expect(isLiquid(ingrQtyTest3 as totalIngredientQty, { id: 2, name: "category" })).toBe("")
    })
    test("should returns '' if category is not provided", () => {
        expect(isLiquid(ingrQtyTest as totalIngredientQty, { id: 2, name: undefined })).toBe("")
    })
    test("should returns 'g' if category is not liquid", () => {
        expect(isLiquid(ingrQtyTest2 as totalIngredientQty, { id: 2, name: "egg" })).toBe("g")
    })
    test("should returns 'ml' if category is liquid", () => {
        expect(isLiquid(ingrQtyTest as totalIngredientQty, { id: 2, name: "liquids" })).toBe("ml")
    })
    test("should returns 'ml' if unit_measure is cup", () => {
        expect(isLiquid(ingrQtyTest as totalIngredientQty, { id: 2, name: "category" })).toBe("ml")
    })
    test("should returns 'g' if unit_measure is not cup", () => {
        expect(isLiquid(ingrQtyTest2 as totalIngredientQty, { id: 2, name: "category" })).toBe('g')
    })
})

// describe('buildIngrListToDisplay', () => {
//     test("should returns an array of objects with qty, name, image, unit, category_id", () => {
//         expect(buildIngrListToDisplay(ingrList as totalIngredientList)).toEqual([{}]))
//     })
// })