import { Prisma } from "@prisma/client";

export default class DatabaseError extends Error {
  message: string;
  userMessage: string;
  name: string;
  status: number;
  code?: string;

  constructor(message: string, userTable: string, error?: any) {
    super(message);
    this.userMessage = "Internal server error";
    this.message = message;

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      this.message = `Code ${error.code} unique constraint on column "${
        (error.meta as any).target[0]
      }" of ${userTable} table`;
      this.code = error.code;
      if (error.code === "P2002") {
        this.userMessage = `This item already exists and can't be duplicated`;
      }
      if (error.code === "P2003") {
        this.userMessage =
          "You're trying to add recipe to meal plan that doesn't exists";
      }
    }
    this.name = "DatabaseError";
    this.status = 500;
  }
}
