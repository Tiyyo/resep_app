export type MenuItem = {
  id: number;
  name: string;
  link: string;
  open: boolean;
  icon: any;
  children?: MenuItem[];
};

export interface TreeMenuProps {
  level: number;
  menu: MenuItem[];
  props?: any;
}
