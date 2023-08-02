import { prisma } from "~/service/db.server";
import { Meal } from "~/session";
import NotFoundError from "~/helpers/errors/not.found.error";
import DatabaseError from "~/helpers/errors/database.error";

export default {
  async findAllByAuthor(author_id: number) {
    try {
      const result = await prisma.meal_plans.findMany({
        where: {
          author_id,
        },
        include: {
          meals: {
            include: {
              meals: true,
            },
          },
        },
        orderBy: {
          created_at: "desc",
        },
      });
      await prisma.$disconnect();
      return result;
    } catch (error: any) {
      throw new DatabaseError(error.message, "meal_plans", error);
    }
  },
  async findById(id: number, author_id: number) {
    try {
      const result = await prisma.meal_plans.findFirst({
        where: {
          author_id,
          id,
        },
        include: {
          meals: {
            include: {
              meals: true,
            },
          },
          shopping: {
            include: {
              items: {
                include: {
                  list_item: {
                    include: {
                      ingredient: {
                        include: {
                          icon: true,
                          category: true,
                        },
                      },
                      unit_measure: true,
                    },
                  },
                },
              },
            },
          },
        },
      });
      await prisma.$disconnect();

      if (!result) throw new NotFoundError("Can't find item with associated id");

      const mealPlans = {
        id: result.id,
        author_id: result.author_id,
        created_at: result.created_at,
        shopping:
          result.shopping &&
          result.shopping.items.map((item) => item.list_item),
        meals: result.meals.map((meal) => {
          return {
            recipe_id: meal.meals.recipe_id,
            recipe_name: meal.meals.recipe_name,
            image: meal.meals.image,
            servings: meal.meals.servings,
          };
        }),
      };
      return mealPlans;
    } catch (error: any) {
      throw new DatabaseError(error.message, "meal_plans", error);
    }
  },
  async add(author_id: number, form: Array<Meal>) {
    try {
      const mealPlan = await prisma.meal_plans.create({
        data: {
          author_id: author_id,
          meals: {
            create: form.map((meal) => {
              return {
                meals: {
                  create: {
                    recipe_id: meal.recipe_id,
                    recipe_name: meal.recipe_name,
                    image: meal.image,
                    servings: meal.servings,
                  },
                },
              };
            }),
          },
        },
      });
      await prisma.$disconnect();
      return mealPlan;
    } catch (error: any) {
      throw new DatabaseError(error.message, "meal_plans", error)
    }
  },
  async findLast(author_id: number) {
    try {
      const mealPlan = await prisma.meal_plans.findFirst({
        where: {
          author_id,
        },
        include: {
          meals: {
            include: {
              meals: true,
            },
          },
        },
        orderBy: {
          created_at: "desc",
        },
      });
      await prisma.$disconnect();
      return mealPlan;
    } catch (error: any) {
      throw new DatabaseError(error.message, "meal_plans", error);
    }
  },
};
