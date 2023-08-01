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
import { Toast } from "~/components/toast";

export default function () {
  const addIconFormRef = useRef<HTMLFormElement>(null);
  const actionData = useActionData();
  const addIcons = useFetcher();
  console.log(actionData);
  console.log(addIcons);

  useEffect(() => {
    if (addIcons.state === "idle" && addIconFormRef && addIconFormRef.current) {
      addIconFormRef.current.reset();
    }
  }, [addIcons.state, addIconFormRef]);

  return (
    <div>
      <Toast message={addIcons?.data?.message} />
      <addIcons.Form
        method="POST"
        action="/api/icons"
        encType="multipart/form-data"
        ref={addIconFormRef}
      >
        <div className="center flex flex-col gap-y-4">
          <div className="flex flex-col items-start gap-4 md:flex-row">
            <Input
              name="name"
              placeholder="Icon name"
              label="Name"
              align="start"
              error={addIcons?.data?.error?.fieldErrors?.name}
            />
            <div className="flex items-center">
              <Input
                name="tags"
                placeholder="Tags"
                label="Tags"
                align="start"
              />
              <p className="px-2 text-6">(optional)</p>
            </div>
          </div>
          <FileInput
            name="image_icon"
            error={addIcons?.data?.error?.fieldErrors?.image_icon}
          />
          <SubmitButton text="Create icon" />
        </div>
        <Error message={addIcons?.data?.error?.userMessage} />
      </addIcons.Form>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  console.log(error);

  if (!isRouteErrorResponse(error)) {
    return (
      <div className="center h-full w-full flex-col gap-y-8">
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
