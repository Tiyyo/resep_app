import { prisma } from "~/utils/db.server"


export async function getUnitComputes () {
    const unitComputes = await prisma.unit_computes.findMany()
    await prisma.$disconnect()
    return unitComputes
}