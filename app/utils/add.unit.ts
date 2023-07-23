const addUnit = (arg: string) => {
  let unit: string;
  switch (arg) {
    case "calories": {
      return (unit = "(kcal)");
    }
    case "proteins": {
      return (unit = "(g)");
    }
    case "carbs": {
      return (unit = "(g)");
    }
    case "fat": {
      return (unit = "(g)");
    }
    case "water": {
      return (unit = "(ml)");
    }
    default: {
      return unit = "";
    }
  }
};

export default addUnit;
