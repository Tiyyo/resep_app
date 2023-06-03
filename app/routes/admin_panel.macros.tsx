import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { getMacros } from "~/api/get.all.request";
import DeleteIcon from "~/assets/icons/DeleteIcon";

export async function loader({ request }: LoaderArgs) {
  const macros = await getMacros();
  return json({ macros });
}

export default function MacrosPanel() {
  const { macros } = useLoaderData();
  const addMacro = useFetcher();
  const deleteMacro = useFetcher();
  const editMacro = useFetcher();

  const addMacroFormRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (
      addMacro.state === "idle" &&
      addMacroFormRef &&
      addMacroFormRef.current
    ) {
      addMacroFormRef.current.reset();
    }
  }, [addMacro.state]);

  return (
    <div>
      <addMacro.Form method="POST" action="/api/macros" ref={addMacroFormRef}>
        <div className="flex gap-x-2">
          <Input label="Food" name="food" type="text" unit="" inputWidth="25" />
          <Input label="Calories" unit="g" type="number" name="calories" />
          <Input label="Proteins" unit="g" type="number" name="proteins" />
          <Input label="Carbs" unit="g" type="number" name="carbs" />
          <Input label="Fat" unit="g" type="number" name="fat" />
          <Input label="Water" unit="g" type="number" name="water" />
          <button type="submit">Add food</button>
        </div>
      </addMacro.Form>
      <div>
        {macros.length > 0 ? (
          <Table data={macros} />
        ) : (
          "No macro nutriment in database"
        )}
      </div>
    </div>
  );
}
interface InputProps {
  label: string;
  unit: string;
  type: string;
  name: string;
  step?: number;
  inputWidth?: string;
  style?: string;
  defaultValue?: string;
}

type TextAlign =
  | "text-end"
  | "text-start"
  | "text-center"
  | "text-right"
  | "text-left"
  | "text-justify";

function Input({
  label,
  unit,
  type,
  name,
  style,
  inputWidth,
  defaultValue,
}: InputProps) {
  const [textAlign, setTextAlign] = useState<TextAlign | null>("text-start");

  useEffect(() => {
    if (type === "number") {
      setTextAlign("text-end");
    } else {
      setTextAlign("text-start");
    }
  }, [type]);

  return (
    <div className={`center w-15 h-11 ${style}`}>
      <label htmlFor={name}>{label} :</label>
      <input
        className={`w-${inputWidth ?? 10} ${textAlign}`}
        type={type}
        name={name}
        id={name}
        step={0.1}
        defaultValue={defaultValue}
      />
      <p>{unit}</p>
    </div>
  );
}

function Row() {
  return;
}

function Table({ data }) {
  const [searchValue, setSearchValue] = useState<string>("");
  const editMacro = useFetcher();
  const deleteMacro = useFetcher();

  return (
    <div>
      <div>
        <label>Seach</label>
        <input type="text" onChange={(e) => setSearchValue(e.target.value)} />
      </div>
      {data ? (
        <>
          {data
            .filter((f) => f.food.includes(searchValue))
            .map((el) => {
              return (
                <div key={el.id} className="flex">
                  <editMacro.Form action="/api/macros" method="PATCH" className="flex">
                    <input
                      type="text"
                      name={"id"}
                      defaultValue={el.id}
                      hidden
                    />
                    <Input
                      label="Food"
                      name="food"
                      type="text"
                      unit=""
                      inputWidth="25"
                      defaultValue={el.food}
                    />
                    <Input
                      label="Calories"
                      unit="g"
                      type="number"
                      name="calories"
                      defaultValue={el.calories}
                    />
                    <Input
                      label="Proteins"
                      unit="g"
                      type="number"
                      name="proteins"
                      defaultValue={el.proteins}
                    />
                    <Input
                      label="Carbs"
                      unit="g"
                      type="number"
                      name="carbs"
                      defaultValue={el.carbs}
                    />
                    <Input
                      label="Fat"
                      unit="g"
                      type="number"
                      name="fat"
                      defaultValue={el.fat}
                    />
                    <Input
                      label="Water"
                      unit="g"
                      type="number"
                      name="water"
                      defaultValue={el.water}
                    />
                    <button type="submit">Valid Edit</button>
                  </editMacro.Form>
                  <deleteMacro.Form action="/api/macros" method="DELETE"> 
                    <input type="number" name="id" defaultValue={el.id} hidden />
                    <button type="submit">
                      <DeleteIcon/>
                    </button>
                  </deleteMacro.Form>

                </div>
              );
            })}
        </>
      ) : (
        ""
      )}
    </div>
  );
}
