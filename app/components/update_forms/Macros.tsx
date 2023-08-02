import { useFetcher } from "@remix-run/react";
import Error from "../error";
import Input from "../input";
import SubmitButton from "../submit_button";
import type { UpdateMacrosFormProps } from "./interface";

export default function UpdateMacrosForm({
  data: macros,
}: UpdateMacrosFormProps) {
  const updateMacros = useFetcher();

  return (
    <updateMacros.Form method="PATCH" action="/api/macros">
      <div className="center flex flex-col gap-y-12">
        <input type="text" name="id" defaultValue={macros.id} hidden />

        <Input
          label="Food"
          name="food"
          type="text"
          unit=""
          width="25"
          defaultValue={macros?.food}
        />

        <div className="flex flex-col justify-start">
          <Input
            label="Calories"
            unit="kcal"
            type="number"
            name="calories"
            width="14"
            defaultValue={macros.calories}
          />
          <Error message={updateMacros?.data?.fieldErrors?.calories} />
        </div>

        <div className="flex items-start gap-x-4">
          <div className="flex flex-col justify-start">
            <Input
              label="Proteins"
              unit="g"
              type="number"
              name="proteins"
              width="14"
              defaultValue={macros.proteins}
            />
            <Error message={updateMacros?.data?.fieldErrors?.proteins} />
          </div>

          <div className="flex flex-col justify-start">
            <Input
              label="Carbs"
              unit="g"
              type="number"
              name="carbs"
              width="14"
              defaultValue={macros.carbs}
            />
            <Error message={updateMacros?.data?.fieldErrors?.carbs} />
          </div>
          <div className="flex flex-col justify-start">
            <Input
              label="Fat"
              unit="g"
              type="number"
              name="fat"
              width="14"
              defaultValue={Number(macros?.fat).toFixed(1)}
            />
            <Error message={updateMacros?.data?.fieldErrors?.fat} />
          </div>

          <div className="flex flex-col justify-start">
            <Input
              label="Water"
              unit="g"
              type="number"
              name="water"
              width="14"
              defaultValue={Number(macros?.water).toFixed(1)}
            />
            <Error message={updateMacros?.data?.fieldErrors?.water} />
          </div>
        </div>
        <SubmitButton text="Edit food" />
        <Error message={updateMacros?.data?.error} />
      </div>
    </updateMacros.Form>
  );
}
