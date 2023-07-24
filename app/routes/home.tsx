import { type LoaderArgs, redirect } from "@remix-run/node";
import SideMenu from "~/components/side_menu";
import { homeMenu } from "~/constants/menus";
import AppLayout from "~/layout/LayoutApp";
import AppMobileLayout from "~/layout/LayoutAppMobile";
import RoutesLayout from "~/layout/LayoutRoutes";
import { getUser } from "~/service/auth.server";

export async function loader({ request }: LoaderArgs) {
  return (await getUser(request)) ? null : redirect("/login");
}

export default function Home() {
  return (
    <>
      <div className="hidden xl:flex">
        <AppLayout>
          <RoutesLayout menu={homeMenu} />
        </AppLayout>
      </div>
      <div className="flex xl:hidden">
        <AppMobileLayout>
          <SideMenu menu={homeMenu} />
        </AppMobileLayout>
      </div>
    </>
  );
}
