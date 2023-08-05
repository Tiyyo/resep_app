import type { ActionArgs } from "@remix-run/node";
import {
  Link,
  Outlet,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import OrientationScreen from "~/components/orientation";
import TitleLevel1 from "~/components/title/TitleLevel1";
import Error404 from "~/layout/Error404Page";

export async function action({ request }: ActionArgs) {
  return null;
}

export default function ProductsManagement() {
  return (
    <>
      <OrientationScreen />
      <div className="hidden xl:block">
        <TitleLevel1 title={"Products"} />
        <p className="mb-6 ml-8 text-10 text-opacity-80">
          Manage current products available or add more
        </p>
        <Outlet />
        {/* {macros && <Table data={macros} endpoint="/api/macros" search="food" />} */}
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
          We are sorry ... something went wrong with thoses products
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
