import { json } from "@remix-run/node"
import { prisma } from "~/service/db.server"
import { Prisma } from "@prisma/client"

/**
 * 
 * @param categoryId 
 * @returns 
 */

export async function deleteCategories (categoryId : number) {
    try {
        const deleteCategory = await prisma.ingredient_categories.delete({
            where : {
                id : categoryId
            }
        })
        await prisma.$disconnect()
        return deleteCategory
    } catch (error : any) {
        throw new Error ('Error deleting category')
    }
} 

export async function deleteMacro (macroId : number) {
    try {
        const deletedMacro = await prisma.macros.delete({
            where : {
                id : macroId
            }
        })
        await prisma.$disconnect()
        return deletedMacro
    } catch (error : any) {
        throw new Error (error.message)
    }
} 

export async function deleteIcon (iconId : number) {
    try {
        const deleteIcon = await prisma.icons.delete({
            where : { 
                id : iconId
            }
        })
        await prisma.$disconnect()
        return deleteIcon
    } catch(error : any) {
        throw new Error ('Error deleting icon')
    }
}

export async function deleteIngredient (ingredientId : number) {
    try {
        const deleteIngredient = await prisma.ingredients.delete({
            where : {
                id : ingredientId 
            }
        })
        return deleteIngredient
    } catch(error : any) {
        throw new Error ('Error deleting ingredient')
    }
}
