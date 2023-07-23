import { Item } from "../tree_menu/interface";

export interface MenuLinkProps {
  active: Boolean;
  item: Item;
  level: number;
}
