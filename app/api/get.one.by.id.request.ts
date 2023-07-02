import { prisma } from "~/service/db.server"

export async function getMacrosById (macroId : number) {
    try {
        const macros = await prisma.macros.findUnique({
            where : {
                id :macroId
            }
        })  
        return macros   
    } catch (error) {
        throw new Error("Can't find item with associated id");      
    }
}

export async function getCategoriesById (categoryId : number) {
    try {
        const category = await prisma.ingredient_categories.findUnique({
            where : {
                id : categoryId
            }
        })
        return category
    } catch (error) {
        throw new Error("Can't find item with associated id");   
    }
}

export async function getIconsById (iconId : number) {
    try {
        const icon = await prisma.icons.findUnique({
            where : {
                id : iconId
            },
            include : {
                tags : true
            }
        })
        if (icon) {
            return {...icon, tags : icon.tags.map((tag) => tag.tag_name)}
        }
    } catch (error) {
        throw new Error("Can't find item with associated id");   
    }
}

export async function getIngredientsById (ingredientId : number) {
    try {
        const ingredient = await prisma.ingredients.findUnique({
            where : {
                id : ingredientId
            },
            include : {
                macros : true,
                icon : true,
                category : true
            }
        })
        return ingredient
    } catch (error) {
        throw new Error("Can't find item with associated id");   
    }
}

export async function getRecipeById(recipeId : number) {
    try {
        const recipe = await prisma.recipes.findUnique({
            where : {
                id : recipeId
            },
            include : {
                author : true,
                macro_recipe : true,
                measures : {
                    include : {
                        ingredient : {
                            include : {
                                macros : true,
                                icon : true,
                            }
                        } ,
                        unit_measure : true,
                    }
                },
                difficulty : true,
                reviews : true,
                instructions : {
                    include: {
                        instructions : true
                    }
                },
                image : {
                    select : {
                        link : true
                    }
                },
                tags : {
                    include : {
                        tag : true
                    }
                }
            }
        })
        if(!recipe){
            throw new Error("Can't find item with associated id");   
        }
        const result = {...recipe, tags : recipe.tags.map((tag) => tag.tag.name), instructions : recipe.instructions.map((instruction) => instruction.instructions.description) }
        return result
    } catch (error) {
        console.log(error);
    }
}