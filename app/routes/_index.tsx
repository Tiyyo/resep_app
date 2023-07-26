import {
  redirect,
  type LoaderArgs,
  type V2_MetaFunction,
} from "@remix-run/node";
import { isRouteErrorResponse, useRouteError } from "@remix-run/react";

export async function loader({ request }: LoaderArgs) {
  return redirect("/home");
}

export const meta: V2_MetaFunction = () => {
  return [{ title: "Groc ! Have control over your macros" }];
};

export default function Index() {
  return (
    <>
      {/* Need these class to be read by tailwind at least once for string concatanation */}
      <div className=" hidden h-4 w-32 pl-6"></div>
      <input type="text" className="w-7" hidden />
      <input type="text" className="w-10" hidden />
      <input type="text" className="w-14" hidden />
      <input type="text" className="w-16" hidden />
      <input type="text" className="w-24" hidden />
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
