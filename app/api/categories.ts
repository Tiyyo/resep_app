import { prisma } from "~/service/db.server"

export async function getCategories() {
    try {
        const categories = await prisma.ingredient_categories.findMany()
        await prisma.$disconnect()
        return categories
    } catch (error) {
        console.log(error);
    }
}

export async function getCategoriesById(categoryId: number) {
    try {
        const category = await prisma.ingredient_categories.findUnique({
            where: {
                id: categoryId
            }
        })
        return category
    } catch (error) {
        throw new Error("Can't find item with associated id");
    }
}

/**
 * 
 * @param {string} name 
 */
export async function addCategory(name: string): Promise<Ingredient_categories | ErrorMessage | undefined> {
    let category
    category = {
        name
    }
    try {
        const createCategory = await prisma.ingredient_categories.create({ data: category })

        await prisma.$disconnect()
        return createCategory

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                return { error: 'There is a unique constraint violation , Already exists in database' }
            }
        }
    }

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

export async function deleteCategories(categoryId: number) {
    try {
        const deleteCategory = await prisma.ingredient_categories.delete({
            where: {
                id: categoryId
            }
        })
        await prisma.$disconnect()
        return deleteCategory
    } catch (error: any) {
        throw new Error('Error deleting category')
    }
} 