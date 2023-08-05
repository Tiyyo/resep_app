import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Outlet,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import category from "~/api/category";
import OrientationScreen from "~/components/orientation";
import Table from "~/components/table";
import TitleLevel1 from "~/components/title/TitleLevel1";
import NotFoundError from "~/helpers/errors/not.found.error";
import ResponseError from "~/helpers/response/response.error";
import Error404 from "~/layout/Error404Page";

export async function loader({ request }: LoaderArgs) {
  try {
    const categories = await category.findAll();
    if (!categories) throw new NotFoundError("No categories found");
    return json({ categories });
  } catch (error) {
    return new ResponseError(error);
  }
}

export default function CategoryPanel() {
  const { categories } = useLoaderData();

  return (
    <>
      <OrientationScreen />
      <div className="hidden xl:block">
        <TitleLevel1 title={"Categories"} />
        <p className="mb-6 ml-8 text-10 text-opacity-80">
          Manage current categories available or add more
        </p>
        <Outlet />
        <div className="flex flex-col gap-y-4 overflow-y-scroll  pt-5">
          {categories && <Table data={categories} endpoint="/api/categories" />}
        </div>
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
          We are sorry ... something went wrong with thoses icons
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
