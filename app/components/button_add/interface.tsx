export interface AddButtonProps {
  children?: React.ReactNode;
  condition?: string;
  type: "submit" | "button";
  value?: string;
  onClick?: () => void;
  addStyle?: string;
}
