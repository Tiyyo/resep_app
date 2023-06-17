import { ActionArgs, json, type LoaderArgs } from "@remix-run/node";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { promiseHash } from "remix-utils";
import { getIngredients, getUnitMeasures } from "~/api/get.all.request";
import Input from "~/components/input";
import SelectSearch from "~/components/select_search";
import SubmitButton from "~/components/submit_button";

export async function loader ({request} : LoaderArgs) {
    return json(
        await promiseHash({
          ingredients: getIngredients(),
          units : getUnitMeasures()
        })) 
    
}


function addMeasure (arr, ingredients, units) {
    return arr.map((el , index) => {
        return (
                <div key={index} className="flex gap-x-4">
                    <SelectSearch data={ingredients} index="id" filterBy="name" name="ingredient"
                    placeholder="Pick an ingredient"
                    />
                    <Input name="quantity"
                    width="14" placeholder="qty" />
                    <SelectSearch data={units} index="id" filterBy="abreviation" name="unit"/>

                </div>
        )
    })
}

export default function () {
    const addRecipe = useFetcher()
    const {ingredients , units} = useLoaderData()
    const [measures, setMeasures] = useState<String[]>([])



    const addOne = () => {
        setMeasures((prevState) => [...prevState, "step"])
    }

  return (
    <div>
       <addRecipe.Form method="POST" action="/api/recipes">
       {addMeasure(measures, ingredients, units)}
       <button type="button" onClick={addOne}>
            Ajouter un ingredient 
       </button>
       <SubmitButton text="Create recipe"/>
       </addRecipe.Form>
    </div>
  );
}