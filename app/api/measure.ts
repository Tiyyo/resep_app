import DatabaseError from "~/helpers/errors/database.error";
import { prisma } from "~/service/db.server";

export default {
  async findManyByIds(ids: number[]) {
    try {
      const measures = await prisma.ingredients_on_recipes.findMany({
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
    } catch (error: any) {
      throw new DatabaseError(error.message, "ingredients_on_recipes", error);
    }
  },
};
