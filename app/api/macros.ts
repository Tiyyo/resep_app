import { prisma } from "~/service/db.server"

export async function getMacros() {
    try {
        const macros = await prisma.macros.findMany({
            where: {
                NOT: {
                    food: null
                }
            }
        })
        await prisma.$disconnect()
        return macros
    }
    catch (error) {
        throw new Error("Server error can't acces data");
    }
}

export async function getMacrosById(macroId: number) {
    try {
        const macros = await prisma.macros.findUnique({
            where: {
                id: macroId
            }
        })
        return macros
    } catch (error) {
        throw new Error("Can't find item with associated id");
    }
}

export async function addMacros(form: any): Promise<Macros | ErrorMessage | undefined> {
    let macro: Prisma.MacrosCreateInput

    try {
        macro = {
            food: form.food ?? null,
            calories: form.calories,
            proteins: form.proteins,
            carbs: form.carbs,
            fat: form.fat,
            water: form.water
        }
        const createMacro = await prisma.macros.create({ data: macro })
        await prisma.$disconnect()
        return createMacro
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                throw ({ error: 'Already exists in database' })
            }
            throw ({ error: 'Unable to add item to database' })

        }
    }
}

export async function patchMacros(form: Macros) {

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


export async function deleteMacro(macroId: number) {
    try {
        const deletedMacro = await prisma.macros.delete({
            where: {
                id: macroId
            }
        })
        await prisma.$disconnect()
        return deletedMacro
    } catch (error: any) {
        throw new Error(error.message)
    }
}