import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { Link, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import { requireUserId } from "~/utils/auth.server";

export async function loader({request}: LoaderArgs) {
  await requireUserId(request)
  return null
};


export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export default function Index() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>

      <div className="mx-auto mt-16 max-w-7xl text-center">
        <Link to="/posts" className="text-xl text-blue-600 underline">
          Blog Posts
        </Link>
      </div>
    </div>
  );
}

export function ErrorBoundary () {
  const error = useRouteError()

  if (!isRouteErrorResponse(error)) {
    return <p> An Error occured</p>
  }

  if (error.status === 404) {
    return (
      <>
      <h2>Error 404</h2>
      <button> Rafraichir </button>
      </>
    )
  }
}
