import { type ActionArgs, json } from "@remix-run/node"
import { withZod } from "@remix-validated-form/with-zod"
import { buildRecipe } from "~/utils/recipe.builder.server"
import * as Z from "zod";
import { validationError } from "remix-validated-form";

export const validator = withZod(
    Z.object({
        id: Z.string().optional(),
        ingredient: Z.string().array().min(3, { message: "At least 3 ingredients are required" }),
        quantity: Z.string().array().min(3, { message: "At least 3 ingredients are required" }),
        unit: Z.string().array().min(3, { message: "At least 3 ingredients are required" }),
        name: Z.string().min(12, { message: "Must be a at least 12 characters long" }),
        prepTime: Z.string().min(1, { message: 'Required' }),
        cookTime: Z.string().min(1, { message: 'Required' }),
        author: Z.string(),
        servings: Z.string().min(1, { message: 'Required' }),
        tags: Z.string().array().optional(),
        ytLink: Z.string().startsWith('https://www.youtube.com/', { message: "Only youtube links are allowed" }).optional(),
        level: Z.union([Z.literal('easy'), Z.literal('medium'), Z.literal('hard')]),
        instructions: Z.string().array().min(1, { message: "At least 1 instructions  is required" }),
    }).refine(
        (value) => value.ingredient.length === value.quantity.length && value.ingredient.length === value.unit.length,
        { message: "Ingredient ,quantity and unit should have the same length", path: ["ingredients"] }
    )
)


export async function action({ request }: ActionArgs) {
    const method = request.method.toLowerCase()

    switch (method) {
        case "post": {
            const formData = await validator.validate(await request.formData())
            console.log(formData.error);
            if (formData.error) return validationError(formData.error)
            const { ingredient: ingredients, quantity: qty, unit: units, name, prepTime, cookTime, author, servings, tags, ytLink, level, instructions } = formData.data

            let measures = []
            for (let i = 0; i < ingredients.length; i++) {
                let measure = {
                    ingredient: ingredients[i],
                    unit_measure: units[i],
                    qty: qty[i]
                }
                measures.push(measure)
            }

            const form = {
                name,
                prepTime,
                cookTime,
                author,
                tags,
                servings,
                ytLink,
                level,
                qty,
                measures,
                instructions
            }

            try {
                const newRecipe = await buildRecipe(form)
                console.log(newRecipe);
                return json({ status: 200 })
            } catch (error: any) {
                console.log(error);
                return json({ error: error.message })
            }
        }
        case "patch": {
            // bloc de code
        }
        case "delete": {
            // bloc de code
        }
        default: {
            throw new Error('Invalid method')
        }

    }

    // console.log(newRecipe);

    // try {
    //     const newRecipe = await addRecipes(form)
    //     console.log(newRecipe);
    //     return json({form} , {status : 200})
    // } catch (error) {
    //     console.log(error);
    // }
}