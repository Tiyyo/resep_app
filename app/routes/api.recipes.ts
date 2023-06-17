import { json } from "@remix-run/node"

export async function action ({request}) {
    const formData = await request.formData()
    const ingredients = formData.getAll('ingredient')
    const quantity = formData.getAll('quantity')
    const unit = formData.getAll('unit')

    console.log(ingredients, quantity, unit);

    const length = ingredients.length

    let measures = []
    for(let i = 0 ; i < length ; i++){
        let measure = {
            ingredientId : ingredients[i],
            unitId : unit[i],
            quantity : quantity[i]
        }
        measures.push(measure)
    }

    console.log(measures);
 
    return json({status : 200})
}