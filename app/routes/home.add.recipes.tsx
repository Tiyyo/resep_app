import { Ingredients, Unit_measures } from "@prisma/client";
import { ActionArgs, json, type LoaderArgs } from "@remix-run/node";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import {  useEffect, useRef, useState } from "react";
import { promiseHash } from "remix-utils";
import { getIngredients, getUnitMeasures } from "~/api/get.all.request";
import AddPlusIcon from "~/assets/icons/AddPlusIcon";
import CloseIcon from "~/assets/icons/CloseIcon";
import Cook from "~/assets/icons/CookIcon";
import Gauge from "~/assets/icons/Gauge";
import Prep from "~/assets/icons/PrepIcon";
import ServingIcon from "~/assets/icons/ServingsIcon";
import Input from "~/components/input";
import SelectSearch from "~/components/select_search";
import SubmitButton from "~/components/submit_button";
import { getProfile } from "~/utils/get.user.infos";

export async function loader({ request }: LoaderArgs) {
  return json(
    await promiseHash({
      ingredients: getIngredients(),
      units: getUnitMeasures(),
      profile: getProfile(request),
    })
  );
}

function addMeasure(
  arr: string[],
  ingredients: Ingredients,
  units: Unit_measures,
  deleteMeasures,
  clear
) {
  return arr.map((el, index) => {
    return (
      <fieldset key={index} className="flex gap-x-4">
        <div className="basis-[300px]">
          <SelectSearch
            data={ingredients}
            index="id"
            filterBy="name"
            name="ingredient"
            placeholder="Pick an ingredient"
            clear={clear}
          />
        </div>
        <div className="basis-[80px] shrink-0 grow-0">
          <Input name="quantity" width="14" placeholder="qty" />
        </div>
        <div className="basis-[125px] shrink-0 grow-0">
          <SelectSearch
            data={units}
            index="id"
            filterBy="abreviation"
            name="unit"
            placeholder=""
            clear={clear}
          />
        </div>
        <div
          className="basis-12  place-self-center cursor-pointer hover:text-secondary-300 transition-all"
          data-index={index}
          onClick={deleteMeasures}
        >
          <CloseIcon size="6" />
        </div>
      </fieldset>
    );
  });
}

function addStep(arr: string[], deleteStep) {
  return arr.map((el, index) => {
    return (
      <>
        <div className="flex justify-between px-2">
          <p>Step {index + 1}</p>
          <div
            data-index={index}
            onClick={deleteStep}
            className="cursor-pointer hover:text-secondary-300 transition-all"
          >
            <CloseIcon size="6" />
          </div>
        </div>
        <textarea
          className="`pl-2 pr-1 text-8 w-96 bg-main-300 rounded-md placeholder:pl-1 placeholder:text-7 focus-visible:outline-secondary-300 resize-none"
          key={index}
          name="instructions"
          rows={4}
        ></textarea>
      </>
    );
  });
}

function addTag(arr: string[], deleteTag): any {
  return arr.map((el: string, index): JSX.Element => {
    return (
      <div
        key={index}
        className="bg-main-300 h-10 flex w-fit items-center px-4 text-10 gap-x-2 rounded-md  font-semibold"
      >
        <p>{el}</p>
        <input name="tags" defaultValue={el} hidden />
        <div
          data-index={index}
          onClick={deleteTag}
          className="cursor-pointer hover:text-secondary-300 transition-all"
        >
          <CloseIcon size="6" />
        </div>
      </div>
    );
  });
}

