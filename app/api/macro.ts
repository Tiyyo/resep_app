import { prisma } from '~/service/db.server';
import type { Prisma } from '@prisma/client';
import DatabaseError from '~/helpers/errors/database.error';
import UserInputError from '~/helpers/errors/user.inputs.error';

export default {
    /**
           *
           * @returns Array of macros
           * @throws DatabaseError
           * @description Returns all macros from database except those with null food field
           */
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
        } catch (error: any) {
            throw new DatabaseError(error.message, 'macros', error);
        }
    },
    async findById(id: number) {
        try {
            const macros = await prisma.macros.findUnique({
                where: {
                    id,
                },
            });
            if (!macros) throw new UserInputError("Can't find item with associated id");
            return macros;
        } catch (error: any) {
            throw new DatabaseError(error.message, 'macros', error);
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
        } catch (error: any) {
            throw new DatabaseError(error.message, 'macros', error);
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
        } catch (error: any) {
            throw new DatabaseError(error.message, 'macros', error);
        }
    },
    async destroy(id: number) {
        try {
            await prisma.macros.delete({
                where: {
                    id,
                },
            });
            await prisma.$disconnect();
        } catch (error: any) {
            throw new DatabaseError(error.message, 'macros', error);
        }
    },
};
