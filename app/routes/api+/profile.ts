import { json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { isAdmin, requireUserId } from "~/service/auth.server";
import { getProfile } from "~/utils/get.user.infos";

export async function loader({ request }: LoaderArgs) {
    await requireUserId(request);
    const admin = await isAdmin(request); // Why ? Should be removed as for admin is not required for anything
    const profile = await getProfile(request, true);
    return json({ admin, profile });
}