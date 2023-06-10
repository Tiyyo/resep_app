import type { Macros } from "@prisma/client";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useActionData, useFetcher, useLoaderData, useNavigation } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { promiseHash } from "remix-utils";
import {
  getCategories,
  getIcons,
  getIngredients,
  getMacros,
} from "~/api/get.all.request";
import { IngredientCreateForm, addIngredients } from "~/api/post.request";
import Error from "~/components/error";
import Input from "~/components/input";
import SelectSearch from "~/components/select_search";
import SubmitButton from "~/components/submit_button";
import { convertStringToNumber } from "~/helpers/convert.to.number";
import * as Z from "zod";
import { validationError } from "remix-validated-form";
import { withZod } from "@remix-validated-form/with-zod";


export async function loader ({request} : LoaderArgs) {
  return json(
    await promiseHash({
      categories : getCategories(),
      macros : getMacros(),
      icons : getIcons(),
      ingredients : getIngredients()
    })
  )
}

export const validator = withZod(
  Z.object({
    name : Z.string().toLowerCase(),
    categoryId : Z.string(),
    unitWeight : Z.string().optional(),
    macrosId : Z.string().optional(),
    iconId : Z.string().optional(),
  })
)

interface IngredientCreateObject {
  name : string
  categoryId : number
  iconId? : number | null,
  macrosId? : number | null
  unitWeight? : number | null
}

export async function action({ request }: ActionArgs) {

  const formData = await validator.validate(await request.formData())
  if( formData.error) return validationError(formData.error)

  const {iconId, categoryId, macrosId, name, unitWeight} = formData.data

  const fieldToConvert = {
    iconId , categoryId, macrosId, unitWeight
  }

  const formConverted = convertStringToNumber(fieldToConvert)
  let form : IngredientCreateForm

   form = {
    name,
    categoryId : formConverted.categoryId,
    iconId : formConverted.iconId,
    macrosId : formConverted.macrosId,
    unitWeight : formConverted.unitWeight
   }

  try {
    await addIngredients(form);
    return json({status : 200})
  } catch(error : any) {
    return json({error : error.message},  {status : 400})
  }

}

export default function () {
  // can't type useLoaderData bugs still not fixed 
  // convert type to Serialize object
  const { categories, macros, icons, ingredients } =
    useLoaderData();
  const navigation = useNavigation()
  const addIngredientFormRef = useRef<HTMLFormElement>(null)
  const actionData = useActionData()

  useEffect(() => {
    if(navigation.state == 'idle' && addIngredientFormRef && addIngredientFormRef.current) {
      addIngredientFormRef.current.reset()
    }
  }, [navigation.state])

  return (
    <div>
      <Form method="POST">
        <div className="flex flex-wrap justify-center gap-3 mt-3">
        <Input name="name" placeholder="Ingredient name" label="Name"/>
        <Input type="text" width="10" name="unitWeight" label="Average weight for 1 unit" placeholder="g/ml"/>
          <SelectSearch
            name="categoryId"
            data={categories}
            index="id"
            filterBy="name"
            placeholder="Pick a category"
            />
            <SelectSearch
            name="macrosId"
            data={macros}
            index="id"
            filterBy="food"
            optionMax={5}
            placeholder="Food reference"
            />
            <SelectSearch
            name="iconId"
            data={icons}
            index="id"
            filterBy="name"
            optionMax={5}
            placeholder="Search for an Icon"
          />
          <SubmitButton text="Add ingredient"/>
        </div>
        <Error message={actionData?.error}/>
      </Form>
      <div>
        {/* {/*--- do check exist and length/*} */}
        {ingredients.map((ingredient) => {
          return <FullRow key={ingredient.id} ingredient={ingredient} />;
        })}
      </div>
    </div>
  );
}

function RowMacro({
  macros,
  allMacros,
}: {
  macros: Macros;
  allMacros: Array<Macros>;
}) {
  const [shouldChangeMacro, setShouldChangeMacro] = useState<boolean>(false);
  const [macroValues, setMacroValues] = useState({
    id: macros.id,
    calories: macros.calories,
    carbs: macros.carbs,
    proteins: macros.proteins,
    fat: macros.fat,
    water: macros.water,
  });
  const [newMacroId, setNewMacroId] = useState(null);

  function handleClick(e: any) {
    setShouldChangeMacro(true);
    setNewMacroId(null)
  }

  function getMacroId(state) {
    setNewMacroId(state);
    const newMacros = allMacros.find((m) => state.value === m.id);
    if (newMacros) {
      setMacroValues({
        id: newMacros.id,
        calories: newMacros.calories,
        carbs: newMacros.carbs,
        proteins: newMacros.proteins,
        fat: newMacros.fat,
        water: newMacros.water,
      });
    }
    setShouldChangeMacro(false);
  }

  console.log(allMacros);
  return (
    <>
      {shouldChangeMacro ? (
        newMacroId ? (
          <>
          </>
        ) : (
          <SelectSearch
            data={allMacros}
            index="id"
            filterBy="food"
            optionMax={5}
            name="macros"
            getState={getMacroId}
          />
        )
      ) : (
        <>
          <input type="number" defaultValue={macroValues.id} hidden />
          <div>{macroValues.calories}</div>
          <div>{macroValues.carbs}</div>
          <div>{macroValues.proteins}</div>
          <div>{macroValues.fat}</div>
          <div>{macroValues.water}</div>
          <div onClick={handleClick}>Del thoses macros</div>
        </>
      )}
    </>
  );
}

function FullRow({ ingredient }) {
  const deleteIngredient = useFetcher();
  const { macros } = useLoaderData();

  return (
    <div className="flex pt-5">
      <div className="aspect-square h-7 rounded-full overflow-hidden">
        {/* <img src={ingredient.icon.link} alt="" /> */}
      </div>
      <div>{ingredient.name}</div>
      <div>{ingredient.category.name}</div>

      <RowMacro macros={ingredient.macros} allMacros={macros} />

      <deleteIngredient.Form method="DELETE" action="/api/ingredients">
        <button type="submit" name="ingredientId" value={ingredient.id}>
          {" "}
          Delete Ingredient
        </button>
      </deleteIngredient.Form>
    </div>
  );
}
