import { adminPanelMenu } from "~/constants/menus";
import AppLayout from "~/layout/LayoutApp";
import RoutesLayout from "~/layout/LayoutRoutes";

export default function Dashboard() {
  return (
    <AppLayout>
      <RoutesLayout menu={adminPanelMenu}/>
    </AppLayout>
  );
}
