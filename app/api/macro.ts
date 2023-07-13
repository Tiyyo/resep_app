import { prisma } from "~/service/db.server";
import { Prisma } from "@prisma/client";

export default {
    async findAll() {
        try {
            const macros = await prisma.macros.findMany({
                where: {
                    NOT: {
                        food: null,
                    },
                },
            });
            await prisma.$disconnect();
            return macros;
        } catch (error) {
            throw new Error("Server error can't acces data");
        }
    },
    async findById(id: number) {
        try {
            const macros = await prisma.macros.findUnique({
                where: {
                    id,
                },
            });
            return macros;
        } catch (error) {
            throw new Error("Can't find item with associated id");
        }
    },
    async add(form: Prisma.macrosCreateInput) {
        let macro: Prisma.macrosCreateInput;
        try {
            macro = {
                food: form.food ?? null,
                calories: form.calories,
                proteins: form.proteins,
                carbs: form.carbs,
                fat: form.fat,
                water: form.water,
            };
            const createMacro = await prisma.macros.create({ data: macro });
            await prisma.$disconnect();
            return createMacro;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw { error: "Already exists in database" };
                }
                throw { error: "Unable to add item to database" };
            }
        }
    },
    async update(form: Prisma.macrosCreateInput) {
        let macro: Prisma.macrosCreateInput;

        try {
            macro = {
                food: form.food ?? null,
                calories: form.calories,
                proteins: form.proteins,
                carbs: form.carbs,
                fat: form.fat,
                water: form.water,
            };
            const createMacro = await prisma.macros.create({ data: macro });
            await prisma.$disconnect();
            return createMacro;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw { error: "Already exists in database" };
                }
                throw { error: "Unable to add item to database" };
            }
        }
    },
    async destroy(id: number) {
        try {
            const deletedMacro = await prisma.macros.delete({
                where: {
                    id,
                },
            });
            await prisma.$disconnect();
            return deletedMacro;
        } catch (error: any) {
            throw new Error(error.message);
        }
    },
};
