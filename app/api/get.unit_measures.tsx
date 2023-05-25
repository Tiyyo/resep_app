import { prisma } from "~/utils/db.server"

export async function getUnitMeasures() {
    const unitMeasures = await prisma.unit_measures.findMany()
    await prisma.$disconnect()
    return unitMeasures
}