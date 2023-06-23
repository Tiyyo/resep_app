import type { FormPropsEditIcon } from "~/routes/api.icons"
import { prisma } from "~/service/db.server"

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
        return error.message
    }

}
export async function patchMacros(form) {
      
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
        console.log(updateMacros, 'AFter update');
        await prisma.$disconnect()
        return updateMacros
    } catch (error: any) {
        return error.message
    }
}

export async function patchIcons(form: FormPropsEditIcon) {
    console.log(form);
    try {
        if (form.tags) {
            let createTags = form.tags.map((tag) => {
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
        console.log(error);
        throw new Error(error);
    }
}

export async function patchIngredients(form) {
    try {
        const updateIngredient = await prisma.ingredients.update({
            where: {
                id: form.ingredientId
            },
            data: {
                name: form.name,
                unit_weight: form.unitWeight,
                categoryId : form.categoryId,
                iconId : form.iconId,
                macrosId : form.macrosId,
            },
        })
        return updateIngredient
    } catch (error : any) {
        console.log(error);
        throw new Error(error.message);
    }
}

export async function addMacrosToRecipe(macros , id) {
    try {
        const updateRecipe = await prisma.recipes.update({
            where : {
                id : id
            },
            data : {
                macro_recipe : {
                    create : {
                        calories : macros.calories ,
                        proteins : macros.proteins,
                        carbs : macros.carbs,
                        fat : macros.fat,
                        water : macros.water
                    }
                }
            }
        })
        return updateRecipe
    } catch (error) {
        console.log(error);
    }
}