import DatabaseError from "~/helpers/errors/database.error";
import { prisma } from "~/service/db.server";
import type { UnitMeasure } from "~/types";

export default {
  async findAll(): Promise<UnitMeasure[]> {
    try {
      const unitMeasures = await prisma.unit_measures.findMany();
      await prisma.$disconnect();
      return unitMeasures;
    } catch (error: any) {
      throw new DatabaseError(error.message, "unit_measures", error);
    }
  },
};
