import { prisma } from "~/service/db.server"
import { Prisma, type Reviews } from "@prisma/client"

import type { Ingredient_categories, Macros, } from "@prisma/client"

import type { Measure } from "~/types/recipe"


type ErrorMessage = {
  error: string
}

export interface FormIconProps {
  name: string
  imageLink: string
  imageKey: string
  tags?: string[]
}

export interface IngredientCreateForm {
  name: string
  unitWeight?: number | undefined | null
  categoryId: number
  macrosId?: number | undefined | null
  iconId?: number | undefined | null
}

interface ReviewsCreateInput extends Reviews {
  authorId: number
  recipeId: number
}










// interface IngredientProps extends Prisma.Ingredients {
//   category : number
//   macros : number | null | undefined
//   icon : number | null | undefined
// }













