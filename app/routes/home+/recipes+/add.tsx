import { json, type LoaderArgs } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { promiseHash } from "remix-utils";
import ingredient from "~/api/ingredient";
import unit_measure from "~/api/unit_measure";
import Cook from "~/assets/icons/CookIcon";
import Gauge from "~/assets/icons/Gauge";
import Prep from "~/assets/icons/PrepIcon";
import ServingIcon from "~/assets/icons/ServingsIcon";
import Dropzone from "~/components/dropzone";
import Error from "~/components/error";
import TagsGenerator from "~/components/generate_tag";
import GenerateJSX from "~/components/generator";
import Input from "~/components/input";
import Instruction from "~/components/instruction";
import Measure from "~/components/measure";
import Select from "~/components/select";
import SubmitButton from "~/components/submit_button";
import { Toast } from "~/components/toast";
import { getProfile } from "~/utils/get.user.infos";

export async function loader({ request }: LoaderArgs) {
  return json(
    await promiseHash({
      ingredients: ingredient.findAll(),
      units: unit_measure.findAll(),
      profile: getProfile(request),
    })
  );
}

export default function () {
  const addRecipe = useFetcher();
  const { ingredients, units, profile } = useLoaderData();
  const addrecipeRef = useRef<HTMLFormElement>(null);
  const [clear, setClear] = useState(false);

  const buttonPropsMeasure = {
    condition: "at least 3 ingredients are require",
    type: "button" as const,
    value: "ADD INGREDIENT",
    addStyle: "bg-main-300 hover:border-secondary-300",
  };

  const buttonPropsStep = {
    condition: "at least 2 intrusction is required",
    type: "button" as const,
    value: "ADD INSTRUCTION",
    addStyle: "bg-main-300 hover:border-secondary-300",
  };

  const errorsMeasures = [
    addRecipe?.data?.fieldErrors?.ingredient,
    addRecipe?.data?.fieldErrors?.ingredients,
  ];

  const errorsSteps = [addRecipe?.data?.fieldErrors?.instructions];

  const measureProps = {
    ingredients: ingredients,
    clear: clear,
    units: units,
  };

  const optionsDifficulty = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];

  useEffect(() => {
    if (
      addRecipe.state === "idle" &&
      addrecipeRef &&
      addrecipeRef.current &&
      addRecipe.data?.status === 200
    ) {
      addrecipeRef.current.reset();
      setClear(true);
    }
    return () => setClear(false);
  }, [addRecipe.state, addRecipe.data?.status]);

  return (
    <div className="p-8">
      <Toast message={addRecipe?.data?.message} />
      <addRecipe.Form
        method="POST"
        action="/api/recipes"
        encType="multipart/form-data"
        className="flex flex-col items-center gap-y-8"
        ref={addrecipeRef}
      >
        <input type="text" name="author" defaultValue={profile.id} hidden />

        <div className="flex w-full max-w-fit flex-col items-center gap-y-2">
          <p>Name</p>
          <Input
            name="name"
            type="text"
            width="96"
            placeholder="Name your recipe"
            align="start"
            sx="max-w-[65%]"
            error={addRecipe?.data?.fieldErrors?.name}
          />
        </div>
        <Dropzone name="image_recipe" />
        <div className="flex flex-col items-center gap-y-2">
          <p className="text-center">How many people do your recipes feed ?</p>
          <div className="flex gap-x-2 text-secondary-400">
            <ServingIcon size="8" />
            <div className="flex flex-col items-center">
              <Input
                type="number"
                step={1}
                name="servings"
                width="10"
                error={addRecipe?.data?.fieldErrors?.serving}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-y-2">
          <p>Set a difficulty for your recipe</p>
          <Select options={optionsDifficulty}>
            <Gauge size="8" />
          </Select>
        </div>
        <div className="flex w-full flex-wrap justify-center gap-x-10 gap-y-2">
          <div className="flex gap-x-4 text-secondary-400">
            <Prep size="8" />

            <div className="flex flex-col items-start">
              <Input
                name="prepTime"
                type="number"
                width="16"
                step={1}
                unit="min"
              />
              <div className="ml-2">
                <Error message={addRecipe?.data?.fieldErrors?.prepTime} />
              </div>
            </div>
          </div>

          <div className="flex gap-x-4 text-secondary-400">
            <Cook size="8" />

            <div className="flex flex-col items-start">
              <Input
                name="cookTime"
                type="number"
                width="16"
                step={1}
                unit="min"
              />
              <div className="ml-2">
                <Error message={addRecipe?.data?.fieldErrors?.cookTime} />
              </div>
            </div>
          </div>
        </div>
        <TagsGenerator />

        <div className="flex w-full flex-col justify-evenly xl:flex-row">
          <GenerateJSX
            buttonProps={buttonPropsMeasure}
            errors={errorsMeasures}
            ElementToGenerate={Measure}
            elementProps={measureProps}
          />
          <div className="flex flex-col items-center">
            <GenerateJSX
              buttonProps={buttonPropsStep}
              errors={errorsSteps}
              ElementToGenerate={Instruction}
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-y-2">
          <p className="text-center">
            Add a youtube link to help to recreate this recipe at home{" "}
            <span className="text-7">(optional)</span>
          </p>
          <Input
            type="url"
            name="ytLink"
            align="start"
            error={addRecipe?.data?.fieldErrors?.ytLink}
          />
        </div>

        <SubmitButton text="Create recipe" />
      </addRecipe.Form>
    </div>
  );
}
