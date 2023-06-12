import { ActionArgs, redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { withZod } from "@remix-validated-form/with-zod";
import { deleteMacro } from "~/api/delete.request";
import { patchMacros } from "~/api/patch.request";
import { addMacros } from "~/api/post.request";
import { convertStringToNumber } from "~/helpers/convert.to.number";
import * as Z from "zod";
import { validationError } from "remix-validated-form";

export const validator = withZod(
    Z.object({
        food : Z.string().toLowerCase(),
        calories : Z.string(),
        proteins: Z.string(),
        carbs : Z.string(),
        fat : Z.string(),
        water : Z.string(),
        id : Z.string().optional()
    })
)


export async function action({ request }: ActionArgs) {
    const method = request.method.toLowerCase()
    console.log(method);

    switch (method) {
        case "post": {
            const formData = await validator.validate(await request.formData())
            if (formData.error) return validationError(formData.error)
            const {food, calories, proteins, carbs, fat, water} = formData.data

            const numberFields = {
                calories,
                proteins,
                carbs,
                fat,
                water,
            }

            const formConverted = convertStringToNumber(numberFields)
            let form = { ...formConverted, food: food?.toLowerCase() }

            try {
                const newMacro = await addMacros(form)
                return json({newMacro} , {status : 200})
                } catch (error) {
                console.log(error);
            }
        }
        case "patch": {
            const formData = await validator.validate(await request.formData())
            if (formData.error) return validationError(formData.error)
            const {food, calories, proteins, carbs, fat, water , id} = formData.data

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
            const formData =await request.formData()
            let id : string |null = null

            let deletedMacro = {} ;

            if (typeof formData.get('id') === "string") {
                id = formData.get('id') as string
            }
            const values = {
                id : id
            }

            const formConverted = convertStringToNumber(values)
          
            try {
                if(formConverted.id) {
                    await deleteMacro(formConverted.id)   
                    return json({status : 200})
                }
                throw new Error ('No id provided')
            } catch (error) {
                console.log(error);
            }
        }
        default: {
            throw new Error('Invalid method')
        }

    }
}

