import { createCookieSessionStorage } from "@remix-run/node";
import { MealPlanCreateInput } from "./api/interfaces";

export interface MealCreateInput {
    recipe_id: number
    servings: number
    image?: string
    recipe_name: string
}

export interface Meal extends MealCreateInput {
    // recipe_id: number,
    // recipe_name?: string
    // image?: string
    // servings: number
    meal_plan_id: number
}

export interface MealPlan {
    id: number
    author_id: number
    meals: Meal[]
    created_at: string
}

export const mealPlanStorage = createCookieSessionStorage<any>({
    cookie: {
        name: 'meal_plan',
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 30 * 1000, // 30 days
        path: '/',
        sameSite: 'lax',
    }
});

