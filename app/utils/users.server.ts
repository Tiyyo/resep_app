import type { RegisterForm } from "../service/types.server";
import {prisma} from "../service/db.server"
import bcrypt from "bcryptjs"

export default async function createUser( user : RegisterForm) {

    const hashedPassword = await bcrypt.hash(user.password , 10)

    const newUser = await prisma.users.create({
        data : {
            username : user.username,
            email : user.email,
            password : hashedPassword,
        }
    })

  return {id : newUser.id , email : user.email , username : user.username} ;
}