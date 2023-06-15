export const mapRecursive = (oldArray, callback, newArray = []) => {
    if(oldArray.length <= 0 ) {
      return newArray
    } else {
        let [item, ...theRest] = oldArray
  
        if(item.children) {
          item = {...item, children : mapRecursive(item.children, callback) }
        }
        const interimArray = [...newArray, callback(item)]
        return mapRecursive(theRest, callback, interimArray)
    }
  }