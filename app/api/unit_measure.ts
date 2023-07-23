import DatabaseError from "~/helpers/errors/database.error";
import { prisma } from "~/service/db.server";

export default {
  async findAll() {
    try {
      const unitMeasures = await prisma.unit_measures.findMany();
      await prisma.$disconnect();
      return unitMeasures;
    } catch (error: any) {
      throw new DatabaseError(error.message, "unit_measures", error);
    }
  },
};
