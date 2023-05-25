export interface FormFieldProps {
    htmlFor: string
    label: string
    type?: string
    value?: any
    onChange?: (...args: any) => any
    error? : string
    children? : React.ReactNode
    subIcon? : React.ReactNode
    color? : string
  }