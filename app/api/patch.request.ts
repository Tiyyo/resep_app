import type { FormPropsEditIcon } from "~/routes/api.icons"
import { prisma } from "~/service/db.server"
import { Ingredient, Macros } from "~/types/recipe"

interface IngredientUpdateForm extends Ingredient {
    ingredientId: number
    unitWeight?: number
}














