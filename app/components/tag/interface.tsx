export interface TagProps {
    index : number
    removeTag : (event : React.MouseEvent<HTMLElement> ) => void
    value : string
}