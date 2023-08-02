interface Option {
  value: string;
  label: string;
}

export interface SelectProps {
  children?: React.ReactNode;
  options: Option[];
}
