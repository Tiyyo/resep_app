import { PrismaClient } from "@prisma/client";
// import { fs } from "../app/utils/fs.promises.server";
const fs = require('fs');

const prisma = new PrismaClient();

async function seed() {
  console.log(`Start seeding ... 🌱`);

  const sqls = fs
    .readFileSync("./prisma/seed.sql")
    .toString()
    .split("\n")
    .filter((line: string) => line.indexOf("--") !== 0)
    .join('\n')
    .replace(/(\r\n|\n|\r)/gm, " ")
    .replace(/\s+/g, ' ')
    .split(";")


  for (const sql of sqls) {
    await prisma.$executeRaw`${sql}`
  }

  console.log(`Database has been seeded. 🌱`);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
