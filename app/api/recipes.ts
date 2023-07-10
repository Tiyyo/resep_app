import { prisma } from "~/service/db.server"

export async function getRecipes() {
    try {
        const recipes = await prisma.recipes.findMany({
            include: {
                author: true,
                macro_recipe: true,
                image: {
                    select: {
                        imageKey: true,
                        link: true,
                    }
                },
                measures: {
                    include: {
                        ingredient: {
                            include: {
                                macros: true
                            }
                        },
                        unit_measure: true,
                    }
                },
                reviews: {
                    include: {
                        author: true
                    }
                },
                instructions: true,
                tags: {
                    include: {
                        tag: true,
                    }
                },
            }
        })
        const result = recipes.map((recipe) => {
            return { ...recipe, tags: recipe.tags.map((tag) => tag.tag.name) }
        })

        await prisma.$disconnect()
        return result
    } catch (error) {
        throw new Error("Server error can't acces data");
    }
}

export async function getAllReviewByRecipeId(id: number) {
    try {
        const reviews = await prisma.recipes.findUnique({
            where: {
                id: id
            },
        }).reviews(
            {
                include: {
                    author: true
                },
                orderBy: [
                    {
                        rating: 'desc'
                    },
                    {
                        created_at: 'desc'
                    },

                ]
            }
        )
        await prisma.$disconnect()
        return reviews
    } catch (error) {
        throw new Error("Server error can't acces data");
    }
}

export async function getLastRecipes() {
    try {
        const lastestRecipes = await prisma.recipes.findMany({
            orderBy: {
                created_at: 'desc'
            },
            take: 6,
            include: {
                macro_recipe: true,
                tags: true,
                reviews: true,
                image: {
                    select: {
                        link: true
                    }
                }
            }
        })
        await prisma.$disconnect()
        return lastestRecipes
    } catch (error) {
        console.log(error);
        throw new Error("Server error , couldn't get lastest recipes");
    }
}

export async function getRecipesByUser(authorId: number) {
    try {
        const recipes = await prisma.recipes.findMany({
            where: {
                author_id: authorId,
            },
            include: {
                author: true,
                macro_recipe: true,
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
        const result = recipes.map((recipe) => {
            return { ...recipe, tags: recipe.tags.map((tag) => tag.tag.name) };
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function getFavoriteRecipes(authorId: number) {
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
                macro_recipe: true,
                image: {
                    select: {
                        link: true,
                    },
                },
            },
        });
        return favoriteRecipes;
    } catch (error) {
        console.log(error);
    }
}

export async function getRecipesByTags(tags: string[]) {
    const tagsQuery = tags.map((tag: string) => {
        return {
            tag: {
                name: tag.toLowerCase(),
            },
        };
    });

    try {
        const rawResult = await prisma.recipesOnTags.findMany({
            where: {
                OR: tagsQuery,
            },
            include: {
                recipe: {
                    include: {
                        macro_recipe: true,
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
            return { ...r.recipe, tags: r.recipe.tags.map((tag) => tag.tag.name) };
        });
        return recipes;
    } catch (error) {
        console.log(error);
    }
}

export async function getRandomRecipes(numOfDay: number) {
    try {
        const recipes =
            await prisma.$queryRaw`SELECT recipes.id , recipes.name, recipes.image_id, images.link FROM recipes LEFT JOIN images ON recipes.image_id = images.id ORDER BY RANDOM() LIMIT ${numOfDay} `;
        return recipes;
    } catch (error) {
        console.log(error);
    }
}


export async function getRecipeById(recipeId: number) {
    try {
        const recipe = await prisma.recipes.findUnique({
            where: {
                id: recipeId
            },
            include: {
                author: true,
                macro_recipe: true,
                measures: {
                    include: {
                        ingredient: {
                            include: {
                                macros: true,
                                icon: true,
                            }
                        },
                        unit_measure: true,
                    }
                },
                difficulty: true,
                reviews: true,
                instructions: {
                    include: {
                        instructions: true
                    }
                },
                image: {
                    select: {
                        link: true
                    }
                },
                tags: {
                    include: {
                        tag: true
                    }
                }
            }
        })
        if (!recipe) {
            throw new Error("Can't find item with associated id");
        }
        const result = { ...recipe, tags: recipe.tags.map((tag) => tag.tag.name), instructions: recipe.instructions.map((instruction) => instruction.instructions.description) }
        return result
    } catch (error) {
        throw new Error("Server error can't acces data");
    }
}

export async function addRecipes(form: any) {

    const createInstruction = form.instructions.map((instruction: string) => {
        return {
            instructions: {
                create: {
                    description: instruction
                }
            }
        }
    })

    const createMeasure = form.measures.map((m: Measure) => {
        return { qty: m.qty, unit_measure_id: m.unit_measure, ingredient_id: m.ingredient }
    })


    try {
        const newRecipe = await prisma.recipes.create({
            data: {
                name: form.name,
                prep_time: form.prepTime,
                cook_time: form.cookTime,
                author: {
                    connect: {
                        id: form.author
                    }
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
                    }
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
                            }
                        }
                    })
                },
                measures: {
                    create: createMeasure
                },
                instructions: {
                    create: createInstruction
                    ,
                },
            }
        })
        return newRecipe.id
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                throw new Error("Can't add 2 items with the same name")
            }
            throw new Error('Unable to add item to database')
        }
    }
}

export async function addMacrosToRecipe(macros: Macros, id: number) {
    try {
        const updateRecipe = await prisma.recipes.update({
            where: {
                id: id
            },
            data: {
                macro_recipe: {
                    create: {
                        calories: macros.calories,
                        proteins: macros.proteins,
                        carbs: macros.carbs,
                        fat: macros.fat,
                        water: macros.water
                    }
                }
            }
        })
        return updateRecipe
    } catch (error) {
        throw new Error("Couldn't add macros to recipe");
    }
}

export async function updateMacroRecipe(macros: Macros, id: number) {
    try {
        const updateRecipe = await prisma.recipes.update({
            where: {
                id: id
            },
            data: {
                macro_recipe: {
                    proteins: macros.proteins,
                    calories: macros.calories,
                    carbs: macros.carbs,
                    fat: macros.fat,
                    water: macros.water
                }
            }
        })
        return updateRecipe
    } catch (error) {
        throw new Error("Couldn't update macros from recipe");
    }
}