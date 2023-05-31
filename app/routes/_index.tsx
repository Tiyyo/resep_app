import type { V2_MetaFunction } from "@remix-run/node";
import {
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import LayoutMain from "~/components/layout/LayoutMain";
import LayoutPage from "~/components/layout/LayoutPage";




export const meta: V2_MetaFunction = () => {
  return [{ title: "Groc ! Have control over your macros" }];
};

export default function Index() {

  return (
    <LayoutPage>
      <LayoutMain/>
    </LayoutPage>
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
