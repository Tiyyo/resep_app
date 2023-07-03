import { prisma } from "~/service/db.server"

export async function recipeOnUsers (recipeId , authorId ) {
 
    const relationalInfos =  await prisma.reviews.findUnique({
        where : {
            author_id_recipe_id :{
                author_id : Number(authorId),
                recipe_id : Number(recipeId)
            }
        }
})
return relationalInfos
}