import { prisma } from "~/service/db.server";
import type { RecipeCreateInput, Recipe, MacrosCreatInput, Macros } from "~/types/index";
import DatabaseError from "~/helpers/errors/database.error";
import UserInputError from "~/helpers/errors/user.inputs.error";
import NotFoundError from "~/helpers/errors/not.found.error";
import { Prisma } from "@prisma/client";


export default {
  async findAll(): Promise<Recipe[]> {
    try {
      const recipes = await prisma.recipes.findMany({
        include: {
          author: true,
          macros: true,
          image: {
            select: {
              imageKey: true,
              link: true,
            },
          },
          measures: {
            include: {
              ingredient: {
                include: {
                  macros: true,
                },
              },
              unit_measure: true,
            },
          },
          reviews: {
            include: {
              author: true,
            },
          },
          instructions: true,
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });
      const result = recipes.map((recipe) => {
        return {
          ...recipe,
          tags: recipe.tags.map((tag) => tag.tag.name),
        };
      });
      await prisma.$disconnect();
      return result;
    } catch (error: any) {
      throw new DatabaseError(error.message, "recipes", error);
    }
  },
  async findById(id: number): Promise<Recipe> {
    try {
      const recipe = await prisma.recipes.findUnique({
        where: {
          id,
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
          reviews: true,
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
      if (!recipe) {
        throw new NotFoundError("Can't find item with associated id");
      }
      const result = {
        ...recipe,
        tags: recipe.tags.map((tag) => tag.tag.name),
        instructions: recipe.instructions.map(
          (instruction) => instruction.instructions.description
        ),
      };
      await prisma.$disconnect();
      return result;
    } catch (error: any) {
      throw new DatabaseError(error.message, "recipes", error);
    }
  },
  async findLast(all?: boolean): Promise<Recipe[]> {
    try {
      const lastestRecipes = await prisma.recipes.findMany({
        orderBy: {
          created_at: "desc",
        },
        take: all ? undefined : 6,
        include: {
          macros: true,
          tags: true,
          reviews: true,
          image: {
            select: {
              link: true,
            },
          },
        },
      });
      await prisma.$disconnect();
      // const lastestRecipes = await prisma.$queryRaw`SELECT recipes.id as recipe_id , recipes.name as recipe_name, images.link as image, recipes.servings FROM recipes LEFT JOIN images ON recipes.image_id = images.id ORDER BY created_at DESC LIMIT 6 `;
      if (!lastestRecipes) throw new NotFoundError("Can't find item with associated id")
      return lastestRecipes;
    } catch (error: any) {
      throw new DatabaseError(error.message, "recipes", error);
    }
  },
  async findRandom(num: number): Promise<Recipe[]> {
    try {
      const recipes =
        await prisma.$queryRaw`SELECT recipes.id as recipe_id , recipes.name as recipe_name, images.link as image, recipes.servings FROM recipes LEFT JOIN images ON recipes.image_id = images.id ORDER BY RANDOM() LIMIT ${num} `;
      return recipes as Recipe[];
    } catch (error: any) {
      throw new DatabaseError(error.message, "recipes", error);
    }
  },
  async findByAuthor(authorId: number): Promise<Recipe[]> {
    try {
      const recipes = await prisma.recipes.findMany({
        where: {
          author_id: authorId,
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
              author_id: authorId,
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

      // const recipes = await prisma.$queryRaw`SELECT recipes.id as recipe_id , recipes.name as recipe_name, images.link as image, recipes.servings FROM recipes LEFT JOIN images ON recipes.image_id = images.id WHERE recipes.author_id = ${authorId} `;

      const result = recipes.map((recipe) => {
        return {
          ...recipe,
          tags: recipe.tags.map((tag) => tag.tag.name),
        };
      });
      await prisma.$disconnect();
      return result;
    } catch (error: any) {
      throw new DatabaseError(error.message, "recipes", error);
    }
  },
  async findLikedByUser(authorId: number): Promise<Recipe[]> {
    try {
      const favoriteRecipes = await prisma.recipes.findMany({
        where: {
          reviews: {
            some: {
              is_liked: true,
              author_id: authorId,
            },
          },
        },
        include: {
          reviews: true,
          macros: true,
          image: {
            select: {
              link: true,
            },
          },
        },
      });
      await prisma.$disconnect();
      return favoriteRecipes;
    } catch (error: any) {
      throw new DatabaseError(error.message, "recipes", error);
    }
  },
  async findByTags(tags: string[]): Promise<Recipe[]> {
    const tagsQuery = tags.map((tag: string) => {
      return {
        tag: {
          name: tag.toLowerCase(),
        },
      };
    });

    try {
      const rawResult = await prisma.recipes_on_tags.findMany({
        where: {
          OR: tagsQuery,
        },
        include: {
          recipe: {
            include: {
              macros: true,
              image: {
                select: {
                  link: true,
                },
              },
              reviews: true,
              tags: {
                include: {
                  tag: true,
                },
              },
            },
          },
        },
      });

      if (!rawResult) {
        throw new NotFoundError("Can't find item with associated id");
      }
      const recipes = rawResult.map((r) => {
        return {
          ...r.recipe,
          tags: r.recipe.tags.map((tag) => tag.tag.name),
        };
      });
      await prisma.$disconnect();
      return recipes;
    } catch (error: any) {
      throw new DatabaseError(error.message, "recipes", error);
    }
  },
  async add(form: RecipeCreateInput) {
    if (!form) {
      throw new UserInputError("Form is empty");
    }

    const createInstruction = form.instructions.map((instruction: string) => {
      return {
        instructions: {
          create: {
            description: instruction,
          },
        },
      };
    });

    const createMeasure = form.measures.map((m) => {
      return {
        qty: new Prisma.Decimal(Number(m.qty)),
        unit_measure_id: m.unit_measure_id,
        ingredient: m.ingredient,
        ingredient_id: m.ingredient_id,
        unit_measure: m.unit_measure,
      };
    });

    try {
      const newRecipe = await prisma.recipes.create({
        data: {
          name: form.name,
          prep_time: form.prep_time,
          cook_time: form.cook_time,
          author: {
            connect: {
              id: form.author_id,
            },
          },
          servings: form.servings,
          difficulty: {
            connectOrCreate: {
              where: {
                name: form.level,
              },
              create: {
                name: form.level,
              },
            },
          },
          image: form.image ? {
            create: {
              link: form.image.link,
              imageKey: form.image.image_key,
              width: form.image.width,
            }
          } : undefined,
          tags: form.tags && {
            create: form.tags.map((tag: string) => {
              return {
                tag: {
                  connectOrCreate: {
                    where: {
                      name: tag.toLowerCase(),
                    },
                    create: {
                      name: tag.toLowerCase(),
                    },
                  },
                },
              };
            }),
          },
          measures: {
            create: createMeasure,
          },
          instructions: {
            create: createInstruction,
          },
        },
      });
      await prisma.$disconnect();
      return newRecipe.id;
    } catch (error: any) {
      throw new DatabaseError(error.message, "recipes", error);
    }
  },
  async addMacro(form: MacrosCreatInput, id: number) {
    try {
      const updateRecipe = await prisma.recipes.update({
        where: {
          id,
        },
        data: {
          macros: {
            create: {
              calories: form.calories,
              proteins: form.proteins,
              carbs: form.carbs,
              fat: form.fat,
              water: form.water,
            },
          },
        },
      });
      await prisma.$disconnect();
      return updateRecipe;
    } catch (error: any) {
      throw new DatabaseError(error.message, "recipes", error);
    }
  },
  async updateMacro(form: Macros, id: number) {
    try {
      const updateRecipe = await prisma.recipes.update({
        where: {
          id: id,
        },
        data: {
          macros: {
            update: {
              proteins: form.proteins,
              calories: form.calories,
              carbs: form.carbs,
              fat: form.fat,
              water: form.water,
            }
          }
        }
      });
      await prisma.$disconnect();
      return updateRecipe;
    } catch (error: any) {
      throw new DatabaseError(error.message, "recipes", error);
    }
  },
  async search(queries: string[]) {
    try {
      const result = await prisma.recipes.findMany({
        where: {
          OR: [
            {
              name: {
                in: queries,
              },
            },
            {
              tags: {
                some: {
                  tag: {
                    name: {
                      in: queries,
                    },
                  },
                },
              },
            },
          ],
        },
        include: {
          author: true,
          macros: true,
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
      return result;
    } catch (error: any) {
      throw new DatabaseError(error.message, "recipes", error);
    }
  },
  async searchRaw(queries: string[]) {
    const likeQueries = queries.map((query) => "%" + query + "%");
    try {
      const result = await prisma.$queryRaw`
            SELECT recipes.id, recipes.name, recipes.author_id , recipes.servings, recipes.image_id, images.link, macros.calories
            FROM recipes 
            INNER JOIN images ON images.id = recipes.image_id 
            INNER JOIN macros ON macros.id = recipes.macros_id
            WHERE recipes.name LIKE ANY (array[${likeQueries}])
            OR recipes.id IN (
            SELECT recipes.id 
            FROM recipes 
            INNER JOIN recipes_on_tags ON recipes_on_tags.recipe_id = recipes.id 
            WHERE (
                (recipes_on_tags.tag_id, recipes_on_tags.recipe_id) 
                IN 
                ( SELECT recipes_on_tags.tag_id , recipes_on_tags.recipe_id FROM recipes_on_tags 
                  INNER JOIN tags ON tags.id = recipes_on_tags.tag_id
                  WHERE tags.name LIKE ANY (array[${likeQueries}]) AND recipes_on_tags IS NOT NULL AND recipes_on_tags.recipe_id IS NOT NULL )
            ) AND recipes.id IS NOT NULL ) 
        `;
      return result;
    } catch (error: any) {
      throw new DatabaseError(error.message, "recipes", error);
    }
  },
};
