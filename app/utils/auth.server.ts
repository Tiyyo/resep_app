import { json, createCookieSessionStorage, redirect } from "@remix-run/node";
import { prisma } from "./db.server";
import type { RegisterForm, LoginForm } from "./types.server";
import bcrypt from "bcryptjs";
import createUser from "./users.server";

const sessionSecret = process.env.SESSION_SECRET

if (!sessionSecret) {
    throw new Error('SESSION_SECRET is not set')
}

export const storage = createCookieSessionStorage({
    cookie : {
        name : "generic-name", // has to be change 
        secure : process.env.NODE_ENV === "production",
        secrets : [sessionSecret], 
        sameSite : "lax",
        path : "/",
        maxAge : 60*60,
        httpOnly : true,
    }
})

export async function register(form: RegisterForm) {
    const exists = await prisma.users.count({ where: { email: form.email } })

    if (exists) {
        return json(
            { error: `User already exists with that email` },
            { status: 400 })
    }

    const newUser = await createUser(form)

    if (!newUser) {
        return json (
            {
                error: "Something went wrong trying to create a new user.",
                fields: { email: form.email, password: form.password, username : form.username },
              },
              { status: 400 }
        )
    }
    // Add a toast message after login
    return createUserSession(newUser.id ,"/" )
}

export async function login (form : LoginForm) {
        const user = await prisma.users.findUnique({
            where : {email : form.email }
        })

        if(!user || (await bcrypt.compare(form.password , user.password))) {
            return json({error : "Wrong credentials"} , {status : 400})
        }
        return createUserSession(user.id , "/")
}

export async function createUserSession ( userId : string, redirectTo : string) {
    const session = await storage.getSession()
    session.set('userId' , userId)
    return redirect(redirectTo, {
        headers : {
            "Set-Cookie" : await storage.commitSession(session)
        }
    })
}

export async function requireUserId (request : Request, redirectTo : string = new URL(request.url).pathname) {
    const session = await getUserSession(request)

    const userId = await session.get('userId')
    
    if(!userId || typeof userId !== "string") {
        const searchParams = new URLSearchParams([["redirectTo", redirectTo]])

        throw redirect(`/auth/login?${searchParams}`)
    }
     return userId
}

function getUserSession (request : Request) {
    return storage.getSession(request.headers.get('Cookie'))
}

export async function getUserId (request : Request) {
    const session = await getUserSession(request)
    const userId = session.get("userId")
    if (!userId || typeof userId !== "string") return null
    return userId
}

export async function getUser (request : Request) {
    const userId = await getUserId(request)
    if (typeof userId !== "string") {
        return null
    }

    try {
        const user = await prisma.users.findUnique({
            where : {id : userId},
            select : {id : true, email : true}
        })
        return user
    } catch (err) {
        throw logout(request)
    }
}

export async function logout ( request :Request) {
    const session = await getUserSession(request)

    return redirect("/auth/login", {
        headers : {
            "Set-Cookie" : await storage.destroySession(session)
        }
    })
}

export async function isAdmin (request : Request) {
    try {
        const userId = await getUserId(request)
        if(userId) {
            const user = await prisma.users.findUnique({
                where : {id : userId}
            })
            return user?.admin
        }
    } catch(err) {
        return json({error : 'Invalid request '}, {status : 400})
    }
}
