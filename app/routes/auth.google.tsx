import type { ActionArgs } from "@remix-run/node";
import {  redirect } from "@remix-run/node";
import { authentificator } from "~/utils/auth.google.server";

export let loader = () => redirect('/auth/signup')

export let action = async ({request} : ActionArgs) => {
    return authentificator.authenticate('google' , request)
} 
