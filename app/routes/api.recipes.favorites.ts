import{ json, type ActionArgs } from "@remix-run/node";
import { recipeOnUsers } from "~/api/get.relation.between";
import { addRecipeToFavorites, removeRecipeFromFavorites, removeRecipeToFavorites } from "~/api/patch.request";
import { createRecipeToFavorites } from "~/api/post.request";

export async function action({request}:ActionArgs) {
    const formData = await request.formData();
    const method = request.method.toLowerCase()
    const recipeId = formData.get('recipeId');
    const authorId = formData.get('authorId');


    const infos = await recipeOnUsers(authorId, recipeId)
    console.log(infos);

    if (!infos) {
         await createRecipeToFavorites(authorId, recipeId)
    }

    if(infos?.is_liked){
         await removeRecipeFromFavorites(authorId, recipeId)
    }

    if(!infos?.is_liked){
         await addRecipeToFavorites(authorId, recipeId)
    }

    return json({message: 'ok'})
   
    switch (method){
        case "post": {
            //bloc de code
        }
        case "patch" : {
            // bloc de code
        }
        case "delete" : {
            // bloc de code
        }
        default : {
            return json({error: 'Invalid method'})
            throw new Error('Invalid method')
        }

    }
}