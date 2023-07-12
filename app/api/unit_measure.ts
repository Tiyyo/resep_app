import { prisma } from "~/service/db.server";

export default {
    async findAll() {
        try {
            const unitMeasures = await prisma.unit_measures.findMany();
            await prisma.$disconnect();
            return unitMeasures;
        } catch (error) {
            throw new Error("Server error can't acces data");
        }
    },
};
