import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Outlet,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { getMacros } from "~/api/get.all.request";
import Table from "~/components/table";
// import UpdateMacroForm from "~/components/update_forms";

export async function loader({ request }: LoaderArgs) {
  const macros = await getMacros();
  return json({ macros });
}

export default function MacrosPanel() {
  const { macros } = useLoaderData();

  return (
    <>
      {/* <Outlet context={{ UpdateForm: UpdateMacroForm }} /> */}
      <Outlet />
      <div className="">
        <div>
          {macros && (
            <Table data={macros} endpoint="/api/macros" search="food" />
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
    return <Link to="/dashboard/macros">Refresh</Link>;
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
