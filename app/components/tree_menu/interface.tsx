export type Item = {
    id : number
    name : string
    link : string
    open : boolean
    icon : any
    children? : Item[]
}

export type MenuItem = {
    name : string
    link : string
    children? : Array<Item>
}

export type PlainMenu = Array<MenuItem>

export interface TreeMenuProps {
    level : number
    menu : PlainMenu
    props? : any
}