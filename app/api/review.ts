import { Prisma } from "@prisma/client"
import { prisma } from "~/service/db.server"
import { ReviewsCreateInput } from "./interfaces"

export default {
    async findByIds(authorId: number, recipeId: number) {
        try {
            const relationalInfos = await prisma.reviews.findUnique({
                where: {
                    author_id_recipe_id: {
                        author_id: authorId,
                        recipe_id: recipeId
                    }
                }
            })
            await prisma.$disconnect()
            return relationalInfos
        } catch (error) {
            throw new Error("Couldn't find relational infos between author and recipe");
        }
    },
    async findAllByRecipeId(id: number) {
        try {
            const reviews = await prisma.recipes.findUnique({
                where: {
                    id
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
    },
    async add(form: ReviewsCreateInput) {

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
            await prisma.$disconnect()
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
    },
    async aggretate(id: number) {
        try {
            const countAndAvg = await prisma.reviews.aggregate({
                where: {
                    recipe_id: Number(id)
                },
                _count: {
                    is_liked: true,
                    rating: true
                },
                _avg: {
                    rating: true
                }
            })
            await prisma.$disconnect()
            return countAndAvg
        } catch (error) {
            throw new Error("Couldn't aggregate recipes");
        }
    }
}

