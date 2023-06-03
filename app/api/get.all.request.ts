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

export async function getMacros () {
    const macros = await prisma.macros.findMany()
    await prisma.$disconnect()
    return macros 
}


export async function getAll(model : any) {
    const results = await prisma[`${model}`].findMany()
    await prisma.$disconnect()
    return results
}