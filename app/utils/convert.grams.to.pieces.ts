import { Prisma } from "@prisma/client";
import type { Category, MealPlan, totalIngredientQty, totalIngredientList } from "~/types";

export interface ItemListCard {
  id: number;
  name: string;
  image: string;
  qty: Prisma.Decimal | null;
  unit: string | null;
  category_id: number;
}

const unitToConvertToPieces = ["pods", "pcs"];

export function harmonzeUnit(mealPlan: MealPlan) {
  const itemList = mealPlan.shopping as totalIngredientList;
  if (!itemList) return
  const finalList = buildIngrListToDisplay([], itemList);
  return finalList;
}

function buildIngrListToDisplay(finalArray: ItemListCard[] = [], itemList: totalIngredientList) {
  itemList.items.forEach((item: totalIngredientQty) => {
    if (!item.unit_measure) return
    if (unitToConvertToPieces.includes(item.unit_measure.abreviation)) {
      pushRoundUpQty(finalArray, item);
    } else if (item.unit_measure.abreviation === "pch") {
      pushWithoutUnit(finalArray, item);
    } else {
      pushWithGramsOrMl(finalArray, item);
    }
  });
  return finalArray;
}

function pushRoundUpQty(finalArray: ItemListCard[], item: totalIngredientQty) {
  if (
    !item.ingredient ||
    !item.ingredient.name ||
    !item.ingredient.unit_weight ||
    !item.unit_measure ||
    !item.ingredient.icon) return

  const ingr = {
    id: item.id,
    qty: new Prisma.Decimal(Math.ceil(item.qty as number / Number(item.ingredient.unit_weight))),
    name: item.ingredient.name,
    image: item.ingredient.icon.link,
    unit: item.unit_measure.abreviation,
    category_id: item.ingredient.category_id
  };
  finalArray.push(ingr);
}

function pushWithoutUnit(finalArray: ItemListCard[], item: totalIngredientQty) {
  if (
    !item.ingredient ||
    !item.ingredient.name ||
    !item.unit_measure ||
    !item.ingredient.icon) return

  const ingr = {
    id: item.id,
    qty: null,
    name: item.ingredient.name,
    image: item.ingredient.icon.link,
    unit: null,
    category_id: item.ingredient.category_id
  };
  finalArray.push(ingr);
}

function pushWithGramsOrMl(finalArray: ItemListCard[], item: totalIngredientQty) {
  if (
    !item.ingredient ||
    !item.ingredient.name ||
    !item.ingredient.unit_weight ||
    !item.unit_measure ||
    !item.ingredient.category ||
    !item.ingredient.icon) return

  const ingr = {
    id: item.id,
    qty: new Prisma.Decimal(item.qty as number),
    name: item.ingredient.name,
    image: item.ingredient.icon.link,
    unit: isLiquid(item, item.ingredient.category),
    category_id: item.ingredient.category_id
  };
  finalArray.push(ingr);
}

export function isLiquid(item: totalIngredientQty, category: Category) {
  if (!item.unit_measure) return ""
  if (
    category.name.toLowerCase() === "liquids" ||
    item.unit_measure.abreviation === "cup"
  ) {
    return "ml";
  }
  return "g";
}