export default function () {
  const addRecipe = useFetcher();
  const { ingredients, units, profile } = useLoaderData();
  const [measures, setMeasures] = useState<String[]>([]);
  const [setps, setStep] = useState<String[]>([]);
  const [tags, setTags] = useState<string[]>([]);

  const addOneIngr = () => {
    setMeasures((prevState) => [...prevState, "step"]);
  };

  const addOneStep = () => {
    setStep((prevState) => [...prevState, "step"]);
  };

  const addOneTag = (inputValue: string) => {
    setTags((prevState) => [...prevState, inputValue]);
  };

  const deleteTag = (e) => {
    const index = e.currentTarget.dataset.index;
    const copy = [...tags];
    copy.splice(index, 1);
    setTags(copy);
  };
  const deleteMeasures = (e) => {
    const index = e.currentTarget.dataset.index;
    const copy = [...measures];
    copy.splice(index, 1);
    setMeasures(copy);
  };
  const deleteStep = (e) => {
    const index = e.currentTarget.dataset.index;
    const copy = [...setps];
    copy.splice(index, 1);
    setStep(copy);
  };

  const handleKeyPress = (e) => {
    if (e.code.toLowerCase() === "enter" && e.target?.value?.length >= 1) {
      e.preventDefault();
      addOneTag((e.target as HTMLInputElement)?.value.trim());
      e.target.value = "";
    }
  };

  const addrecipeRef = useRef<HTMLFormElement>(null)
  const [clear, setClear] = useState(false)

  useEffect(() => {
    if (
      addRecipe.state === "idle" &&
      addrecipeRef &&
      addrecipeRef.current
    ) {
      addrecipeRef.current.reset();
      setClear(true)
    }
    return () => setClear(false)
  }, [addRecipe.state]);

  //   <span className="text-7">(required)</span>
  return (
    <div className="p-8">
      <addRecipe.Form
        method="POST"
        action="/api/recipes"
        className="flex items-center flex-col gap-y-8"
        ref={addrecipeRef}
      >
        <input type="text" name="author" defaultValue={profile.id} hidden />
        <div className="flex gap-y-2 items-center flex-col w-96">
          <p>Name</p>
          <Input name="name" type="text" width="96" placeholder="Name your recipe" />
        </div>

        <div className="flex gap-y-2 items-center flex-col">
          <p>How many people do your recipes feed ?</p>
          <div className="flex gap-x-2 text-secondary-400">
            <ServingIcon size="8" />
            <Input type="number" step={1} name="servings" width="10" />
          </div>
        </div>
        <div className="flex gap-y-2 items-center flex-col">
          <p>Set a difficulty for your recipe</p>
          <div className="flex gap-x-2 items-center text-secondary-400">
            <Gauge size="8" />
            <select
              name="level"
              className="h-9 rounded-md focus:outline-secondary-300 bg-main-300 px-4 py-2 w-28"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
        <div className="flex gap-x-10 justify-center w-full">
          <div className="flex gap-x-4 text-secondary-400">
            <Prep size="8" />
            <Input
              name="prepTime"
              type="number"
              width="16"
              step={1}
              unit="min"
            />
          </div>
          <div className="flex gap-x-4 text-secondary-400">
            <Cook size="8" />
            <Input
              name="cookTime"
              type="number"
              width="16"
              step={1}
              unit="min"
            />
          </div>
        </div>

        <input
          type="text"
          name="addTag"
          id="addTag"
          placeholder="Add a new tag"
          width="24"
          onKeyDown={handleKeyPress}
          className="pl-2 pr-1 text-8 h-9 bg-main-300 rounded-md placeholder:pl-1 placeholder:text-7 focus-visible:outline-secondary-300"
        />

        <div className="flex flex-wrap gap-1 w-1/2">
          {addTag(tags, deleteTag)}
        </div>

        <div className="flex w-full justify-evenly">
          <div className="flex flex-col items-center">
            <p className="text-7 my-2">(at least 3 ingredients are required)</p>
            <button
              type="button"
              onClick={addOneIngr}
              className="flex items-center gap-x-8 px-4 py-2 bg-main-300 rounded-lg font-bold text-8 mb-8"
            >
              ADD INGREDIENT
              <div className="text-secondary-300">
                <AddPlusIcon size="8" />
              </div>
            </button>
            <div className="flex items-center flex-col w-full gap-y-4">
              {addMeasure(measures, ingredients, units, deleteMeasures, clear)}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-7 my-2">(at least 1 intrusction is required)</p>
            <button
              type="button"
              onClick={addOneStep}
              className="flex items-center gap-x-8 px-4 py-2 bg-main-300 rounded-lg font-bold text-8 mb-8"
            >
              ADD INSTRUCTION
              <div className="text-secondary-300">
                <AddPlusIcon size="8" />
              </div>
            </button>
            <div className="flex flex-col gap-y-4">
              {addStep(setps, deleteStep)}
            </div>
          </div>
        </div>
        <div className="flex gap-y-2 items-center flex-col">
          <p>
            Add a youtube link to help to recreate this recipe at home{" "}
            <span className="text-7">(optional)</span>
          </p>
          <Input type="url" name="ytLink" pattern="https://www.youtube.com/*" />
        </div>

        <SubmitButton text="Create recipe" />
      </addRecipe.Form>
    </div>
  );
}
