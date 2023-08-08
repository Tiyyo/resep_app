import DatabaseError from "~/helpers/errors/database.error";
import NotFoundError from "~/helpers/errors/not.found.error";
import { prisma } from "~/service/db.server";
import type { Measure } from "~/types";

export default {
  async findManyByIds(ids: number[]): Promise<Measure[]> {
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
      if (!measures) throw new NotFoundError("Measures not found");
      return measures;
    } catch (error: any) {
      throw new DatabaseError(error.message, "ingredients_on_recipes", error);
    }
  },
};
