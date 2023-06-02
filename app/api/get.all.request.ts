import { prisma } from "~/utils/db.server"

export async function getCategories() {
    const categories = await prisma.ingredient_categories.findMany()
    await prisma.$disconnect()
    return categories
}

export async function getUnitComputes () {
    const unitComputes = await prisma.unit_computes.findMany()
    await prisma.$disconnect()
    return unitComputes
}

export async function getUnitMeasures() {
    const unitMeasures = await prisma.unit_measures.findMany()
    await prisma.$disconnect()
    return unitMeasures
}