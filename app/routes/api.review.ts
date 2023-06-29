import type{ ActionArgs } from "@remix-run/node";

export async function action({request}:ActionArgs) {
    const formData = await request.formData();
    const method = request.method.toLowerCase()

    switch (method){
        case "post": {
            const rating = formData.getAll('rating')
            const authorId = formData.get('authorId')
            const recipeId = formData.get('recipeId')
            const comment = formData.get('comment')

            console.log(rating, authorId, recipeId, comment);
        }
        case "patch" : {
            // bloc de code
        }
        case "delete" : {
            // bloc de code
        }
        default : {
            throw new Error('Invalid method')
        }

    }
}