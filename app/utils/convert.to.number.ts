
export async function convertStringToNumber (values : { [key: string]: string | null | undefined}) {
    let copy : { [key: string]: number | null } = {}

    for (let key in values) {
        if (values[key] && typeof values[key] === "string") {
           let value = Number(values[key])
              if (isNaN(value) || value < 0 || value === Infinity || value === null || value === undefined ) {
                    console.log(value);
                    throw new Error("Invalid values");
              }
              value.toFixed(1)
            copy[key] = Number(value.toFixed(1))
        } else {
            copy[key] = null
        }
    }
    return copy
  }