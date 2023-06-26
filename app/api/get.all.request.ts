import { prisma } from "~/service/db.server"
import { Prisma } from "@prisma/client"
import { json } from "@remix-run/node"
// import { PrismaClientKnownRequestError } from "@prisma/client/runtime"


// // Make this work

// // export async function getAll(model ) {
// //     const results = await prisma[`${model}`].findMany()
// //     await prisma.$disconnect()
// //     return results
// // }

export async function getCategories() {
    try {
        const categories = await prisma.ingredient_categories.findMany()
        await prisma.$disconnect()
        return categories
    } catch (error ) {
        console.log(error);
    }
}

// export async function getUnitComputes() {
//     try {
//         const unitComputes = await prisma.unit_computes.findMany()
//         await prisma.$disconnect()
//         return unitComputes
//     } catch (error) {
//         console.log(error);
//     }
// }

export async function getUnitMeasures() {
    try {
        const unitMeasures = await prisma.unit_measures.findMany()
        await prisma.$disconnect()
        return unitMeasures
    }
    catch (error) {
        console.log(error);
    }
}

export async function getMacros() {
    try {
        const macros = await prisma.macros.findMany()
        await prisma.$disconnect()
        return macros
    }
    catch (error) {
        console.log(error);
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
        await prisma.$disconnect()
        return result
    } catch (error) {
        throw new Error("can't acces data");
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
        await prisma.$disconnect()
        return ingredients
    } catch (error) {
        console.log(error);
    }
}

export async function getRecipes () {
    try {
        const recipes = await prisma.recipes.findMany({
            include : {
                author : true,
                macro_recipe : true,  
                image : {
                    select : {
                        imageKey : true,
                        link : true,
                    }
                },
                measures : {
                    include : {
                        ingredient : {
                            include : {
                                macros : true
                            }
                        } ,
                        unit_measure : true,
                    }
                },
                favorite : true,
                reviews : true,
                instructions : true,
                tags : {
                    include : {
                        tag : true,
                    }
                },
            }
        })
        const result = recipes.map((recipe) => {
            return {...recipe, tags : recipe.tags.map((tag) => tag.tag.name)}
        })
        return result
    } catch (error) {
        console.log(error);
    }
}
