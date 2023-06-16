import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  Outlet,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { getIcons } from "~/api/get.all.request";
import Table from "~/components/table";
import { UpdateIconsForm } from "~/components/update_forms";

export async function loader({ request }: LoaderArgs) {
  const icons = await getIcons();
  return json({ icons });
}


export default function EditIcons() {
  // ts errors remix bugs open issue here
  //https://github.com/remix-run/remix/issues/3931
  const { icons } = useLoaderData<typeof loader>();

  const dataTable = icons.map((icon) => {
    return { id: icon.id, image: icon.link, name: icon.name, tags: icon.tags };
  });

  return (
    <>
      <Outlet context={{ UpdateForm: UpdateIconsForm }} />
      <div>
        <div>
          {icons && icons.length > 0 ? (
            <Table
              data={dataTable}
              image={true}
              endpoint="/api/icons"
              search="name"
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (!isRouteErrorResponse(error)) {
    return <Link to="/admin_panel/icons">Refresh</Link>;
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
