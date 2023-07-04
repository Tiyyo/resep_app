import {
  Link,
  isRouteErrorResponse,
  useActionData,
  useFetcher,
  useRouteError,
} from "@remix-run/react";
import { useEffect, useRef } from "react";
import Error from "~/components/error";
import FileInput from "~/components/file_input";
import Input from "~/components/input";
import SubmitButton from "~/components/submit_button";

export default function () {
  const addIconFormRef = useRef<HTMLFormElement>(null);
  const actionData = useActionData();
  const addIcons = useFetcher();

  useEffect(() => {
    if (addIcons.state === "idle" && addIconFormRef && addIconFormRef.current) {
      addIconFormRef.current.reset();
    }
  }, [addIcons.state, addIconFormRef]);

  return (
    <div>
      <addIcons.Form
        method="POST"
        action="/api/icons"
        encType="multipart/form-data"
        ref={addIconFormRef}
      >
        <div className="flex flex-col center gap-y-4">
          <div className="flex gap-x-4">
            <Input
              name="name"
              placeholder="Icon name"
              label="Name"
              align="start"
            />
            <div className="flex items-center">
              <Input
                name="tags"
                placeholder="Tags"
                label="Tags"
                align="start"
              />
              <p className="text-6 px-2">(optional)</p>
            </div>
          </div>
          <FileInput name="image_icon" />
          <SubmitButton text="Create icon" />
        </div>
        <Error message={actionData?.error} />
      </addIcons.Form>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  console.log(error);

  if (!isRouteErrorResponse(error)) {
    return (
      <div className="w-full h-full center flex-col gap-y-8">
        <p>{error.message}</p>
        <p>Please fill all required fields</p>
        <Link to="/dashboard/add/icons">Refresh</Link>
      </div>
    );
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
