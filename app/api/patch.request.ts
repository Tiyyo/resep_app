import { prisma } from "~/utils/db.server"

export async function patchCategories (object : {name : string , id : number}) {
    try {
        const updateCategory = await prisma.ingredient_categories.update({
            where : {
                id : object.id
            },
            data : {
                name : object.name
            }
    })
    return updateCategory 
    } catch (error : any) {
        return error.message
    }

} 