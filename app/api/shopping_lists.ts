import DatabaseError from "~/helpers/errors/database.error";
import type { IngredientQty } from "~/service/algo.builder.safer.server";
import { prisma } from "~/service/db.server";
import type { } from "~/types";

export default {
  async add(meal_plan_id: number, form: IngredientQty[]) {
    try {
      const shoppingList = await prisma.shopping_lists.create({
        data: {
          meal_plan_id,
          items: {
            create: form.map((el: IngredientQty) => {
              return {
                list_item: {
                  create: {
                    qty: Number(el?.qty?.toFixed(1)),
                    unit_measure: {
                      connect: {
                        id: el.unit_measure_id,
                      },
                    },
                    ingredient: {
                      connect: {
                        id: el.ingredient_id,
                      },
                    },
                  },
                },
              };
            }),
          },
        },
      });
      return shoppingList;
    } catch (error: any) {
      throw new DatabaseError(error.message, "shopping_lists", error);
    }
  },
};
