import type { LoaderArgs } from "@remix-run/node";
import { logout } from "~/service/auth.server";

export async function loader({ request }: LoaderArgs) {
  return await logout(request);
}
