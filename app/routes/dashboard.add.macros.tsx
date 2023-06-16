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
      addMacroFormRef.current.reset();
      setErrorText(addMacros?.data?.fields?.name);
    }
  }, [addMacros.state, addMacros?.data?.fields?.name]);
  return (
    <div>
      <addMacros.Form method="POST" action="/api/macros" ref={addMacroFormRef}>
        <div className="flex flex-col center gap-y-12">
          <Input label="Food" name="food" type="text" unit="" width="25" />
          <Input
            label="Calories"
            unit="g"
            type="number"
            name="calories"
            width="14"
          />
          <div className="flex gap-x-4">
            <Input
              label="Proteins"
              unit="g"
              type="number"
              name="proteins"
              width="14"
            />
            <Input
              label="Carbs"
              unit="g"
              type="number"
              name="carbs"
              width="14"
            />
            <Input label="Fat" unit="g" type="number" name="fat" width="14" />
            <Input
              label="Water"
              unit="ml"
              type="number"
              name="water"
              width="14"
            />
          </div>

          <SubmitButton text="Add food" />
          <Error message={errorText} />
        </div>
      </addMacros.Form>
    </div>
  );
}
