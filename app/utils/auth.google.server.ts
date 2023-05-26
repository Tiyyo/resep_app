import { Authenticator } from "remix-auth";
import { GoogleStrategy } from "remix-auth-google";
import {storage} from "./auth.server"
import { prisma } from "./db.server";
const randomize = require('randomatic')


type User_Id = string


export const authentificator = new Authenticator<User_Id>(storage)

let googleStrategy = new GoogleStrategy (
    {
        clientID : process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!, 
        callbackURL : '/auth/google/callback' 
    } , async ({accessToken, refreshToken, extraParams, profile}) => {
        try {
            const  randomPassword : string = randomize('*' , 12) 
            const user = await prisma.users.upsert(
                { 
                where : { email : profile.emails[0].value},
                create : {email : profile.emails[0].value,
                          password : randomPassword, 
                          username : 'aller'
            }})
            return user.id as string
        } catch (err) {
            console.error(err)
        }
    }
)

authentificator.use(googleStrategy)

