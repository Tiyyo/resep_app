import type { Prisma } from "@prisma/client";

export type Activity_level = {
    id: number;
    name: "sedentary" | "light" | "moderate" | "active" | "very_active";
    description: string;
    factor: number;
};

export type CategoryCreatInput = {
    name: string;
}

export type Category = CategoryCreatInput & {
    id: number;
}

export type Difficulty = "easy" | "medium" | "hard";

export type Gender = {
    id: number;
    name: 'male' | 'female'
}

export type IconCreatInput = {
    name: string;
    link: string;
    image_key: string;
    tags?: Tag[];
}

export type Icon = IconCreatInput & {
    id: number;
}
export type ImageOnlyLink = {
    link: string;
}

export type ImageCreatInput = {
    link: string;
    image_key: string;
    width: number;
}

export type Image = ImageCreatInput & {
    id: number;
}


export type IngredientCreatInput = {
    name: string;
    category_id: number;
    category?: Category;
    icon_id?: number | null;
    macros_id?: number | null;
    icon?: Icon | null;
    macros?: Macros | null;
    unit_weight?: number | Prisma.Decimal | null;
}

export type Ingredient = IngredientCreatInput & {
    id: number;
}

export type Instruction = {
    instruction_id: number;
    recipe_id: number;
    description?: string;
}

export type MacrosCreatInput = {
    food?: string | null;
    calories: number | Decimal;
    proteins: number | Decimal;
    carbs: number | Decimal;
    fat: number | Decimal;
    water: number | Decimal;
}

export type Macros = MacrosCreatInput & {
    id: number;
}

export type MealCreateInput = {
    recipe_name: string;
    servings: number;
    recipe_id: number;
    recipe?: Recipe;
    image?: string;
}

export type Meal = MealCreateInput & {
    id: number;
}

export type ShoppingList = {
    items: totalIngredientQty[] | null
}

export type MealPlan = {
    id: number;
    author_id: number;
    author?: Profile;
    created_at: Date;
    updated_at?: Date | null;
    meals?: Meals[];
    shopping?: ShoppingList;
}


export type MeasureRawForm = {
    qty: string;
    ingredient: string;
    unit_measure: string;
}

export type MeasureCreateInput = {
    qty: number | Prisma.Decimal;
    ingredient_id: number;
    ingredient?: Ingredient;
    recipe_id?: number;
    recipe?: Recipe;
    unit_measure_id: number;
    unit_measure?: UnitMeasure;
}

export type Measure = MeasureCreateInput & {
    // id: number;
}

export type Measures = Measure[];

export type Profile = {
    id: number;
    user_id: string;
    user?: User;
    username?: string | null;
    avatar?: string | null;
    recipes?: Recipe[] | null;
    age?: Date | null;
    height?: number | Prisma.Decimal | null;
    weight?: number | Prisma.Decimal | null;
    gender_id?: number | null;
    gender?: Gender | null;
    activity_level_id?: number | null;
    activity_level?: Activity_level | null;
    recipes?: Recipe[] | null;
    reviews?: UserRecipeInfo[] | null
}

export type RecipeRawForm = {
    name: string;
    prep_time: string;
    cook_time: string;
    author: string;
    servings: string;
    level: string;
    tags?: string[];
    measures: MeasureRawForm[];
    instructions: string[];
    ytLink?: string;
    image?: ImageCreatInput;
}

export type RecipeCreateInput = {
    name: string;
    prep_time: number;
    cook_time: number;
    servings: number;
    author_id: number;
    macro_id?: number;
    level: string;
    tags?: string[]
    image?: ImageCreatInput | null;
    instructions: string[];
    measures: MeasureCreateInput[];
}

// export type Recipe = Omit<RecipeCreateInput, image | instructions> & {
//     id: number;
//     name: string;
//     author_id: number;
//     author?: Profile | null;
//     cook_time: number;
//     prep_time: number;
//     servings: number;
//     level: string;
//     image_id?: number | null;
//     image?: ImageOnlyLink | null;
//     macros_id?: number | null;
//     macros?: Macros | null;
//     instructions: Instruction[];
//     tags?: Tag[] | null;
//     measures: Measure[] | null;
//     reviews?: UserRecipeInfo[] | null;
//     created_at?: Date | null;
//     updated_at?: Date | null;
// }

type NewInstruction = {
    instruction_id: number;
    recipe_id: number;
}

export type Recipe = {
    id: number
    name: string;
    author_id: number;
    author?: Profile | null;
    cook_time: number;
    prep_time: number;
    servings: number;
    level: string;
    image_id?: number | null;
    image?: ImageOnlyLink | null;
    instructions?: Instruction[] | null | string[];
    macros_id?: number | null;
    macros?: Macros | null;
    tags?: string[] | null | Tag[];
    measures?: Measure[] | null;
    reviews?: UserRecipeInfo[] | null;
    created_at?: Date | null;
    updated_at?: Date | null;
}


export type TagCreatInput = {
    name: string;
}

export type Tag = Tag & {
    id: number;
}

export type totalIngredientQtyCreateInput = {
    qty: number | Prisma.Decimal | null;
    ingredient_id: number;
    ingredient?: Ingredient;
    unit_measure_id: number;
    name?: string;
    unit_measure?: UnitMeasure;
}

// list_item
export type totalIngredientQty = totalIngredientQtyCreateInput & {
    id: number;
}

export type totalIngredientListCreateInput = {
    meal_plan_id: number;
    meal_plan?: MealPlan;
    created_at: Date;
    updated_at?: Date;
    items: totalIngredientQty[];
}

export type totalIngredientList = {
    id: number;
    meal_plan_id: number;
    meal_plan?: MealPlan;
    created_at: Date;
    updated_at?: Date;
    items: totalIngredientQty[];
}

export type Unit = 'grams' | 'milliliters';

export type UnitAbreviation = 'kg' | 'g' | 'L' | 'cl' | 'ml' | 'tbsp' | 'tsp' | 'pods' | 'pch' | 'pcs' | 'cup';

export type UnitMeasure = {
    id?: number;
    name: string;
    equivalent?: number | Prisma.Decimal | null;
    unit: string
    abreviation: string;
}

export type UserCreateInput = {
    email: string;
    password: string;
    admin?: boolean;
}

export type User = UserCreateInput & {
    id: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export type UserRecipeInfo = {
    author_id: number;
    author?: Profile;
    recipe_id: number;
    created_at?: Date;
    updated_at?: Date | null;
    comment?: string | null;
    rating?: number | null;
    is_liked?: boolean;
}

