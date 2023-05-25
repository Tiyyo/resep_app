import { prisma } from "~/utils/db.server"

export async function getCategories() {
    const categories = await prisma.ingredient_categories.findMany()
    await prisma.$disconnect()
    return categories
}

