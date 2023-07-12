import { prisma } from "~/service/db.server"
import { IngredientCreateForm, IngredientUpdateForm } from "./interfaces"
import { Prisma } from "@prisma/client"


export default {
    async findAll() {
        try {
            const ingredients = await prisma.ingredients.findMany({
                include: {
                    category: true,
                    macros: true,
                    icon: true,
                }
            })
            await prisma.$disconnect()
            return ingredients
        } catch (error) {
            throw new Error("Server error can't acces data");
        }
    },
    async findById(id: number) {
        try {
            const ingredient = await prisma.ingredients.findUnique({
                where: {
                    id
                },
                include: {
                    macros: true,
                    icon: true,
                    category: true
                }
            })
            await prisma.$disconnect()
            return ingredient
        } catch (error) {
            throw new Error("Can't find item with associated id");
        }
    },
    async add(form: IngredientCreateForm) {

        //--- Maybe not mandatory 
        if (form.macrosId === null) {
            form.macrosId = undefined
        }
        if (form.iconId === null) {
            form.iconId = undefined
        }
        //---

        // cant solve typescript error  
        try {
            const newIngredient = await prisma.ingredients.create({
                data: {
                    name: form.name,
                    unit_weight: form.unitWeight,
                    category: form.categoryId && { connect: { id: form.categoryId } },
                    macros: form.macrosId && { connect: { id: form.macrosId } },
                    icon: form.iconId && { connect: { id: form.iconId } },
                },
            })
            await prisma.$disconnect()
            return newIngredient
        } catch (error: any) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new Error("Can't add 2 items with the same name")
                }
                throw new Error('Unable to add item to database')
            }
        }
    },
    async update(form: IngredientUpdateForm) {
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
            await prisma.$disconnect()
            return updateIngredient
        } catch (error: any) {
            throw new Error("Couldn't update ingredient");
        }
    },
    async destroy(id: number) {
        try {
            const deleteIngredient = await prisma.ingredients.delete({
                where: {
                    id
                }
            })
            await prisma.$disconnect()
            return deleteIngredient
        } catch (error: any) {
            throw new Error('Error deleting ingredient')
        }
    },
}


