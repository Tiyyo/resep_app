import { prisma } from "~/service/db.server";

export async function getMeasuresByRecipeId(recipeIds: number[]) {
    try {
        const measures = await prisma.ingredientsOnRecipes.findMany({
            where: {
                recipe_id: {
                    in: recipeIds,
                },
            },
            include: {
                ingredient: {
                    include: {
                        macros: true,
                        icon: true,
                    },
                },
                unit_measure: true,
                recipe: true,
            },
            orderBy: {
                ingredient_id: "asc",
            },
        });
        return measures;
    } catch (error) {
        console.log(error);
    }
}