interface Measure {
  name: string;
  qty: number;
}

interface IngredientsList {
  ingredients: Array<Ingredients>;
  measures: Array<Measure>;
}
