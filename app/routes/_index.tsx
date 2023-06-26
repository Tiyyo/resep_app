import { redirect, type LoaderArgs, type V2_MetaFunction } from "@remix-run/node";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

export async function loader({ request }: LoaderArgs) {
  return redirect("/home")
}

export const meta: V2_MetaFunction = () => {
  return [{ title: "Groc ! Have control over your macros" }];
};

export default function Index() {
  return (
    <>
      {/* Need these class to be read by tailwind at least once for string concatanation */}
      <div className=" h-4 w-14 w-16 w-24 w-32 w-7 pl-6 hidden"></div>
      <input type="text" className="w-10" hidden />
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (!isRouteErrorResponse(error)) {
    return <p> An Error occured</p>;
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
