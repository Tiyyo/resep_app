import { Prisma } from "@prisma/client";
import { prisma } from "~/service/db.server";
import { Meal } from "~/session";

export default {
  async findLastsByAuthor(author_id: number) {
    try {
      const mealPlans = await prisma.meal_plans.findMany({
        where: {
          author_id,
        },
        orderBy: {
          created_at: "desc",
        },
      });
      await prisma.$disconnect();
      return mealPlans;
    } catch (error) {
      console.log(error);
    }
  },
  async findAllByAuthor() {},
  async add(author_id: number, form: Array<Meal>) {
    try {
      const mealPlan = await prisma.meal_plans.create({
        data: {
          author_id,
          meals: {
            create: form.map((meal) => {
              return {
                recipe_id: meal.recipe_id,
                servings: meal.servings,
                name: meal.name,
                image: meal.image,
              };
            }),
          },
        },
      });
      await prisma.$disconnect();
      return mealPlan;
    } catch (error) {
      console.log(error);
    }
  },
};
