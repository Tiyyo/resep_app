import { PrismaClient } from "@prisma/client";
// import { fs } from "../app/utils/fs.promises.server";


const prisma = new PrismaClient();

async function seed() {
  console.log(`Start seeding ... 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
