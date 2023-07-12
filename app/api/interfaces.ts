import { InfosRecipeByUser, Recipe, Reviews } from "~/types/recipe"

type ErrorMessage = {
    error: string
}

export interface FormIconProps {
    name: string
    imageLink: string
    imageKey: string
    tags?: string[]
}

export interface FormPropsEditIcon extends FormIconProps {
    id: number
}

export interface IngredientCreateForm {
    name: string
    unitWeight?: number | undefined | null
    categoryId: number
    macrosId?: number | undefined | null
    iconId?: number | undefined | null
}

export interface IngredientUpdateForm extends IngredientCreateForm {
    ingredientId: number
}

interface UnwantedKeysReviewCreateInput {
    author_id: number
    recipe_id: number
    created_at: Date
}

export interface ReviewsCreateInput extends Omit<InfosRecipeByUser, keyof UnwantedKeysReviewCreateInput> {
    authorId: number
    recipeId: number
}

interface UnwantedKeysRecipeCreateInput {
    prep_time: number
    cook_time: number
    macros_id?: number
}

export interface RecipeCreateInput extends Omit<Recipe, keyof UnwantedKeysRecipeCreateInput> {
    prepTime: number
    cookTime: number
    macrosId?: number
}



// interface IngredientProps extends Prisma.Ingredients {
//   category : number
//   macros : number | null | undefined
//   icon : number | null | undefined
// }
