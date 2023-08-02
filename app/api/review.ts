import { prisma } from "~/service/db.server";
import DatabaseError from "~/helpers/errors/database.error";

export default {
  async findByIds(authorId: number, recipeId: number) {
    try {
      const relationalInfos = await prisma.reviews.findUnique({
        where: {
          author_id_recipe_id: {
            author_id: authorId,
            recipe_id: recipeId,
          },
        },
      });
      await prisma.$disconnect();
      return relationalInfos;
    } catch (error: any) {
      throw new DatabaseError(error.message, "reviews", error);
    }
  },
  async findAllByRecipeId(id: number) {
    try {
      const reviews = await prisma.recipes
        .findUnique({
          where: {
            id,
          },
        })
        .reviews({
          include: {
            author: true,
          },
          orderBy: [
            {
              rating: "desc",
            },
            {
              created_at: "desc",
            },
          ],
        });
      await prisma.$disconnect();
      return reviews;
    } catch (error: any) {
      throw new DatabaseError(error.message, "reviews", error);
    }
  },
  async add(form: {
    rating: number | undefined;
    comment: string | undefined;
    author_id: number;
    recipe_id: number;
  }) {
    try {
      const newReview = await prisma.reviews.create({
        data: {
          rating: form.rating,
          comment: form.comment,
          author: {
            connect: {
              id: form.author_id,
            },
          },
          recipe: {
            connect: {
              id: form.recipe_id,
            },
          },
        },
      });
      await prisma.$disconnect();
      return newReview;
    } catch (error: any) {
      throw new DatabaseError(error.message, "reviews", error);
    }
  },
  async aggretate(id: number) {
    try {
      const countAndAvg = await prisma.reviews.aggregate({
        where: {
          recipe_id: Number(id),
        },
        _count: {
          is_liked: true,
          rating: true,
        },
        _avg: {
          rating: true,
        },
      });
      await prisma.$disconnect();
      return countAndAvg;
    } catch (error: any) {
      throw new DatabaseError(error.message, "reviews", error);
    }
  },
};
