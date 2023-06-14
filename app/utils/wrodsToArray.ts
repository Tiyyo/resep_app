export function wordsToArray (str : string) {
    let arr : string[] 

    arr = str.split(" ");
    arr.forEach((el, index) => {
      if (el === "") {
        arr.splice(index, 1);
      }
    });
    return arr
}