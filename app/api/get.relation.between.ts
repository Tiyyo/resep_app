import { prisma } from "~/service/db.server"

export async function recipeOnUsers (recipeId , authorId ) {
 
    const relationalInfos =  await prisma.reviews.findUnique({
        where : {
            author_id_recipe_id :{
                author_id : authorId,
                recipe_id : recipeId
            }
        }
})
return relationalInfos
}