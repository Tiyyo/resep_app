import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Link,
  Outlet,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import icon from '~/api/icon';
import Table from '~/components/table';
import ResponseError from '~/helpers/response/response.error';
import { Icon } from '~/types/recipe';

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
  const icons = useLoaderData<Array<Icon> | ResponseError>();

  if (icons instanceof ResponseError) {
    return <p>Couldn't find icons to display</p>;
  }

  const dataTable = icons.map((icon) => {
    return {
      id: icon.id,
      image: icon.link,
      name: icon.name,
      tags: icon.tags,
    };
  });

  return (
    <>
      <Outlet />
      {icons && icons.length > 0 && (
        <Table
          data={dataTable}
          image={true}
          endpoint="/api/icons"
          search="name"
        />
      )}
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (!isRouteErrorResponse(error)) {
    return <Link to="/dashboard/icons">Refresh</Link>;
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
