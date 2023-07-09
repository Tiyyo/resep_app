import { prisma } from "~/service/db.server"
import { Prisma } from "@prisma/client"
import { json } from "@remix-run/node"
// import { PrismaClientKnownRequestError } from "@prisma/client/runtime"


export async function getCategories() {
    try {
        const categories = await prisma.ingredient_categories.findMany()
        await prisma.$disconnect()
        return categories
    } catch (error) {
        console.log(error);
    }
}

export async function getUnitMeasures() {
    try {
        const unitMeasures = await prisma.unit_measures.findMany()
        await prisma.$disconnect()
        return unitMeasures
    }
    catch (error) {
        throw new Error("Server error can't acces data");
    }
}

export async function getMacros() {
    try {
        const macros = await prisma.macros.findMany({
            where:{
                NOT : {
                    food : null
                }
            }
        })
        await prisma.$disconnect()
        return macros
    }
    catch (error) {
        throw new Error("Server error can't acces data");
    }
}

export async function getIcons() {
    try {
        const icons = await prisma.icons.findMany({
            include: {
                tags: true
            }
        })
        const result = icons.map((icon) => {
            return { ...icon, tags: icon.tags.map((tag) => tag.tag_name) }
        })
        await prisma.$disconnect()
        return result
    } catch (error) {
        throw new Error("Server error can't acces data");
    }
}

export async function getIngredients() {
    try {
        const ingredients = await prisma.ingredients.findMany({
            include: {
                category: true,
                macros: true,
                icon: true,
            }
        })
        await prisma.$disconnect()
        return ingredients
    } catch (error) {
        throw new Error("Server error can't acces data");
    }
}

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

export async function getAllReviewByRecipeId(id : number) {
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
            include : {
                macro_recipe: true,
                tags : true,
                reviews: true,
                image : {
                    select : {
                        link : true
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