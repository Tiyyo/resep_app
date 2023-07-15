import { useFetcher } from "@remix-run/react";
import React, { createContext, useEffect, useState } from "react";

export interface RecipeCardShop {
  id: number;
  image_id: number;
  link: string;
  name: string;
}

export const ShoppingContext = createContext<any>(null);

export const ShoppingContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const fetcherRandomRecipes = useFetcher();
  const [recipes, setRecipes] = useState<Array<RecipeCardShop>>();
  const [numRecipes, setNumRecipes] = useState<number | null>(null);
  const value = {
    recipes,
    setNumRecipes,
  };

  useEffect(() => {
    if (numRecipes) {
      fetcherRandomRecipes.load(`/api/recipes/random/${numRecipes}`);
    }
  }, [numRecipes]);

  useEffect(() => {
    setRecipes(fetcherRandomRecipes.data);
  }, [fetcherRandomRecipes.data]);

  return (
    <ShoppingContext.Provider value={value}>
      {children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingContext;
