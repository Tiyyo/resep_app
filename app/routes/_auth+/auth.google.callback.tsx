import type { LoaderArgs } from "@remix-run/node";
import { authentificator } from "~/service/auth.google.server";

export let loader = ({ request }: LoaderArgs) => {
  console.log(
    "Auth Google CALLBACK try to authenticate request or REDIRECT TO LOGIN"
  );
  return authentificator.authenticate("google", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
};
