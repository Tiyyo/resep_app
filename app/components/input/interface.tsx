export interface InputProps {
    name : string 
    label?: string;
    unit?: string;
    step?: number;
    type? : string
    width? : string
    style?: string;
    placeholder? : string
    defaultValue?: string;
}

export type TextAlign =
| "text-end"
| "text-start"
| "text-center"
| "text-right"
| "text-left"
| "text-justify";