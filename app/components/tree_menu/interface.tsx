export type Item = {
    id : number
    name : string
    link : string
    open : boolean
    icon : any
    children? : Item[]
}

export interface TreeMenuProps {
    level : number
    menu : Item[]
    props? : any
}