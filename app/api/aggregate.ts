import { prisma } from "~/service/db.server"

export async function aggregateRecipes(recipeId) {
    try {
        const countAndAvg = await prisma.reviews.aggregate({
            where : {
                recipe_id : Number(recipeId)
            },
            _count : {
                is_liked : true,
                rating : true
            },
            _avg : {
                rating : true
            }
        })
        return countAndAvg
    } catch (error) {
        console.log(error);
    }
}