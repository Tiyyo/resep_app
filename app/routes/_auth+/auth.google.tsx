import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { authentificator } from "~/service/auth.google.server";

export let loader = () => redirect("/signup");

export let action = async ({ request }: ActionArgs) => {
  console.log("Auth Google try to authenticate request");
  return authentificator.authenticate("google", request);
};
