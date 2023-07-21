import { Prisma } from "@prisma/client";
import { prisma } from "~/service/db.server";
import { ErrorMessage } from "./interfaces";

export default {
    async findAll() {
        try {
            const categories = await prisma.categories.findMany();
            await prisma.$disconnect();
            return categories;
        } catch (error) {
            throw new Error("Can't find categories");
        }
    },
    async findAllRaw() {
        try {
            const categories = await prisma.$queryRaw`SELECT * FROM categories`;
            await prisma.$disconnect();
            return categories;
        } catch (error) {
            throw new Error("Can't find categories");
        }
    },
    async findById(id: number) {
        try {
            const category = await prisma.categories.findUnique({
                where: {
                    id,
                },
            });
            return category;
        } catch (error) {
            throw new Error("Can't find item with associated id");
        }
    },
    async add(
        name: string
    ): Promise<Ingredient_categories | ErrorMessage | undefined> {
        let category;
        category = {
            name,
        };
        try {
            const createCategory = await prisma.categories.create({
                data: category,
            });
            await prisma.$disconnect();
            return createCategory;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    return {
                        error: "There is a unique constraint violation , Already exists in database",
                    };
                }
            }
        }
    },
    async update(object: { name: string; id: number }) {
        try {
            const updateCategory = await prisma.categories.update({
                where: {
                    id: object.id,
                },
                data: {
                    name: object.name,
                },
            });
            await prisma.$disconnect();
            return updateCategory;
        } catch (error: any) {
            throw new Error("Can't update category");
        }
    },
    async destroy(id: number) {
        try {
            const deleteCategory = await prisma.categories.delete({
                where: {
                    id
                },
            });
            await prisma.$disconnect();
            return deleteCategory;
        } catch (error: any) {
            throw new Error("Error deleting category");
        }
    },
};
