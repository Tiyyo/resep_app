import { Prisma } from "@prisma/client";
import { prisma } from "~/service/db.server";
import {
    Macros,
    MacrosCreatInput,
    Measure,
    Recipe,
    RecipeRawForm,
} from "~/types/recipe";
import { RecipeCreateInput } from "./interfaces";

export default {
    async findAll() {
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
        } catch (error) {
            throw new Error("Server error can't acces data");
        }
    },
    async findById(id: number) {
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
                throw new Error("Can't find item with associated id");
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
        } catch (error) {
            throw new Error("Server error can't acces data");
        }
    },
    async findLast() {
        try {
            const lastestRecipes = await prisma.recipes.findMany({
                orderBy: {
                    created_at: "desc",
                },
                take: 6,
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
            return lastestRecipes;
        } catch (error) {
            console.log(error);
            throw new Error("Server error , couldn't get lastest recipes");
        }
    },
    async findRandom(num: number) {
        try {
            const recipes =
                await prisma.$queryRaw`SELECT recipes.id as recipe_id , recipes.name as recipe_name, images.link as image, recipes.servings FROM recipes LEFT JOIN images ON recipes.image_id = images.id ORDER BY RANDOM() LIMIT ${num} `;
            return recipes;
        } catch (error) {
            console.log(error);
            throw new Error("Server error , couldn't get random recipes");
        }
    },
    async findByAuthor(authorId: number) {
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
                throw new Error("Can't find item with associated id");
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
        } catch (error) {
            console.log(error);
        }
    },
    async findLikedByUser(authorId: number) {
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
        } catch (error) {
            console.log(error);
            throw new Error("Server error , couldn't get favorite recipes");
        }
    },
    async findByTags(tags: string[]) {
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
                throw new Error("Can't find item with associated id");
            }
            const recipes = rawResult.map((r) => {
                return {
                    ...r.recipe,
                    tags: r.recipe.tags.map((tag) => tag.tag.name),
                };
            });
            await prisma.$disconnect();
            return recipes;
        } catch (error) {
            console.log(error);
            throw new Error("Server error can't acces data");
        }
    },
    async add(form: RecipeCreateInput) {
        if (!form) {
            throw new Error("Form is empty");
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

        const createMeasure = form.measures.map((m: Measure) => {
            return {
                qty: m.qty,
                unit_measure_id: m.unit_measure,
                ingredient_id: m.ingredient,
            };
        });

        try {
            const newRecipe = await prisma.recipes.create({
                data: {
                    name: form.name,
                    prep_time: form.prepTime,
                    cook_time: form.cookTime,
                    author: {
                        connect: {
                            id: form.author_id,
                        },
                    },
                    servings: form.servings,
                    macro_recipe: form.macrosId ?? undefined,
                    difficulty: {
                        connectOrCreate: {
                            where: {
                                name: form.difficulty,
                            },
                            create: {
                                name: form.difficulty,
                            },
                        },
                    },
                    image: form.image && {
                        create: {
                            link: form.image.link,
                            imageKey: form.image.imageKey,
                            width: form.image.width,
                        },
                    },
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
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new Error("Can't add 2 items with the same name");
                }
                throw new Error("Unable to add item to database");
            }
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
        } catch (error) {
            throw new Error("Couldn't add macros to recipe");
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
                        proteins: form.proteins,
                        calories: form.calories,
                        carbs: form.carbs,
                        fat: form.fat,
                        water: form.water,
                    },
                },
            });
            await prisma.$disconnect();
            return updateRecipe;
        } catch (error) {
            throw new Error("Couldn't update macros from recipe");
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
        } catch (error) {
            console.log(error);
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
            SELECT recipes.id FROM recipes INNER JOIN recipes_on_tags ON recipes_on_tags.recipe_id = recipes.id 
            WHERE (
                (recipes_on_tags.tag_id, recipes_on_tags.recipe_id) 
                IN 
                ( SELECT recipes_on_tags.tag_id , recipes_on_tags.recipe_id FROM recipes_on_tags 
                  INNER JOIN tags ON tags.id = recipes_on_tags.tag_id
                  WHERE tags.name LIKE ANY (array[${likeQueries}]) AND recipes_on_tags IS NOT NULL AND recipes_on_tags.recipe_id IS NOT NULL )
            ) AND recipes.id IS NOT NULL ) 
        `;
            console.log(result);
            return result;
        } catch (error) {
            console.log(error);
        }
    },
};
