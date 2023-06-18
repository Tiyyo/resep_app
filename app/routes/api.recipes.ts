import { json } from "@remix-run/node"

export async function action({ request }) {
    const formData = await request.formData()
    const ingredients = formData.getAll('ingredient') // string // mandatory
    const quantity = formData.getAll('quantity') // number // mandatory
    const unit = formData.getAll('unit') // string // mandatory
    const name = formData.get('name')  // string // mandatory
    const prepTime = formData.get('prepTime') //number // mandatory
    const cookTime = formData.get('cookTime')  //number // mandatory
    const author = formData.get('author') /// number // mandatory
    const servings = formData.get('servings') // number // mandatory 
    const tags = formData.getAll('tags') // Array string
    const ytLink = formData.get('ytLink') // string
    const level = formData.get('level') // string // mandaroy

    console.log(ingredients, quantity, unit, name, prepTime, cookTime, author, tags, servings, ytLink, level);

    const length = ingredients.length

    let measures = []
    for (let i = 0; i < length; i++) {
        let measure = {
            ingredientId: ingredients[i],
            unitId: unit[i],
            quantity: quantity[i]
        }
        measures.push(measure)
    }

    console.log(measures);

    return json({ status: 200 })
}