import type { MenuItem } from "~/components/tree_menu/interface";

const mapRecursive = (
  oldArray: MenuItem[],
  callback: (item: MenuItem) => MenuItem,
  newArray: MenuItem[] = []
): MenuItem[] => {
  if (oldArray.length <= 0) {
    return newArray;
  } else {
    let [item, ...theRest] = oldArray;

    if (item.children) {
      item = { ...item, children: mapRecursive(item.children, callback) };
    }
    const interimArray = [...newArray, callback(item)];
    return mapRecursive(theRest, callback, interimArray);
  }
};

export default mapRecursive;
