import { prisma } from "~/service/db.server";
import DatabaseError from "~/helpers/errors/database.error";
import NotFoundError from "~/helpers/errors/not.found.error";
import type { Ingredient, IngredientCreatInput } from "~/types";

export default {
  async findAll(): Promise<Ingredient[]> {
    try {
      const ingredients = await prisma.ingredients.findMany({
        include: {
          category: true,
          macros: true,
          icon: true,
        },
      });
      await prisma.$disconnect();
      return ingredients;
    } catch (error) {
      throw new DatabaseError(
        "Server error can't acces data",
        "ingredients",
        error
      );
    }
  },
  // SELECT ingredients.id, ingredients.name, ingredients.unit_weight, icons.link, icons.image_key, macros.food, macros.calories, macros.proteins, macros.carbs, macros.fat, macros.water, categories.name as category_name FROM  ingredients LEFT JOIN categories ON ingredients.category_id = categories.id LEFT JOIN icons ON ingredients.icon_id = icons.id LEFT JOIN macros ON ingredients.macros_id = macros.id
  // async findAllRaw() {
  //     try {
  //         const result =
  //             await prisma.$queryRaw`SELECT DISTINCT ingredients.id, ingredients.name, ingredients.unit_weight, icons.link, icons.image_key, macros.calories, macros.proteins, macros.fat, macros.water, macros.carbs, categories.name as category_name  FROM ingredients
  //             LEFT JOIN categories
  //                 ON ingredients.category_id = categories.id
  //             LEFT JOIN icons
  //                 ON ingredients.icon_id = icons.id
  //             LEFT JOIN macros
  //                 ON ingredients.macros_id = macros.id
  //             ORDER BY ingredients.id ASC;
  //             `;
  //         await prisma.$disconnect()

  //         return result.map((ingredient: any) => {
  //             return {
  //                 id: ingredient.id,
  //                 name: ingredient.name,
  //                 unit_weight: ingredient.unit_weight,
  //                 icon: {
  //                     link: ingredient.link,
  //                     image_key: ingredient.image_key,
  //                 },
  //                 macros: {
  //                     food: ingredient.food,
  //                     calories: ingredient.calories,
  //                     proteins: ingredient.proteins,
  //                     carbs: ingredient.carbs,
  //                     fat: ingredient.fat,
  //                     water: ingredient.water,
  //                 },
  //                 category: {
  //                     name: ingredient.category_name,
  //                 },
  //             };
  //         });
  //     } catch (error) {
  //         throw new Error("Server error can't acces data");
  //     }
  // },
  async findById(id: number): Promise<Ingredient> {
    try {
      const ingredient = await prisma.ingredients.findUnique({
        where: {
          id,
        },
        include: {
          macros: true,
          icon: true,
          category: true,
        },
      });
      await prisma.$disconnect();
      if (!ingredient)
        throw new NotFoundError("Can't find item with associated id");
      return ingredient;
    } catch (error) {
      throw new DatabaseError(
        "Server error can't acces data",
        "ingredients",
        error
      );
    }
  },
  async add(form: IngredientCreatInput) {
    //--- Maybe not mandatory
    // if (form.macros_id === null) {
    //   form.macros_id = undefined;
    // }
    // if (form.icon_id === null) {
    //   form.icon_id = undefined;
    // }
    //---

    // cant solve typescript error
    try {
      const newIngredient = await prisma.ingredients.create({
        data: {
          name: form.name,
          unit_weight: form.unit_weight,
          category_id: form.category_id ?? undefined,
          macros_id: form.macros_id ?? undefined,
          icon_id: form.icon_id ?? undefined,
          // category: form.category_id && { connect: { id: form.category_id }},
          // macros: form.macros_id && { connect: { id: form.macros_id } },
          // icon: form.icon_id && { connect: { id: form.icon_id } },
        },
      });
      await prisma.$disconnect();
      return newIngredient;
    } catch (error: any) {
      throw new DatabaseError(error.message, "ingredients", error);
    }
  },
  async update(form: Ingredient) {
    try {
      await prisma.ingredients.update({
        where: {
          id: form.id,
        },
        data: {
          name: form.name,
          unit_weight: form.unit_weight,
          category_id: form.category_id,
          icon_id: form.icon_id,
          macros_id: form.macros_id,
        },
      });
      await prisma.$disconnect();
    } catch (error: any) {
      throw new DatabaseError(error.message, "ingredients", error);
    }
  },
  async destroy(id: number) {
    try {
      await prisma.ingredients.delete({
        where: {
          id,
        },
      });
      await prisma.$disconnect();
    } catch (error: any) {
      throw new DatabaseError(error.message, "ingredients", error);
    }
  },
};
