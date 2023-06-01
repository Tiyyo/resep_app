export type Item = {
    name : string
    link : string
}

export type MenuItem = {
    name : string
    link : string
    children? : Array<Item>
}

export type PlainMenu = Array<MenuItem>

export interface TreeMenuProps {
    paddingLevel : string
    menu : PlainMenu
    props? : any
}