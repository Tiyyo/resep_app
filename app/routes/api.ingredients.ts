import { json } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import { deleteIngredient } from "~/api/delete.request";

export async function action({request}:ActionArgs) {
    const formData = await request.formData();
    const method = request.method.toLowerCase()

    switch (method){
        case "post": {
            //bloc de code
        }
        case "patch" : {
            // bloc de code
        }
        case "delete" : {
            const ingredientId = formData.get('id')

            if(typeof ingredientId === "string" && ingredientId) {
                const deletedIngr = await deleteIngredient(+ingredientId)
                return deletedIngr
            }
            return json({error : 'An Id is mandatory to delete an item'}, {status : 400})
        }
        default : {
            throw new Error('Invalid method')
        }

    }
}