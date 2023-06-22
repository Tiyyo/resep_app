import { Decimal } from "@prisma/client/runtime"
import { getRecipeById } from "~/api/get.one.by.id.request"
import { addMacrosToRecipe } from "~/api/patch.request"
import { addRecipes } from "~/api/post.request"

type difficulty = 'easy' | 'hard' | 'medium'

interface MeasureRaw {
    qty: string
    ingredient: string
    unit_measure: string
}

interface Images {
    link: string    
    imageKey: string
    width: number
}

interface RecipeRawForm {
    name: string
    prepTime: string
    cookTime: string
    author: string
    servings: string
    level: difficulty
    tags?: string[]
    measures: MeasureRaw[]
    instructions: string[]
    ytLink?: string
    image?: Images

}


export interface Macros {
    id: number
    food?: string | null
    calories: number | Decimal
    proteins: number | Decimal
    carbs: number | Decimal
    fat: number | Decimal
    water: number | Decimal
}

export interface UnitMeasure {
    id: number
    equivalent: number | Decimal | null
    unit: string //--'grams' | 'mililiters'
    abreviation: string
    name: string
}

export interface Icon {
    id: number
    name: string
    link: string
    image_key: string
}

export interface Ingredient {
    id: number
    categoryId: number
    iconId?: number | null
    icon?: Icon | null
    macrosId?: number | null
    macros?: Macros | null
    name: string
    unit_weight?: number | null | Decimal
}

export interface Measure {
    ingredient: Ingredient
    ingredientId: number
    qty: number | Decimal
    recipeId: number
    unit_compute?: string | null
    unit_measure_id: number
    unit_measure: UnitMeasure
}

export type Measures = Array<Measure>

function convertStringToNumber(rawForm: RecipeRawForm) {
    

    const convertRecipe = {
        name: rawForm.name,
        prepTime: parseInt(rawForm.prepTime, 10),
        cookTime: parseInt(rawForm.cookTime, 10),
        author: parseInt(rawForm.author),
        servings: parseInt(rawForm.author),
        difficulty: rawForm.level,
        tags: rawForm.tags ?? undefined,
        image: rawForm.image?? undefined,
        ytLink: rawForm.ytLink ?? undefined,
        instructions: rawForm.instructions,
        measures: rawForm.measures.map((m) => {
            return {
                qty: parseFloat(m.qty),
                ingredient: parseInt(m.ingredient, 10),
                unit_measure: parseInt(m.unit_measure, 10)
            }
        })
    }
    return convertRecipe
}

const calcQty = (measure: Measure): number => {
    let qty = 1;

    if (measure.unit_measure.name === "pieces") {
        return measure.ingredient.unit_weight
            ? (qty = (measure.qty as number) * (measure.ingredient?.unit_weight as number))
            : 1;
    }
    if (measure.unit_measure.equivalent) {
        qty = (measure.qty as number) * (measure.unit_measure.equivalent as number);
        return qty;
    }
    return qty
};

async function addPartialRecipe(rawForm: RecipeRawForm) {
    const rawRecipe = convertStringToNumber(rawForm)

    try {
        const newRecipeId = await addRecipes(rawRecipe)

        if (newRecipeId) {
            const partialRecipe = await getRecipeById(newRecipeId)
            return partialRecipe
        }
    } catch (error) {
        console.log(error);
    }
}

export async function computeTotalMacro(measures: Measures, servings: number) {
    const result = measures.map((m) => {
        if (!m.ingredient.macros) {
            return {
                calories: 0,
                proteins: 0,
                carbs: 0,
                fat: 0,
                water: 0,
            }
        }
        return {
            calories: (calcQty(m) * (m.ingredient.macros.calories as number)) / 100,
            proteins: (calcQty(m) * (m.ingredient.macros.proteins as number)) / 100,
            carbs: (calcQty(m) * (m.ingredient.macros.carbs as number)) / 100,
            fat: (calcQty(m) * (m.ingredient.macros.fat as number)) / 100,
            water: (calcQty(m) * (m.ingredient.macros.water as number)) / 100,
        }
    })
        .reduce((acc, curr) => {
            return {
                calories: acc.calories + curr.calories,
                proteins: acc.proteins + curr.proteins,
                carbs: acc.carbs + curr.carbs,
                fat: acc.fat + curr.fat,
                water: acc.water + curr.water,
            };
        });

    for (const key in result) {
        result[key as keyof typeof result] = +(result[key as keyof typeof result] / servings).toFixed(1)
    }

    return result
}


export async function buildRecipe(rawForm: RecipeRawForm) {
    const partialRecipe = await addPartialRecipe(rawForm)

    if (!partialRecipe) {
        throw new Error("Couldn't add raw data to the database");
    }


    const macro_recipe = await computeTotalMacro(partialRecipe.measures, partialRecipe.servings)

    const updateRecipe = addMacrosToRecipe(macro_recipe, partialRecipe.id)

    return updateRecipe

}


