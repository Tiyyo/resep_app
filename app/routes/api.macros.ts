import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { deleteMacro } from "~/api/delete.request";
import { patchMacros } from "~/api/patch.request";
import { addMacros } from "~/api/post.request";
import { convertStringToNumber } from "~/helpers/convert.to.number";



export async function action({ request }: ActionArgs) {
    const formData = await request.formData();
    const method = request.method.toLowerCase()


    switch (method) {
        case "post": {
            let food: string | null = null
            let calories: string | null = null
            let proteins: string | null = null
            let carbs: string | null = null
            let fat: string | null = null
            let water: string | null = null


            if (typeof formData.get('food') === "string") {
                food = formData.get('food') as string
            }
            if (typeof formData.get('calories') === "string") {
                calories = formData.get('calories') as string
            }
            if (typeof formData.get('proteins') === "string") {
                proteins = formData.get('proteins') as string
            }
            if (typeof formData.get('carbs') === "string") {
                carbs = formData.get('carbs') as string
            }
            if (typeof formData.get('fat') === "string") {
                fat = formData.get('fat') as string
            }
            if (typeof formData.get('water') === "string") {
                water = formData.get('water') as string
            }

            const numberFields = {
                calories,
                proteins,
                carbs,
                fat,
                water,
            }

            const formConverted = convertStringToNumber(numberFields)
            let form = { ...formConverted, food: food?.toLowerCase() }

            const newMacro = await addMacros(form)
            if(newMacro.id){
                return json({ status: 200 })
            } else {
                return json({error : newMacro} , {status : 400})
            }
        }
        case "patch": {
            let id: string | null = null
            let food: string | null = null
            let calories: string | null = null
            let proteins: string | null = null
            let carbs: string | null = null
            let fat: string | null = null
            let water: string | null = null


            if (typeof formData.get('id') === "string") {
                id = formData.get('id') as string
            }
            if (typeof formData.get('food') === "string") {
                food = formData.get('food') as string
            }
            if (typeof formData.get('calories') === "string") {
                calories = formData.get('calories') as string
            }
            if (typeof formData.get('proteins') === "string") {
                proteins = formData.get('proteins') as string
            }
            if (typeof formData.get('carbs') === "string") {
                carbs = formData.get('carbs') as string
            }
            if (typeof formData.get('fat') === "string") {
                fat = formData.get('fat') as string
            }
            if (typeof formData.get('water') === "string") {
                water = formData.get('water') as string
            }

            const numberFields = {
                id,
                calories,
                proteins,
                carbs,
                fat,
                water,
            }

            const formConverted = convertStringToNumber(numberFields)
            let form = { ...formConverted, food: food?.toLowerCase() }

            const newMacro = await patchMacros(form)
            if(newMacro.id === form.id){
                return json({ status: 200 })
            } else {
                return json({error : newMacro} , {status : 400})
            }
        }
        case "delete": {
            let id : string | null = null
            let deletedMacro = {} ;
            if (typeof formData.get('id') === "string") {
                id = formData.get('id') as string
            }
            const values = {
                id : id
            }

            const formConverted = convertStringToNumber(values)
          
            if(formConverted.id) {
                 deletedMacro = await deleteMacro(formConverted.id)
            }

            return deletedMacro.id === formConverted.id ? json({status : 200}) : json({error : deletedMacro})
    
        }
        default: {
            throw new Error('Invalid method')
        }

    }
}