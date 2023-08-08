import type { MenuItem } from "../tree_menu/interface";

export interface MenuLinkProps {
  active: Boolean;
  item: MenuItem;
  level: number;
}
