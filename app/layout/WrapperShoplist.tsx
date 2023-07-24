import { Form } from "@remix-run/react";
import { useContext } from "react";
import Input from "~/components/input";
import SubmitButton from "~/components/submit_button";
import TitleLevel1 from "~/components/title/TitleLevel1";
import { ShoppingContext } from "~/context/shoplist.context";

export default function Wrapper({ children }: { children?: React.ReactNode }) {
  const { recipes, setNumRecipes } = useContext(ShoppingContext);

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
            <div className="flex flex-wrap justify-center gap-4">
              {recipes.map((recipe) => {
                return (
                  <div key={recipe.id}>
                    <input name="recipeId" hidden defaultValue={recipe.id} />
                    <div className="flex aspect-2/1 h-44 border bg-main-100 p-2 shadow-md">
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
                        <div className="flex flex-grow items-center text-8 opacity-90 ">
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
                        <p className="cursor-pointer self-end text-7 underline opacity-70">
                          Change recipe
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="my-10 flex w-full justify-center">
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
