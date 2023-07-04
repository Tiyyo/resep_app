import { type ActionArgs, json } from "@remix-run/node"
import { withZod } from "@remix-validated-form/with-zod"
import { buildRecipe } from "~/utils/recipe.builder.server"
import * as Z from "zod";
import { validationError } from "remix-validated-form";
import { deleteImageFromBucket, uploadImage } from "~/service/s3.server";

export const validator = withZod(
    Z.object({
        id: Z.string().optional(),
        ingredient: Z.string().array().min(3, { message: "At least 3 ingredients are required" }),
        quantity: Z.string().array().min(3, { message: "At least 3 ingredients are required" }),
        unit: Z.string().array().min(3, { message: "At least 3 ingredients are required" }),
        name: Z.string().min(12, { message: "Must be a at least 12 characters long" }),
        image_recipe: Z.any().optional(),
        prepTime: Z.string().min(1, { message: 'Required' }),
        cookTime: Z.string().min(1, { message: 'Required' }),
        author: Z.string(),
        servings: Z.string().min(1, { message: 'Required' }),
        tags: Z.string().array().optional(),
        ytLink: Z.string().startsWith('https://www.youtube.com/', { message: "Only youtube links are allowed" }).optional().or(Z.literal('')),
        level: Z.union([Z.literal('easy'), Z.literal('medium'), Z.literal('hard')]),
        instructions: Z.string().array().min(2, { message: "At least 2 instructions is required" }),
    }).refine(
        (value) => value.ingredient.length === value.quantity.length && value.ingredient.length === value.unit.length,
        { message: "Ingredient ,quantity and unit should have the same length", path: ["ingredients"] }
    )
)


export async function action({ request }: ActionArgs) {
    const copyRequest = request.clone();
    const method = copyRequest.method.toLowerCase()

    switch (method) {
        case "post": {
            const formData = await validator.validate(await copyRequest.formData())

            let imageLink: string | undefined = undefined
            let imageKey: string | undefined = undefined

            if (formData.error) return validationError(formData.error)

            if (formData.data.image_recipe) {
                let { imageLink: link, imageKey: key } = await uploadImage(request, "image_recipe");
                imageLink = link
                imageKey = key
            }
            const { ingredient: ingredients, quantity: qty, unit: units, name, prepTime, cookTime, author, servings, tags, ytLink, level, instructions, image_recipe } = formData.data


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
                instructions,
                image: imageKey && imageLink && {
                    imageKey: imageKey,
                    link: imageLink,
                    width: 400
                }
            }


            try {
                const newRecipe = await buildRecipe(form)
                return json({ status: 200 })
            } catch (error: any) {
                await deleteImageFromBucket(imageKey)
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
}