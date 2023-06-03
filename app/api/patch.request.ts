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
    await prisma.$disconnect()
    return updateCategory 
    } catch (error : any) {
        return error.message
    }

} 
export async function patchMacros (form) {
    try {
        const updateMacros = await prisma.macros.update({
            where : {
                id : form.id
            },
            data : {
                food : form.food,
                calories : form.calories,
                proteins : form.proteins,
                carbs : form.carbs,
                fat : form.fat,
                water : form.water,
            }
    })
    await prisma.$disconnect()
    return updateMacros 
    } catch (error : any) {
        return error.message
    }

} 