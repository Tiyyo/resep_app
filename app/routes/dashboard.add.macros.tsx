import { useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router-dom";
import Error from "~/components/error";
import Input from "~/components/input";
import SubmitButton from "~/components/submit_button";

export default function () {
  const addMacros = useFetcher();
  const [errorText, setErrorText] = useState<string>("");

  const addMacroFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (
      addMacros.state === "idle" &&
      addMacroFormRef &&
      addMacroFormRef.current
    ) {
      if (addMacros?.data?.fields?.name) {
        setErrorText(addMacros?.data?.fields?.name);
      }
      if (addMacros.data?.error) {
        setErrorText(addMacros.data?.error);
      }
      if (addMacros.data?.status === 200) {
        addMacroFormRef.current.reset();
      }
    }
  }, [
    addMacros.state,
    addMacros?.data?.fields?.name,
    addMacros.data?.status,
    addMacros.data?.error,
  ]);

  return (
    <div>
      <addMacros.Form method="POST" action="/api/macros" ref={addMacroFormRef}>
        <div className="flex flex-col center gap-y-12">
          <Input
            label="Food"
            name="food"
            type="text"
            unit=""
            width="25"
            align="start"
          />

          <div className="flex flex-col justify-start">
            <Input
              label="Calories"
              unit="kcal"
              type="number"
              name="calories"
              width="14"
            />
            <Error message={addMacros?.data?.fieldErrors?.calories} />
          </div>

          <div className="flex items-start gap-x-4">
            <div className="flex flex-col justify-start">
              <Input
                label="Proteins"
                unit="g"
                type="number"
                name="proteins"
                width="14"
              />
              <Error message={addMacros?.data?.fieldErrors?.proteins} />
            </div>

            <div className="flex flex-col justify-start">
              <Input
                label="Carbs"
                unit="g"
                type="number"
                name="carbs"
                width="14"
              />
              <Error message={addMacros?.data?.fieldErrors?.carbs} />
            </div>

            <div className="flex flex-col justify-start">
              <Input label="Fat" unit="g" type="number" name="fat" width="14" />
              <Error message={addMacros?.data?.fieldErrors?.fat} />
            </div>

            <div className="flex flex-col justify-start">
              <Input
                label="Water"
                unit="ml"
                type="number"
                name="water"
                width="14"
              />
              <Error message={addMacros?.data?.fieldErrors?.water} />
            </div>
          </div>

          <SubmitButton text="Add food" />
          <Error message={errorText} />
        </div>
      </addMacros.Form>
    </div>
  );
}
