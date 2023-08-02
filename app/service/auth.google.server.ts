import { Authenticator } from "remix-auth";
import { GoogleStrategy } from "remix-auth-google";
import { storage } from "./auth.server";
import { prisma } from "./db.server";
const randomize = require("randomatic");

type User_Id = string;
let googleCallbackUrl = "/auth/google/callback";

export const authentificator = new Authenticator<User_Id>(storage, {
  sessionKey: "userId",
});

if (process.env.NODE_ENV !== "development") {
  googleCallbackUrl = "http://resep.fly.dev/auth/google/callback"
}

let googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: googleCallbackUrl,
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {
    try {
      const randomPassword: string = randomize("*", 12);
      const user = await prisma.users.upsert({
        where: { email: profile.emails[0].value },
        update: {},
        create: {
          email: profile.emails[0].value,
          password: randomPassword,
        },
      });
      const userProfile = await prisma.profiles.findUnique({
        where: { user_id: user.id },
      });

      if (userProfile) {
        await prisma.profiles.update({
          where: { user_id: user.id },
          data: {
            avatar: profile.photos[0].value,
            username: profile.name.givenName,
          },
        });
      } else {
        await prisma.profiles.create({
          data: {
            user_id: user.id,
            avatar: profile.photos[0].value,
            username: profile.name.givenName,
          },
        });
      }
      return user.id;
    } catch (err) {
      console.log(err);
      return "Oups something went wrong ";
    }
  }
);

authentificator.use(googleStrategy);
