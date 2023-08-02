import { Form } from "@remix-run/react";
import { useContext } from "react";
import Input from "~/components/input";
import SubmitButton from "~/components/submit_button";
import TitleLevel1 from "~/components/title/TitleLevel1";
import {
  ShoppingContext,
  ShoppingContextProvider,
} from "~/context/shoplist.context";

export default function Wrapper({ children }: { children?: React.ReactNode }) {
  const { recipes, setNumRecipes } = useContext(ShoppingContext);
  console.log(recipes);

  const handleClickGenerate = (
    e: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(e.currentTarget.numRecipes.value);
    const value: number = Number(e.currentTarget.numRecipes.value);
    setNumRecipes(Math.abs(value));
  };
  return (
    <div>
      <div>
        <TitleLevel1 title="Shopping" />
        {recipes && (
          <Form method="POST">
            <div className="flex justify-center flex-wrap gap-4">
              {recipes.map((recipe) => {
                return (
                  <div key={recipe.id}>
                    <input name="recipeId" hidden defaultValue={recipe.id} />
                    <div className="flex border p-2 bg-main-100 shadow-md h-44 aspect-2/1">
                      <div className="aspect-square basis-1/3">
                        <img
                          src={recipe.link}
                          alt={recipe.name}
                          className="h-full rounded-full p-2"
                        />
                      </div>
                      <div className="flex flex-col justify-start">
                        <p className="min-h-8 text-8 font-semibold text-text-accent">
                          {recipe.name}
                        </p>
                        <div className="flex items-center text-8 opacity-90 flex-grow ">
                          <p className="text-7">
                            Number of people for that recipes ?{" "}
                          </p>
                          <Input
                            type="number"
                            name="parts"
                            width="14"
                            align="center"
                            defaultValue={4}
                          />
                        </div>
                        <p className="opacity-70 text-7 underline self-end cursor-pointer">
                          Change recipe
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="w-full flex justify-center my-10">
              <SubmitButton text="Generate shopping list" />
            </div>
          </Form>
        )}
        {!recipes && (
          <form
            className="center flex-col gap-y-8"
            onSubmit={handleClickGenerate}
          >
            <p className="text-12 font-semibold text-text-accent_soft">
              How many meals do you want to prepare ?
            </p>
            <Input type="number" name="numRecipes" width="16" />
            <SubmitButton text="Let's Go !" />
          </form>
        )}
      </div>
    </div>
  );
}
