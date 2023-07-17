import { Prisma } from "@prisma/client";
import { prisma } from "~/service/db.server";
import { Meal } from "~/session";

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
          }
        },
        orderBy: {
          created_at: "desc",
        }
      });
      await prisma.$disconnect();
      return result;
    } catch (error) {
      console.log(error)
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
          }
        },
        orderBy: {
          created_at: "desc",
        }
      });
      await prisma.$disconnect();

      if (!result) return null;

      const mealPlans = {
        id: result.id,
        author_id: result.author_id,
        created_at: result.created_at,
        meals: result.meals.map((meal) => {
          return {
            recipe_id: meal.meals.recipe_id,
            recipe_name: meal.meals.recipe_name,
            image: meal.meals.image,
            servings: meal.meals.servings,
          }
        }),
      }
      return mealPlans;
    } catch (error) {
      console.log(error)
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
      console.log(mealPlan, 'MEAL PLAN IN QUERY')
      return mealPlan;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          return {
            error: "There is a unique constraint violation , Already exists in database",
          };
        }
        if (error.code === "P2003") {
          return {
            error: "You're trying to add recipe to meal plan that doesn't exists",
          }
        }
      }
    }
  },
  async findLast(author_id: number) {
    try {
      const mealPlan = await prisma.meal_plans.findFirst({
        where: {
          author_id,
        },
        orderBy: {
          created_at: "desc",
        }
      })
      await prisma.$disconnect();
      return mealPlan;
    } catch (error) {
      console.log(error)
    }
  }
};


