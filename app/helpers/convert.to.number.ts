
export function convertStringToNumber (values : { [key: string]: string | null}) : { [key: string]: number | null } {
    let copy : { [key: string]: number | null } = {}

    for (let key in values) {
        if (values[key] && typeof values[key] === "string") {
            copy[key] = parseInt((values[key]  as string), 10)
        } else {
            copy[key] = null
        }
    }
    return copy
  }