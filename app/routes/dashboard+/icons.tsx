import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Outlet,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import icon from "~/api/icon";
import OrientationScreen from "~/components/orientation";
import Table from "~/components/table";
import TitleLevel1 from "~/components/title/TitleLevel1";
import ResponseError from "~/helpers/response/response.error";
import Error404 from "~/layout/Error404Page";
import type { Icon } from "~/types/index";

export async function loader({ request }: LoaderArgs) {
  try {
    const icons = await icon.findAll();
    return json({ icons });
  } catch (error) {
    return new ResponseError(error);
  }
}

export default function EditIcons() {
  // ts errors remix bugs open issue here
  //https://github.com/remix-run/remix/issues/3931
  const data = useLoaderData();

  if (data instanceof ResponseError) {
    return <p>Couldn't find icons to display</p>;
  }

  const dataTable = data.icons.map((icon: Icon) => {
    return {
      id: icon.id,
      image: icon.link,
      name: icon.name,
      tags: icon.tags,
    };
  });

  return (
    <>
      <OrientationScreen />
      <div className="hidden xl:block">
        <TitleLevel1 title={"Icons"} />
        <p className="mb-6 ml-8 text-10 text-opacity-80">
          Manage current icons available or add more
        </p>
        <Outlet />
        {data.icons && data.icons.length > 0 && (
          <Table
            data={dataTable}
            image={true}
            endpoint="/api/icons"
            search="name"
          />
        )}
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
