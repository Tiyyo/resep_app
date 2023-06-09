
export function convertStringToNumber (values : { [key: string]: string | null}) : { [key: string]: number | null } {
    let copy : { [key: string]: number | null } = {}

    for (let key in values) {
        if (values[key] && typeof values[key] === "string") {
            copy[key] = parseFloat((values[key]  as string))
        } else {
            copy[key] = null
        }
    }
    return copy
  }