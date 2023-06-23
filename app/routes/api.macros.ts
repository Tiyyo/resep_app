import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { withZod } from "@remix-validated-form/with-zod";
import { deleteMacro } from "~/api/delete.request";
import { patchMacros } from "~/api/patch.request";
import { addMacros } from "~/api/post.request";
import { convertStringToNumber } from "~/utils/convert.to.number";
import * as Z from "zod";
import { validationError } from "remix-validated-form";

export const validator = withZod(
    Z.object({
        food: Z.string().toLowerCase(),
        calories: Z.string().min(1,{message : "A number is required"}),
        proteins: Z.string().min(1, {message : "A number is required"}),
        carbs: Z.string().min(1, {message : "A number is required"})   ,
        fat: Z.string().min(1, {message : "A number is required"}),
        water: Z.string().min(1 , {message : "A number is required"}),
        id: Z.string().optional()
    })
)


export async function action({ request }: ActionArgs) {
    const method = request.method.toLowerCase()

    switch (method) {
        case "post": {
            const formData = await validator.validate(await request.formData())
            if (formData.error) return validationError(formData.error)
            const { food, calories, proteins, carbs, fat, water } = formData.data

            const numberFields = {
                calories,
                proteins,
                carbs,
                fat,
                water 
            }
                try {
                    const formConverted = await convertStringToNumber(numberFields)  
                    let form = { ...formConverted, food: food?.toLowerCase() }  
                    const newMacro = await addMacros(form)     
                    return json({ newMacro }, { status: 200 })
                } catch (error : any) {
                    if(error.message === "Invalid values") {
                        return json({ error: error.message + "! Numbers must be positive"}, { status: 400 })
                    }
                    return json({ error: "Server error ! Couldn't increment database" }, { status: 500 })
                }
        }
        case "patch": {
            const formData = await validator.validate(await request.formData())
            if (formData.error) return validationError(formData.error)
            const { food, calories, proteins, carbs, fat, water, id } = formData.data

            const numberFields = {
                id,
                calories,
                proteins,
                carbs,
                fat,
                water,
            }
    
            try {
                const formConverted = await convertStringToNumber(numberFields)
    
                let form = { ...formConverted, food: food?.toLowerCase() }
                await patchMacros(form)
                return redirect("/dashboard/macros")

            } catch (error : any) {
                if(error.message === "Invalid values") {
                    return json({ error: error.message + "! Numbers must be positive"}, { status: 400 })
                }
                return json({ error: "Server error ! Couldn't update database" }, { status: 500 })
            }
        }
        case "delete": {
            const formData = await request.formData()
            let id: string | null = null

            if (typeof formData.get('id') === "string") {
                id = formData.get('id') as string
            }
            const values = {
                id: id
            }

            const formConverted = convertStringToNumber(values)

            try {
                if (formConverted.id) {
                    await deleteMacro(formConverted.id)
                    return json({ status: 200 })
                }
                throw new Error('No id provided')
            } catch (error) {
                console.log(error);
            }
        }
        default: {
            throw new Error('Invalid method')
        }

    }
}

