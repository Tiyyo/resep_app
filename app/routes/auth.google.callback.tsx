import type { LoaderArgs } from "@remix-run/node";
import { authentificator } from "~/service/auth.google.server";

export let loader = ({ request }: LoaderArgs) => {
  return authentificator.authenticate("google", request, {
    successRedirect: "/",
    failureRedirect: "/auth/login",
  });
};
