import type { FormPropsEditIcon } from "~/routes/api.icons"
import { prisma } from "~/service/db.server"
import { Ingredient, Macros } from "~/types/recipe"

interface IngredientUpdateForm extends Ingredient {
    ingredientId: number
    unitWeight?: number
}

export async function patchCategories(object: { name: string, id: number }) {
    try {
        const updateCategory = await prisma.ingredient_categories.update({
            where: {
                id: object.id
            },
            data: {
                name: object.name
            }
        })
        await prisma.$disconnect()
        return updateCategory
    } catch (error: any) {
        throw new Error("Can't update category");
    }

}
export async function patchMacros(form : Macros) {

    try {
        const updateMacros = await prisma.macros.update({
            where: {
                id: form.id
            },
            data: {
                food: form.food,
                calories: form.calories,
                proteins: form.proteins,
                carbs: form.carbs,
                fat: form.fat,
                water: form.water,
            }
        })
        await prisma.$disconnect()
        return updateMacros
    } catch (error: any) {
        throw new Error("Can't update macros");
    }
}

export async function patchIcons(form: FormPropsEditIcon) {
    console.log(form);
    try {
        if (form.tags) {
            const createTags = form.tags.map((tag) => {
                return {
                    tag: {
                        connectOrCreate: {
                            where: {
                                name: tag.toLowerCase(),
                            },
                            create: {
                                name: tag.toLowerCase(),
                            },
                        },
                    }
                }
            })
            const updateIcon = await prisma.icons.update({
                where: {
                    id: form.id
                },
                data: {
                    name: form.name,
                    link: form.imageLink,
                    image_key: form.imageKey,
                    tags: {
                        deleteMany: {},
                        create: createTags
                    }
                },
                include: {
                    tags: true
                },
            })
            return updateIcon
        } else {
            const updateIcon = await prisma.icons.update({
                where: {
                    id: form.id
                },
                data: {
                    name: form.name,
                    link: form.imageLink,
                    image_key: form.imageKey,
                },
            })
            return updateIcon
        }
    } catch (error: any) {
        throw new Error("Couldn't update icon");
    }
}



export async function patchIngredients(form : IngredientUpdateForm) {
    try {
        const updateIngredient = await prisma.ingredients.update({
            where: {
                id: form.ingredientId
            },
            data: {
                name: form.name,
                unit_weight: form.unitWeight,
                category_id: form.categoryId,
                icon_id: form.iconId,
                macros_id: form.macrosId,
            },
        })
        return updateIngredient
    } catch (error: any) {
        throw new Error("Couldn't update ingredient");
    }
}

export async function addMacrosToRecipe(macros : Macros, id : number) {
    try {
        const updateRecipe = await prisma.recipes.update({
            where: {
                id: id
            },
            data: {
                macro_recipe: {
                    create: {
                        calories: macros.calories,
                        proteins: macros.proteins,
                        carbs: macros.carbs,
                        fat: macros.fat,
                        water: macros.water
                    }
                }
            }
        })
        return updateRecipe
    } catch (error) {
        throw new Error("Couldn't add macros to recipe");     
    }
}


export async function updateMacroRecipe(macros :  Macros, id : number) {
    try {
        const updateRecipe = await prisma.recipes.update({
            where: {
                id: id
            },
            data: {
                macro_recipe: {
                    proteins: macros.proteins,
                    calories: macros.calories,
                    carbs: macros.carbs,
                    fat: macros.fat,
                    water: macros.water
                }
            }
        })
        return updateRecipe
    } catch (error) {
        throw new Error("Couldn't update macros from recipe");
    }
}

export async function addRecipeToFavorites(authorId : string, recipeId : string) {

    try {
        const updatedInfos = await prisma.reviews.update({
            where: {
                author_id_recipe_id: {
                    author_id: Number(authorId),
                    recipe_id: Number(recipeId)
                }
            }, data: {
                is_liked: true
            }
        })
        return updatedInfos
    } catch (error) {
        throw new Error("Couldn't add recipe to favorites");
    }
}

export async function removeRecipeFromFavorites(authorId : string, recipeId : string) {
    try {
        const updatedInfos = await prisma.reviews.update({
            where: {
                author_id_recipe_id: {
                    author_id: Number(authorId),
                    recipe_id: Number(recipeId)
                }
            }, data: {
                is_liked: false
            }
        })

        return updatedInfos
    } catch (error) {
        throw new Error("Couldn't remove recipe from favorites");
    }
}