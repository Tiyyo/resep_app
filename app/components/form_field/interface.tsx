import type { HTMLInputTypes } from "../types/input.types"

export interface FormFieldProps {
    htmlFor: string
    label: string
    type: HTMLInputTypes
    value?: any
    onChange?: (...args: any) => any
    error? : string
    children? : React.ReactNode
    subIcon? : React.ReactNode
    color? : string
  }