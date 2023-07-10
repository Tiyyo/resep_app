import { prisma } from "~/service/db.server"

export async function addReview(form: ReviewsCreateInput) {
    const author_id = form.authorId
    const recipe_id = form.recipeId

    try {
        const newReview = await prisma.reviews.create({
            data: {
                rating: form.rating,
                comment: form.comment,
                author: {
                    connect: {
                        id: author_id
                    }
                },
                recipe: {
                    connect: {
                        id: recipe_id
                    }
                }
            }
        })
        return newReview
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                throw ({ message: 'You cannot add several reviews , Please edit the one you already posted' })
            }
            throw ({ message: 'Unable to add item to database' })
        }
        return error.message
    }
}

export async function createRecipeToFavorites(authorId: any, recipeId: any) {

    let author_id: number | undefined
    let recipe_id: number | undefined

    if (typeof authorId !== "number") {
        const id = Number(authorId)
        if (!isNaN(id)) {
            throw new Error("Couldn't convert authorId to number")
        }
        author_id = id
    }

    if (typeof recipeId !== "number") {
        const id = Number(recipeId)
        if (!isNaN(id)) {
            throw new Error("Couldn't convert recipeId to number")
        }
        recipe_id = id
    }

    try {
        const newInfos = await prisma.reviews.create({
            data: {
                author_id,
                recipe_id,
                is_liked: true
            }
        })
        return newInfos
    } catch (error: any) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                throw ({ message: 'You cannot add several reviews , Please edit the one you already posted' })
            }
            throw ({ message: 'Unable to add item to database' })
        }
        return error.message
    }
}

export async function addRecipeToFavorites(authorId: string, recipeId: string) {

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
}

export async function removeRecipeFromFavorites(authorId: string, recipeId: string) {
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

        return updatedInfos
    } catch (error) {
        throw new Error("Couldn't remove recipe from favorites");
    }
}

export async function recipeOnUsers(recipeId: number, authorId: number) {

    const relationalInfos = await prisma.reviews.findUnique({
        where: {
            author_id_recipe_id: {
                author_id: authorId,
                recipe_id: recipeId
            }
        }
    })
    return relationalInfos
}

export async function aggregateRecipes(recipeId) {
    try {
        const countAndAvg = await prisma.reviews.aggregate({
            where: {
                recipe_id: Number(recipeId)
            },
            _count: {
                is_liked: true,
                rating: true
            },
            _avg: {
                rating: true
            }
        })
        return countAndAvg
    } catch (error) {
        console.log(error);
    }
}