import { createCookieSessionStorage, json, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import type { User } from "~/models/user.server";
import { getUserById } from "~/models/user.server";
import type { RegisterForm } from "./types.server";
import createUser from "~/utils/users.server";
import { prisma } from "./db.server";
import bcrypt from "bcryptjs";

invariant(process.env.USER_SESSION_SECRET, "USER_SESSION_SECRET must be set");

export const storage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    secure: process.env.NODE_ENV === "production",
    secrets: [process.env.USER_SESSION_SECRET],
    sameSite: "lax",
    path: "/",
    httpOnly: true,
  },
});

const USER_SESSION_KEY = "userId";
const PROFILE_SESSION_KEY = "profileId";

export async function register(form: RegisterForm) {
  const exists = await prisma.users.count({ where: { email: form.email } });

  if (exists) {
    return json(
      { error: `User already exists with that email` },
      { status: 400 }
    );
  }

  const newUser = await createUser(form);

  if (!newUser) {
    return json(
      {
        error: "Something went wrong trying to create a new user.",
        fields: {
          email: form.email,
          password: form.password,
          username: form.username,
        },
      },
      { status: 400 }
    );
  }
  // Add a toast message after login
  return createUserSession(newUser.id, "/", false);
}

export async function login(form: LoginForm) {
  const user = await prisma.users.findUnique({
    where: { email: form.email },
    include: { profile: true },
  });

  if (!user || (await bcrypt.compare(form.password, user.password))) {
    return json({ error: "Wrong credentials" }, { status: 400 });
  }
  return user.profile === null
    ? createUserSession(user.id, "/", form.rememberMe, undefined)
    : createUserSession(user.id, "/", form.rememberMe, user.profile.id);
}

export async function createUserSession(
  userId: string,
  redirectTo: string,
  remember: boolean,
  profileId?: number
) {
  const session = await storage.getSession();
  session.set(USER_SESSION_KEY, userId);
  session.set(PROFILE_SESSION_KEY, profileId);

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await storage.commitSession(session, {
        maxAge: remember
          ? 60 * 60 * 24 * 7 // 7 days
          : undefined,
      }),
    },
  });
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
) {
  const session = await getUserSession(request);

  const userId = await session.get(USER_SESSION_KEY);

  if (!userId || typeof userId !== "string") {
    const searchParams = new URLSearchParams([["redirectTo", redirectTo]]);

    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}

export async function getUserSession(request: Request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function getUserId(
  request: Request
): Promise<User["id"] | undefined> {
  const session = await getUserSession(request);
  const userId = session.get(USER_SESSION_KEY);
  if (!userId || typeof userId !== "string") return null;
  return userId;
}

export async function getUser(request: Request) {
  const userId = await getUserId(request);
  if (typeof userId !== "string") {
    return null;
  }

  try {
    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: { id: true, email: true },
    });
    return user;
  } catch (err) {
    throw await logout(request);
  }
}

export async function logout(request: Request) {
  const session = await getUserSession(request);

  return redirect("/login", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}

export async function isAdmin(request: Request) {
  try {
    const userId = await getUserId(request);
    if (userId) {
      const user = await prisma.users.findUnique({
        where: { id: userId },
      });
      return user?.admin;
    }
  } catch (err) {
    return json({ error: "Invalid request " }, { status: 400 });
  }
}

export async function requireUser(request: Request) {
  const userId = await requireUserId(request);

  const user = await getUserById(userId);
  if (user) return user;

  throw await logout(request);
}
