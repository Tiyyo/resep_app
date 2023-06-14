import { getUserId } from "../service/auth.server";
import { prisma } from "../service/db.server";

export async function getProfile ( request : Request) {
    const userId = await getUserId(request)
    if (userId) {
        const profile = await prisma.profiles.findUnique({ where : { userId }})
        return profile
    }
}