import { prisma } from "~/utils/db.server"

/**
 * 
 * @param categoryId 
 * @returns 
 */
export async function deleteCategories (categoryId : number) {
    const deleteCategory = await prisma.ingredient_categories.delete({
        where : {
            id : categoryId
        }
    })
    await prisma.$disconnect
    return deleteCategory
} 

