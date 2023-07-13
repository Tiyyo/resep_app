import { prisma } from "~/service/db.server"

export default {
    async like(authorId: string, recipeId: string) {
        try {
            const updatedInfos = await prisma.reviews.update({
                where: {
                    author_id_recipe_id: {
                        author_id: Number(authorId),
                        recipe_id: Number(recipeId)
                    }
                }, data: {
                    is_liked: true
                }
            })
            return updatedInfos
        } catch (error) {
            throw new Error("Couldn't add recipe to favorites");
        }
    },
    async destroy(authorId: string, recipeId: string) {
        try {
            const updatedInfos = await prisma.reviews.update({
                where: {
                    author_id_recipe_id: {
                        author_id: Number(authorId),
                        recipe_id: Number(recipeId)
                    }
                }, data: {
                    is_liked: false
                }
            })
            await prisma.$disconnect()
            return updatedInfos
        } catch (error) {
            throw new Error("Couldn't remove recipe from favorites");
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
                throw new Error("Can't find item with associated id");
            }
            const result = recipes.map((recipe) => {
                return { ...recipe, tags: recipe.tags.map((tag) => tag.tag.name) };
            });
            await prisma.$disconnect();
            return result;
        } catch (error) {
            throw new Error("Server error can't acces data");
        }
    }
}