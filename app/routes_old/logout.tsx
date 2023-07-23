import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";

import { logout } from "~/service/auth.server";

export const action = async ({ request }: ActionArgs) => logout(request);

export const loader = async () => redirect("/");
