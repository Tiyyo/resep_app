import type { Decimal } from "@prisma/client/runtime"

export type difficulty = 'easy' | 'hard' | 'medium'

export interface Icon {
    id: number
    name: string
    link: string
    image_key: string
    tags?: any  // TODO fix this type any
}

export interface Images {
    link: string
    imageKey?: string
    width: number
}

export interface InfosRecipeByUser {
    author_id: number;
    author?: Profile
    comment?: string;
    is_liked?: boolean;
    created_at: Date;
    rating?: number
    recipe_id: number;
    updated_at?: Date;
}

export interface Ingredient {
    id: number
    categoryId: number
    iconId?: number | null
    icon?: Icon | null
    macrosId?: number | null
    macros?: Macros | null
    name: string
    unit_weight?: number | null | Decimal
}

export interface MacrosCreatInput {
    food?: string | null
    calories: number | Decimal
    proteins: number | Decimal
    carbs: number | Decimal
    fat: number | Decimal
    water: number | Decimal
}

export interface Macros extends MacrosCreatInput {
    id: number
}

export interface Measure {
    id?: number
    ingredient: Ingredient | number
    ingredientId?: number
    ingredient_id?: number
    recipe_id?: number
    qty: number | Decimal
    recipeId?: number
    unit_compute?: string | null
    unit_measure_id?: number
    unit_measure: UnitMeasure | number
}

export type Measures = Measure[]

export interface MeasureRaw {
    qty: string
    ingredient: string
    unit_measure: string
}

export interface Profile {
    id: number
    user_id: string
    user?: any // provisional
    username?: string
    avatar?: string
    recipes?: Array<any> // provisional
    age?: number
    height?: number
    weight?: number
    gender?: string
    gender_id?: number
    activity_level?: string
    activity_level_id?: number
    reviews?: Array<InfosRecipeByUser>
}

export interface RecipeRawForm {
    name: string
    prepTime: string
    cookTime: string
    author: string
    servings: string
    level: difficulty
    tags?: string[]
    measures: MeasureRaw[]
    instructions: string[]
    ytLink?: string
    image?: Images
}

export interface RecipeCreateInput {
    id?: number
    author_id?: number
    created_at?: Date
}

export interface Recipe {
    id: number
    author_id: number
    author?: Profile
    cook_time: number
    created_at: Date
    difficulty?: any
    image?: Images
    images_id?: number
    instructions: any
    level: difficulty
    macros_id?: number
    macros?: Macros
    measures: Measures
    name: string
    prep_time: number
    servings: number
    tags?: string[]
    reviews?: Reviews
    updated_at?: Date

}

export type Reviews = Array<InfosRecipeByUser>

export interface UnitMeasure {
    id: number
    equivalent: number | Decimal | null
    unit: string //--'grams' | 'mililiters'
    abreviation: string
    name: string
}








