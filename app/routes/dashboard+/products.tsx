import type { ActionArgs } from "@remix-run/node";
import { Link, isRouteErrorResponse, useRouteError } from "@remix-run/react";
import Error404 from "~/layout/Error404Page";

export async function action({ request }: ActionArgs) {
  return null;
}

export default function ProductsManagement() {
  return (
    <p>Under Construction</p>
    // <Form method="POST" encType="multipart/form-data">
    //   <FileInput name="image_recipe" />
    //   <SubmitButton text="envoyer" />
    // </Form>
    // <div>
    //   this is a product management page
    // </div>
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
