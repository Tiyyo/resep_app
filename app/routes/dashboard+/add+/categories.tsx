import { useFetcher } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import Error from "~/components/error";
import Input from "~/components/input";
import SubmitButton from "~/components/submit_button";
import { Toast } from "~/components/toast";

export default function () {
  const addCategory = useFetcher();
  const [errorText, setErrorText] = useState<string>("");
  const addFormRef = useRef<HTMLFormElement>(null);
  const addFormState = addCategory.state;

  useEffect(() => {
    if (addCategory.state === "idle" && addFormRef && addFormRef.current) {
      addFormRef.current.reset();
      setErrorText(addCategory?.data?.error?.userMessage);
    }
  }, [addFormState, addCategory.state, addCategory?.data?.error?.userMessage]);

  console.log(addCategory, "MESSAGE");

  return (
    <>
      <Toast message={addCategory?.data?.message} />
      <div>
        <addCategory.Form
          method="post"
          action="/api/categories"
          ref={addFormRef}
        >
          <div className="flex justify-center gap-x-3">
            <Input name="category" placeholder="Category name" align="start" />
            <SubmitButton text="Add Category" />
          </div>
        </addCategory.Form>
        <Error message={errorText} />
      </div>
    </>
  );
}
