// const form = {
//     name,
//     prepTime,
//     cookTime,
//     author,
//     tags,
//     servings,
//     ytLink,
//     level,
//     measures,
// }

import { NumberReference } from "aws-sdk/clients/connect"
import { Icon } from "aws-sdk/clients/quicksight"
import { NumberFilter } from "aws-sdk/clients/securityhub"
import { getRecipeById } from "~/api/get.one.by.id.request"
import { addRecipes } from "~/api/post.request"

type difficulty = 'easy' | 'hard' | 'medium'

interface MeasureRaw {
    qty: string
    ingredient: string
    unit_measure: string

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
    ytLink?: string

}

interface Macros {
    id: number
    food?: string | null
    calories: number
    proteins: number
    carbs: number
    fat: number
    water: number
}

interface UnitMeasure {
    id: number
    equivalent: number
    unit: 'grams' | 'mililiters'
    abreviation: string
    name: string
}

interface Ingredient {
    id: number
    categoryId: number
    iconId?: number | null
    icon?: Icon | null
    macrosId?: number | null
    macros?: Macros | null
    name: string
    unit_weight?: number | null
}

interface Measure {
    ingredient: Ingredient
    ingredientId: number
    qty: number
    recipeId: number
    unit_compute?: string | null
    unit_measure_id: number
    unit_measure: UnitMeasure
}

type Measures = Array<Measure>


// export const recipe = {
//     name : "Recipe Name",
//     prepTime : "20",
//     cookTime : "20",
//     author : "2",
//     servings :"4",
//     level : "easy",
//     tags : ['chicken' , 'asia' , 'curry'],
//     measures : [
//         {   
//             qty : "100",
//             ingredient : "6",
//             unit_measure : "2"
//         },
//         {   
//             qty : "1",
//             ingredient : "15",
//             unit_measure : "11"
//         },
//         {   
//             qty : "1",
//             ingredient : "17",
//             unit_measure : "11"
//         },
//         {   
//             qty : "300",
//             ingredient : "20",
//             unit_measure : "5"
//         },
//     ],
//     ytLink : "url",
// }

function convertStringToNumber(rawForm: RecipeRawForm) {
    const convertRecipe = {
        name: rawForm.name,
        prepTime: parseInt(rawForm.prepTime, 10),
        cookTime: parseInt(rawForm.cookTime, 10),
        author: parseInt(rawForm.author),
        servings: parseInt(rawForm.author),
        difficulty: rawForm.level,
        tags: rawForm.tags ?? undefined,
        picture: rawForm ?? undefined,
        ytLink: rawForm.ytLink ?? undefined,
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
            ? (qty = measure.qty * measure.ingredient?.unit_weight)
            : 1;
    }
    qty = measure.qty * measure.unit_measure.equivalent;
    return qty;
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

function computeTotalMacro(measures: Measures, servings: number, calcQty: (m: Measure) => number) {
    const result = measures.map((m) => {
        if(!m.ingredient.macros){
            throw new Error('There is no macros to compute')
        }
        return {
            calories: (calcQty(m) * m.ingredient.macros.calories) / 100,
            proteins: (calcQty(m) * m.ingredient.macros.proteins) / 100,
            carbs: (calcQty(m) * m.ingredient.macros.carbs) / 100,
            fat: (calcQty(m) * m.ingredient.macros.fat) / 100,
            water: (calcQty(m) * m.ingredient.macros.water) / 100,
        }
    }).reduce((acc, curr) => {
        return {
            calories: +(acc.calories + curr.calories / servings).toFixed(1),
            proteins: +(acc.proteins + curr.proteins / servings).toFixed(1),
            carbs: +(acc.carbs + curr.carbs / servings).toFixed(1),
            fat: +(acc.fat + curr.fat / servings).toFixed(1),
            water: +(acc.water + curr.water / servings).toFixed(1),
        };
    });

    return result
}


export async function addMacrosToRecipe(rawForm: RecipeRawForm) {
    const partialRecipe = await addPartialRecipe(rawForm)
    const macro_recipe = computeTotalMacro(partialRecipe.measures, partialRecipe.servings, calcQty)
    const updateRecipe = addMacrosToRecipe(macro_recipe, partialRecipe.id )

    return updateRecipe

}


