import { ADMIN_PANEL_MENU } from "~/constants/menus";
import AppLayout from "~/layout/LayoutApp";
import RoutesLayout from "~/layout/LayoutRoutes";

export default function Dashboard() {
  return (
    <AppLayout>
      <RoutesLayout menu={ADMIN_PANEL_MENU}/>
    </AppLayout>

  );
}
