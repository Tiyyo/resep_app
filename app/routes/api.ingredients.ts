import { json, redirect } from "@remix-run/node";
import type { ActionArgs } from "@remix-run/node";
import { deleteIngredient } from "~/api/delete.request";
import { patchIngredients } from "~/api/patch.request";

export async function action({request}:ActionArgs) {
    const formData = await request.formData();
    const method = request.method.toLowerCase()

    switch (method){
        case "post": {
            //bloc de code
        }
        case "patch" : {
            const iconId = Number(formData.get('iconId'))
            const macrosId = Number(formData.get('macrosId'))
            const ingredientId = Number(formData.get('id'))
            const unitWeight =  Number(formData.get('unitWeight')) ?? null
            const categoryId = Number(formData.get('categoryId'))
            const name = formData.get('name')

            if(!name) {
                return json({error : "A name is mandatory"})
            }
            if(!ingredientId) {
                return json({error : "You should provide an Id"})
            }

            if(!categoryId) {
                return json({error : "You have to pick a category"})
            }

            const form = {
                ingredientId , name , unitWeight , categoryId, macrosId, iconId, 
            }

            try {
                const updateIngredient = await patchIngredients(form)
                console.log(updateIngredient);
                return redirect('/admin_panel/ingredients')
            } catch (error) {
                console.log(error);
                return json({error : "Something went wrong "})  
            }

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