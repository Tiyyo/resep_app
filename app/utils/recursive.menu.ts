import type { Item } from "~/components/tree_menu/interface"


const mapRecursive = (oldArray: Item[], callback: (item: Item) => Item, newArray: Item[] = []): Item[] => {
  if (oldArray.length <= 0) {
    return newArray
  } else {
    let [item, ...theRest] = oldArray

    if (item.children) {
      item = { ...item, children: mapRecursive(item.children, callback) }
    }
    const interimArray = [...newArray, callback(item)]
    return mapRecursive(theRest, callback, interimArray)
  }
}

export default mapRecursive