export interface ButtonProps {
  type: "submit" | "button";
  value: string;
  name?: string;
  action?: string;
  sx?: string; // addition tailwind class
  valueStyle?: string;
  children?: React.ReactNode;
}

export interface DashedButtonProps {
  value: string;
  link?: string;
}
