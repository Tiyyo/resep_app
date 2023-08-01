import { adminPanelMenu } from "~/constants/menus";
import AppLayout from "~/layout/LayoutApp";

export default function Dashboard() {
  return <AppLayout menu={adminPanelMenu} />;
}
