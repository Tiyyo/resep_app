import { prisma } from "~/utils/db.server"
import type { Prisma } from "@prisma/client"
import { json } from "@remix-run/node"

/**
 * 
 * @param {string} name 
 */
export async function addCategory (name : string) {
    let category : Prisma.Ingredient_categoriesCreateInput
    category = {
        name 
    }
    try {
        const createCategory  = await prisma.ingredient_categories.create({data : category})
        await prisma.$disconnect
        return createCategory

    } catch (error) {
        console.log(error?.message , 'ERROR MESSAGE');
        return json({error : 'This category already exist in database'} , {status : 400})
    }
    
}