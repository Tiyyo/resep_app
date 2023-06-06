import { json } from "@remix-run/node"
import { prisma } from "~/utils/db.server"

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
        return error.message
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
        return error.message
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
        return error.message
    }
}
