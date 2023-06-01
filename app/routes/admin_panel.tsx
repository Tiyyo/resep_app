import LayoutMain from "~/components/layout/LayoutMain";
import LayoutPage from "~/components/layout/LayoutPage";
import { ADMIN_PANEL_MENU } from "~/constants/menus";

export default function AdminPanel() {

  return (
    <LayoutPage>
        <LayoutMain menu={ADMIN_PANEL_MENU}/>
    </LayoutPage>
  );
}