import type { Category } from "~/types";
import type { ItemListCard } from "~/utils/convert.grams.to.pieces";

export type IngredientListByCategory = {
    [key: string]: ItemListCard[];
}

export function groupIngrByCategory(categories: Category[], meals: ItemListCard[]): IngredientListByCategory {

    const groupByCategory: IngredientListByCategory = {};

    categories.map((c) => {
        return (groupByCategory[c.name as keyof typeof groupByCategory] = []);
    });

    meals.forEach((m) => {
        const matchingCategory = categories.find((c) => c.id === m.category_id);
        if (!matchingCategory) return
        groupByCategory[matchingCategory.name as keyof typeof groupByCategory].push(m);
    });
    return groupByCategory;
}


