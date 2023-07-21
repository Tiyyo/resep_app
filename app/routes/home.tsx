import { type LoaderArgs, redirect } from "@remix-run/node";
import { homeMenu } from "~/constants/menus";
import AppLayout from "~/layout/LayoutApp";
import RoutesLayout from "~/layout/LayoutRoutes";
import { getUser } from "~/service/auth.server";

export async function loader({ request }: LoaderArgs) {
  return (await getUser(request)) ? null : redirect("/login");
}

export default function Home() {
  return (
    <AppLayout>
      <RoutesLayout menu={homeMenu} />
    </AppLayout>
  );
}
