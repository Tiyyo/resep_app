interface Macro {
  calories: number | null;
  proteins: number | null;
  carbs: number | null;
  lipids: number | null;
  water: number | null;
}

interface Ingredients {
  name: string;
  category: string;
  unit_weight: number | null;
  usual_portion: number | null;
  unit_compute: string | null;
  unit_measure: string | null;
  icons: {
    h100: string;
  };
  macros?: Macro;
}
