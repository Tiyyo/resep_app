import type { LoaderArgs } from "@remix-run/node";
import { authentificator } from "~/service/auth.google.server";
import { upgradeToHttps } from "~/utils/upgrade.to.https";

export let loader = ({ request }: LoaderArgs) => {
  upgradeToHttps(request);
  return authentificator.authenticate("google", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
};
