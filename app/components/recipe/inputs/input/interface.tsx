interface FormField {
  nameInput: string;
  label?: string;
  type: string;
  value: string | number;
  variant?: string;
  placeholder?: string;
  onChange?: (...args: any) => void;
}
