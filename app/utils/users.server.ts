import type { RegisterForm } from "../service/types.server";
import { prisma } from "../service/db.server";
import bcrypt from "bcryptjs";
import UserInputError from "~/helpers/errors/user.inputs.error";

export default async function createUser(user: RegisterForm) {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  try {
    const newUser = await prisma.users.create({
      data: {
        email: user.email,
        password: hashedPassword,
      },
    });

    if (!newUser) {
      throw new Error("Couldn't create new user");
    }
    await prisma.profiles.create({
      data: {
        user_id: newUser.id,
        username: user.username,
      },
    });
    return { id: newUser.id, email: user.email, username: user.username };
  } catch (error: any) {
    console.log(error)
    if (error instanceof UserInputError) {
      throw error
    }
    throw new UserInputError(error.message)
  }
}
