import macro from "~/api/macro";
import recipe from "~/api/recipe";
import type { Measure, Measures, RecipeRawForm } from "~/types/recipe"


function convertStringToNumber(rawForm: RecipeRawForm) {


    const convertRecipe = {
        name: rawForm.name,
        prepTime: parseInt(rawForm.prepTime, 10),
        cookTime: parseInt(rawForm.cookTime, 10),
        author: parseInt(rawForm.author),
        servings: parseInt(rawForm.servings, 10),
        difficulty: rawForm.level,
        tags: rawForm.tags ?? undefined,
        image: rawForm.image ?? undefined,
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

    if (measure.unit_measure.name === "pieces" && measure.ingredient.unit_weight) {
        qty = (measure.qty as number) * (measure.ingredient?.unit_weight as number)
        return qty
    }
    if (measure.unit_measure.equivalent) {
        qty = (measure.qty as number) * (measure.unit_measure.equivalent as number);
        return qty
    }
    return qty
};

async function addPartialRecipe(rawForm: RecipeRawForm) {
    const rawRecipe = convertStringToNumber(rawForm)

    try {
        const newRecipeId = await recipe.add(rawRecipe)

        if (newRecipeId) {
            const partialRecipe = await recipe.findById(newRecipeId)
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
        result[key as keyof typeof result] = +(result[key as keyof typeof result] / servings).toFixed(1);
    }

    return result
}


export async function buildRecipe(rawForm: RecipeRawForm) {
    const partialRecipe = await addPartialRecipe(rawForm)

    if (!partialRecipe) {
        throw new Error("Couldn't add raw data to the database");
    }

    const macroRecipe = await computeTotalMacro(partialRecipe.measures, partialRecipe.servings)

    const updateRecipe = await recipe.addMacro(macroRecipe, partialRecipe.id)

    return updateRecipe
}

export default async function computeNewMacroAfterToUpdateRecipe(recipeId: number) {

    const foundRecipe = await recipe.findById(recipeId)

    if (!recipe) {
        throw new Error("Couldn't find recipe");
    }

    const macroRecipe = await computeTotalMacro(foundRecipe.measures, foundRecipe.servings)


    const form = {
        ...macroRecipe, id: foundRecipe.macros_id
    }

    const updatedMacroRecipe = await macro.update(form)

    return updatedMacroRecipe
}


