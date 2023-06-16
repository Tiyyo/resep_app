import { useActionData, useFetcher, useNavigation } from "@remix-run/react";
import { useEffect, useRef } from "react";
import Error from "~/components/error";
import FileInput from "~/components/file_input";
import Input from "~/components/input";
import SubmitButton from "~/components/submit_button";

export default function () {
  const addIconFormRef = useRef<HTMLFormElement>(null);
  const actionData = useActionData();
  const navigation = useNavigation();
  const addIcons = useFetcher();

  useEffect(() => {
    if (
      navigation.state === "idle" &&
      addIconFormRef &&
      addIconFormRef.current
    ) {
      addIconFormRef.current.reset();
    }
  }, [navigation.state, addIconFormRef]);

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
            <Input name="name" placeholder="Icon name" label="Name" />
            <Input name="tags" placeholder="Tags" label="Tags"/>
          </div>
          <FileInput />
          <SubmitButton text="Create icon" />
        </div>
        <Error message={actionData?.error} />
      </addIcons.Form>
    </div>
  );
}
