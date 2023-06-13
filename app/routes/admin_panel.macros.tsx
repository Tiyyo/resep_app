import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Outlet,
  isRouteErrorResponse,
  useFetcher,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { getMacros } from "~/api/get.all.request";
import Input from "~/components/input";
import SubmitButton from "~/components/submit_button";
import Table from "~/components/table";
import UpdateMacroForm from "~/components/update_forms";

export async function loader({ request }: LoaderArgs) {
  const macros = await getMacros();
  return json({ macros });
}

export default function MacrosPanel() {
  const { macros } = useLoaderData();
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
    <>
    <Outlet context={{ UpdateForm : UpdateMacroForm }}/>
      <div className="pt-5">
        <addMacros.Form
          method="POST"
          action="/api/macros"
          ref={addMacroFormRef}
        >
          <div className="flex center gap-x-4">
            <Input label="Food" name="food" type="text" unit="" width="25" />
            <Input
              label="Calories"
              unit="g"
              type="number"
              name="calories"
              width="12"
            />
            <Input
              label="Proteins"
              unit="g"
              type="number"
              name="proteins"
              width="12"
            />
            <Input
              label="Carbs"
              unit="g"
              type="number"
              name="carbs"
              width="12"
            />
            <Input label="Fat" unit="g" type="number" name="fat" width="12" />
            <Input
              label="Water"
              unit="ml"
              type="number"
              name="water"
              width="12"
            />
            <SubmitButton text="Add food" />
          </div>
        </addMacros.Form>
        <div>
          {macros && macros.length > 0 ? (
            <Table data={macros} endpoint="/api/macros" search="food" />
          ) : (
            "No macro nutriment in database"
          )}
        </div>
      </div>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  console.log(error);

  if (!isRouteErrorResponse(error)) {
    return <Link to="/admin_panel/macros">Refresh</Link>;
  }

  if (error.status === 404) {
    return (
      <>
        <h2>Error 404</h2>
        <button> Rafraichir </button>
      </>
    );
  }
}
