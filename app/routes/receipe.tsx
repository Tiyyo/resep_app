import { useEffect, useLayoutEffect, useState } from "react";
import RecipeTitle from "~/components/recipe/header";
import RecipeInfos from "~/components/recipe/infos";
import IngredientsList from "~/components/recipe/ingredients";
import InstructionsList from "~/components/recipe/instructions";
import NutritionFacts from "~/components/recipe/nutrition_facts";
import Picture from "~/components/recipe/picture";

export default function () {
  const recipe = {
    name: "Chicken Curry with Coconut milk",
    likes: 17,
    liked_by: null,
    difficulty: "Easy",
    prep_time: 20,
    cook_time: 20,
    author: "Steeve",
    servings: 4,
    original_serving: 4,
    picture: "/images/chicken_curry_coconut.jpg",
    tags: ["Chicken, Coconut milk, Asia, Curry"],
    macrosPerServ: {
      calories: null,
      proteins: null,
      carbs: null,
      lipids: null,
      water: null,
    },
    ingredients: [
      {
        name: "Rice",
        category: "feculent",
        unit_weight: null,
        usual_portion: 125,
        unit_compute: "grams",
        unit_measure: "g",
        icons: {
          h100: "/images/ingredients/rice_h100.png",
        },
        macros: {
          calories: 114,
          proteins: 2.7,
          carbs: 24.4,
          lipids: 0.6,
          water: 71.1,
        },
      },
      {
        name: "Chicken breast",
        category: "meat",
        unit_weight: 150,
        usual_portion: 150,
        unit_compute: "grams",
        unit_measure: "pcs",
        icons: {
          h100: "/images/ingredients/chicken_breast_h100.png",
        },
        macros: {
          calories: 121,
          proteins: 26.2,
          carbs: 0,
          lipids: 1.76,
          water: 72.5,
        },
      },
      {
        name: "Red pepper",
        category: "vegetables",
        unit_weight: 175,
        usual_portion: 1 / 2,
        unit_compute: "grams",
        unit_measure: "pcs",
        icons: {
          h100: "/images/ingredients/red_pepper_h100.png",
        },
        macros: {
          calories: 29,
          proteins: 0.9,
          carbs: 2.4,
          lipids: 0.2,
          water: 92,
        },
      },
      {
        name: "Yellow pepper",
        category: "vegetables",
        unit_weight: 175,
        usual_portion: 1 / 2,
        unit_compute: "grams",
        unit_measure: "pcs",
        icons: {
          h100: "/images/ingredients/yellow_pepper_h100.png",
        },
        macros: {
          calories: 29,
          proteins: 0.9,
          carbs: 2.4,
          lipids: 0.2,
          water: 92,
        },
      },
      {
        name: "Red onions",
        category: "vegetables",
        unit_weight: 80,
        usual_portion: 1 / 2,
        unit_compute: "grams",
        unit_measure: "pcs",
        icons: {
          h100: "/images/ingredients/red_onion_h100.png",
        },
        macros: {
          calories: 36.3,
          proteins: 1.3,
          carbs: 5.6,
          lipids: 0.4,
          water: 90,
        },
      },
      {
        name: "Curry",
        category: "spices",
        unit_weight: 10,
        usual_portion: 10,
        unit_compute: "grams",
        unit_measure: "tbsp",
        icons: {
          h100: "/images/ingredients/curry_h100.png",
        },
        macros: {
          calories: 301,
          proteins: 14.5,
          carbs: 2.6,
          lipids: 14,
          water: 8.8,
        },
      },
      {
        name: "Coconut milk",
        category: "liquids",
        unit_weight: null,
        usual_portion: 75,
        unit_compute: "milliliter",
        unit_measure: "ml",
        icons: {
          h100: "/images/ingredients/coconut_milk_h100.png",
        },
        macros: {
          calories: 179,
          proteins: 2.1,
          carbs: 2.9,
          lipids: 18,
          water: 0,
        },
      },
      {
        name: "Black pepper",
        category: "condiments",
        unit_weight: null,
        usual_portion: 2,
        unit_compute: null,
        unit_measure: null,
        icons: {
          h100: "/images/ingredients/black_pepper_h100.png",
        },
      },
      {
        name: "Salt",
        category: "condiments",
        unit_weight: null,
        usual_portion: 2,
        unit_compute: null,
        unit_measure: null,
        icons: {
          h100: "/images/ingredients/salt_h100.png",
        },
      },
      {
        name: "Garlic",
        category: "vegetables",
        unit_weight: 7,
        usual_portion: 1 / 2,
        unit_compute: "grams",
        unit_measure: "pods",
        icons: {
          h100: "/images/ingredients/garlic_h100.png",
        },
        macros: {
          calories: 130,
          proteins: 6,
          carbs: 22,
          lipids: 0.4,
          water: 63.5,
        },
      },
    ],
    measures: [
      {
        name: "Rice",
        original_qty: 500,
        qty: 500,
        calcQty: function () {
          this.qty =
            (this.original_qty * recipe.servings) / recipe.original_serving;
        },
      },
      {
        name: "Chicken breast",
        original_qty: 4,
        qty: 4,
      },
      {
        name: "Red pepper",
        original_qty: 1,
        qty: 1,
      },
      {
        name: "Yellow pepper",
        original_qty: 1,
        qty: 1,
      },
      {
        name: "Red onions",
        original_qty: 2,
        qty: 2,
      },
      {
        name: "Curry",
        original_qty: 2,
        qty: 2,
      },
      {
        name: "Coconut milk",
        original_qty: 300,
        qty: 300,
      },
      {
        name: "Black pepper",
        original_qty: 1,
        qty: 1,
      },
      {
        name: "Salt",
        original_qty: 1,
        qty: 1,
      },
      {
        name: "Garlic",
        original_qty: 2,
        qty: 2,
      },
    ],
    instructions: [
      "Prepare all ingredients, cut peppers into medium strips, mince the garlic, chop onions into strip, cut chicken into medium pieces",
      "Heat some sesame oil or other oil and onions, saute for 2 or 3 min then add peppers and garlic, stir for 5 or 7 min  ",
      "Add the chicken , 1 tablespoon of curry powder and season with salt and black pepper",
      "Once chicken is fried , lower the heat and pour coconut milk , add another tablespoon of curry powder, adjust seasoning and simmer 10 min on low heat",
      "Serve with rice, you can add coriander ",
    ],
    reviews: [],
    calcUnitMacro: (macro: string, macroRef: Macro, qty: number) => {
      return macroRef ? Number((macroRef[macro] * 0.01 * qty).toFixed(1)) : 0;
    },
    getIngredientQtyPerServ: (ingredient: Ingredients) => {
      let qtyPerServ: number;
      let qty: number;
      const name = ingredient.name;
      const unitWeight = ingredient.unit_weight;
      const measure = recipe.measures.find((m) => m.name === name);
      if (!measure) return;
      measure.qty ? (qty = measure.qty) : (qty = 0);
      unitWeight
        ? (qtyPerServ = (qty * unitWeight) / recipe.servings)
        : (qtyPerServ = qty / recipe.servings);
      return qtyPerServ;
    },
    calcTotalMacro: () => {
      recipe.ingredients.forEach((ingredient) => {
        const macroIngrPerServ: Macro = {
          calories: 0,
          proteins: 0,
          carbs: 0,
          lipids: 0,
          water: 0,
        };
        const qtyPerServ = recipe.getIngredientQtyPerServ(ingredient);

        for (const macro in macroIngrPerServ) {
          if (ingredient.macros && qtyPerServ) {
            macroIngrPerServ[macro] = recipe.calcUnitMacro(
              macro,
              ingredient.macros,
              qtyPerServ
            );
          }
        }

        for (const macro in recipe.macrosPerServ) {
          if (macroIngrPerServ[macro]) {
            recipe.macrosPerServ[macro] += Number(
              Math.round(macroIngrPerServ[macro]).toFixed(2)
            );
          }
        }
      });
    },
  };

  const [macros, setMacros] = useState({
    calories: null,
    proteins: null,
    carbs: null,
    lipids: null,
    water: null,
  });

  const [servings, setServing] = useState(recipe.servings);

  useEffect(() => {
    recipe.calcTotalMacro();
    recipe.measures.forEach((measure) => {
      measure.calcQty = function () {
        console.log(recipe.servings);
        // console.log(
        //   (this.original_qty * recipe.servings) / recipe.original_serving
        // );
        this.qty =
          (this.original_qty * recipe.servings) / recipe.original_serving;
      };
    });
    setMacros(recipe.macrosPerServ);
  }, []);

  useEffect(() => {
    console.log(recipe.servings);
  }, [servings]);

  return (
    <div className="min-h-screen font-bold bg-primary-100 text-text-100 font-nunito text-10">
      <div>
        <div>
          <Picture picture={recipe.picture} author={recipe.author} />
        </div>
        <div className="px-4 pb-2">
          <RecipeTitle name={recipe.name} difficulty={recipe.difficulty} />
          <NutritionFacts
            calories={macros.calories}
            carbs={macros.carbs}
            proteins={macros.proteins}
            lipids={macros.lipids}
            water={macros.water}
          />
          <div
            className="h-6 w-6 bg-secondary-200"
            onClick={() => {
              recipe.servings++;
              setServing(recipe.servings++);
              console.log(recipe.servings);
            }}
          ></div>
          <RecipeInfos
            prepTime={recipe.prep_time}
            cookTime={recipe.cook_time}
            servings={recipe.servings}
            likes={recipe.likes}
          />
        </div>
        <IngredientsList
          ingredients={recipe.ingredients}
          measures={recipe.measures}
        />
        <InstructionsList instructions={recipe.instructions} />
      </div>
    </div>
  );
}
