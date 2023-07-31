import SideMenu from "~/components/side_menu";
import { adminPanelMenu } from "~/constants/menus";
import AppLayout from "~/layout/LayoutApp";
import AppMobileLayout from "~/layout/LayoutAppMobile";
import RoutesLayout from "~/layout/LayoutRoutes";

export default function Dashboard() {
  return (
    <>
      <div className="">
        <AppLayout>
          <RoutesLayout menu={adminPanelMenu} />
        </AppLayout>
      </div>
      {/* <div className="flex xl:hidden">
        <AppMobileLayout>
          <SideMenu menu={adminPanelMenu} />
        </AppMobileLayout>
      </div> */}
    </>
  );
}
