import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Link,
  Outlet,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import macro from '~/api/macro';
import Table from '~/components/table';

export async function loader({ request }: LoaderArgs) {
  const macros = await macro.findAll();
  return json({ macros });
}

export default function MacrosPanel() {
  const { macros } = useLoaderData();

  return (
    <>
      <Outlet />
      {macros && <Table data={macros} endpoint="/api/macros" search="food" />}
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

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
