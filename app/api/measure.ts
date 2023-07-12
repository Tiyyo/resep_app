import { prisma } from "~/service/db.server";

export default {
    async findManyByIds(ids: number[]) {
        try {
            const measures = await prisma.ingredientsOnRecipes.findMany({
                where: {
                    recipe_id: {
                        in: ids,
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
            await prisma.$disconnect();
            return measures;
        } catch (error) {
            throw new Error("Server error can't acces data");
        }
    },
};
