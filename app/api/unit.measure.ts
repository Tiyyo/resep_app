import { prisma } from "~/service/db.server"

export async function getUnitMeasures() {
    try {
        const unitMeasures = await prisma.unit_measures.findMany()
        await prisma.$disconnect()
        return unitMeasures
    }
    catch (error) {
        throw new Error("Server error can't acces data");
    }
}