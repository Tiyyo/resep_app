import { ActionArgs, LoaderArgs, json } from "@remix-run/node";
import { Form, Link, useFetcher, useLoaderData } from "@remix-run/react";
import SubmitButton from "~/components/submit_button";
import TitleLevel1 from "~/components/title/TitleLevel1";
import { Recipe } from "~/types/recipe";
import { buildShoppingList } from "~/service/shopping.builder.server";
import Input from "~/components/input";
import { ShoppingContextProvider } from "~/context/ShoppingContext";
import { useEffect } from "react";

// export async function loader({ request }: LoaderArgs) {
//   //   const recipes = await getRandomRecipes(7);
//   return json({ ok  });
// }

export async function action({ request }: ActionArgs) {
    const formData = await request.formData();
    const recipeIds = formData.getAll("recipeId");
    const shoppingList = await buildShoppingList(recipeIds as string[]);

    return json({ message: "Shopping list created" }, { status: 201 });
}

export default function () {
    //   const { recipes } = useLoaderData();

    const fetcherRandomRecipes = useFetcher();

    useEffect(() => {
        if (
            fetcherRandomRecipes.state === "idle" &&
            fetcherRandomRecipes.data == null
        ) {
            fetcherRandomRecipes.load("/api/recipes/random/7");
        }
        // console.log(fetcherRandomRecipes);
    }, []);

    console.log(fetcherRandomRecipes.data);

    return (
        <ShoppingContextProvider>
            <div>
                <TitleLevel1 title="Shopping" />
                <Form method="POST">
                    <div className="flex justify-center flex-wrap gap-4">
                        {/* {recipes &&
              recipes.map((recipe) => {
                return (
                  <>
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
                  </>
                );
              })} */}
                    </div>
                    <div className="w-full flex justify-center my-10">
                        <SubmitButton text="Generate shopping list" />
                    </div>
                </Form>
                {/* <button>Do you want to create a new shopping list?</button> */}
            </div>
        </ShoppingContextProvider>
    );
}
