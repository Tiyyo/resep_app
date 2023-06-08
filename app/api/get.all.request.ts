import { prisma } from "~/utils/db.server"
import { Prisma } from "@prisma/client"
import { json } from "@remix-run/node"


// Make this work

// export async function getAll(model ) {
//     const results = await prisma[`${model}`].findMany()
//     await prisma.$disconnect()
//     return results
// }

export async function getCategories() {
    try {
        const categories = await prisma.ingredient_categories.findMany()
        await prisma.$disconnect()
        return categories
    } catch (error: any) {
        return error.message
    }
}

export async function getUnitComputes() {
    try {
        const unitComputes = await prisma.unit_computes.findMany()
        await prisma.$disconnect()
        return unitComputes
    } catch (error: any) {
        return error.message
    }

}

export async function getUnitMeasures() {
    try {
        const unitMeasures = await prisma.unit_measures.findMany()
        await prisma.$disconnect()
        return unitMeasures
    }
    catch (error: any) {
        return error.message
    }
}

export async function getMacros() {
    try {
        const macros = await prisma.macros.findMany()
        await prisma.$disconnect()
        return macros
    }
    catch (error: any) {
        return error.message
    }
}

export async function getIcons () {
    try {
        const icons = await prisma.icons.findMany({
            include : {
                tags : true
            }
        })
        const result = icons.map((icon) => {
            return {...icon, tags : icon.tags.map((tag) => tag.tag_name)}
        })

        return result
    } catch (error : any) {
        return error.message
    }
}

export async function getIngredients () {
    try {
        const ingredients = await prisma.ingredients.findMany({
            include : {
                category : true,
                macros : true,
                icon : true,
            }
        })
        return ingredients
    } catch (error : any) {
        return error.message
    }
}
