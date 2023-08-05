import DatabaseError from "~/helpers/errors/database.error";
import NotFoundError from "~/helpers/errors/not.found.error";
import { prisma } from "~/service/db.server";

export default {
  async like(authorId: string, recipeId: string) {
    try {
      const updatedInfos = await prisma.reviews.upsert({
        where: {
          author_id_recipe_id: {
            author_id: Number(authorId),
            recipe_id: Number(recipeId),
          },
        },
        update: {
          is_liked: true,
        },
        create: {
          is_liked: true,
          author_id: Number(authorId),
          recipe_id: Number(recipeId),
        },
      });
      return updatedInfos;
    } catch (error: any) {
      throw new DatabaseError(error.message, "reviews", error);
    }
  },
  async unlike(authorId: string, recipeId: string) {
    try {
      const updatedInfos = await prisma.reviews.update({
        where: {
          author_id_recipe_id: {
            author_id: Number(authorId),
            recipe_id: Number(recipeId),
          },
        },
        data: {
          is_liked: false,
        },
      });
      await prisma.$disconnect();
      return updatedInfos;
    } catch (error: any) {
      throw new DatabaseError(error.message, "reviews", error);
    }
  },
  async findAllByAuthor(id: number) {
    try {
      const recipes = await prisma.recipes.findMany({
        where: {
          author_id: id,
        },
        include: {
          author: true,
          macros: true,
          measures: {
            include: {
              ingredient: {
                include: {
                  macros: true,
                  icon: true,
                },
              },
              unit_measure: true,
            },
          },
          difficulty: true,
          reviews: {
            where: {
              author_id: id,
            },
          },
          instructions: {
            include: {
              instructions: true,
            },
          },
          image: {
            select: {
              link: true,
            },
          },
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });
      if (!recipes) {
        throw new NotFoundError("Can't find item with associated id");
      }
      const result = recipes.map((recipe) => {
        return { ...recipe, tags: recipe.tags.map((tag) => tag.tag.name) };
      });
      await prisma.$disconnect();
      return result;
    } catch (error: any) {
      throw new DatabaseError(error.message, "recipe", error);
    }
  },
};
