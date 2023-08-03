import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { authentificator } from "~/service/auth.google.server";
import { upgradeToHttps } from "~/utils/upgrade.to.https";

export let loader = () => redirect("/signup");

export let action = async ({ request }: ActionArgs) => {
  upgradeToHttps(request);
  return authentificator.authenticate("google", request);
};
