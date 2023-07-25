import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Outlet,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import macro from "~/api/macro";
import OrientationScreen from "~/components/orientation";
import Table from "~/components/table";
import Error404 from "~/layout/Error404Page";

export async function loader({ request }: LoaderArgs) {
  const macros = await macro.findAll();
  return json({ macros });
}

export default function MacrosPanel() {
  const { macros } = useLoaderData();

  return (
    <>
      <OrientationScreen />
      <div className="hidden xl:block">
        <Outlet />
        {macros && <Table data={macros} endpoint="/api/macros" search="food" />}
      </div>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (!isRouteErrorResponse(error)) {
    return (
      <div className="center h-full w-full flex-col">
        <p className="text-10 font-semibold">
          We are sorry ... something went wrong with thoses macros
        </p>
        <p>
          &#8608; &#8608; <Link to="/dashboard">Click here to refresh</Link>{" "}
          &#8606; &#8606;
        </p>
        ;
      </div>
    );
  }

  if (error.status === 404) {
    return <Error404 />;
  }
}
