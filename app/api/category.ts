import { prisma } from "~/service/db.server";
import DatabaseError from "~/helpers/errors/database.error";
import UserInputError from "~/helpers/errors/user.inputs.error";

export type Category = {
    id: number;
    name: string;
};

export default {
    async findAll(): Promise<Category[]> {
        try {
            const categories = await prisma.categories.findMany();
            await prisma.$disconnect();
            if (!categories)
                throw new DatabaseError("Can't find categories", "category");
            return categories;
        } catch (error) {
            throw new DatabaseError("Can't find categories", "category", error);
        }
    },
    async findById(id: number): Promise<Category> {
        try {
            const category = await prisma.categories.findUnique({
                where: {
                    id,
                },
            });
            if (!category)
                throw new UserInputError("Can't find item with associated id");
            return category;
        } catch (error) {
            throw new DatabaseError(
                "Can't find item with associated id",
                "category",
                error
            );
        }
    },
    async add(name: string) {
        let category = {
            name,
        };
        try {
            await prisma.categories.create({
                data: category,
            });
            await prisma.$disconnect();
        } catch (error: any) {
            throw new DatabaseError(error.message, "category", error);
        }
    },
    async update(form: Category) {
        try {
            await prisma.categories.update({
                where: {
                    id: form.id,
                },
                data: {
                    name: form.name,
                },
            });
            await prisma.$disconnect();
        } catch (error: any) {
            throw new DatabaseError("Can't update category", "category", error);
        }
    },
    async destroy(id: number) {
        try {
            await prisma.categories.delete({
                where: {
                    id,
                },
            });
            await prisma.$disconnect();
        } catch (error: any) {
            throw new DatabaseError("Can't delete category", "category", error);
        }
    },
};
