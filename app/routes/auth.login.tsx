import type { LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import {
  Form,
  Link,
  isRouteErrorResponse,
  useActionData,
  useNavigation,
  useRouteError,
} from "@remix-run/react";
import { useState } from "react";
import AtIcon from "~/assets/icons/AtIcon";
import EyeIcon from "~/assets/icons/Eye";
import EyeSlash from "~/assets/icons/EyeSlash";
import LoginIcon from "~/assets/icons/LoginIcon";
import Button from "~/components/button";
import Checkbox from "~/components/checkbox";
import { FormField } from "~/components/form_field";
import { getUser } from "~/utils/auth.server";
import { withZod } from "@remix-validated-form/with-zod";
import { validationError } from "remix-validated-form";
import * as Z from "zod";
import type { ActionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { login } from "~/utils/auth.server";
import ErrorIcon from "~/assets/icons/ErrorIcon";

export async function loader({ request }: LoaderArgs) {
  return (await getUser(request)) ? redirect("/") : null;
}

export const validator = withZod(
  Z.object({
    email: Z.string().email({ message: "This is not an valid email" }),
    password: Z.string(),
    rememberMe: Z.string()
      .transform((value) => value === "on")
      .optional(),
  })
);

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const action = formData.get("action");
  if (action === "user") {
    return null;
  } else {
    const data = await validator.validate(formData);
    if (data.error) return validationError(data.error);
    const { email, password, rememberMe } = data.data;

    return await login({ email, password, rememberMe });
  }
}

export default function () {
  const actionData = useActionData();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData((form) => ({
      ...form,
      [field]: event.target.value,
    }));
  };
  return (
    <div className="w-4/5">
      <h2 className="text-3xl font-bold text-secondary-300 my-5 text-center">
        Hello Again !
      </h2>
      <p className="text-center text-black-light text-8 my-5">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id repellat
        commodi quos accusantium assumenda mollitia.
      </p>
      <form method="post" action="/auth/google" className="center w-full py-2">
        <Button
          action="google_auth"
          name="_action"
          type="submit"
          value="Login with Google"
          sx=" hover:text-secondary-300 w-full"
        >
          <img
            className="w-6 h-6"
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            loading="lazy"
            alt="google logo"
          />
        </Button>
      </form>
      <Form method="post" >
        <div className="flex flex-col">
          <FormField
            htmlFor="email"
            label="Email"
            type="text"
            onChange={(e) => handleInputChange(e, "email")}
            error={actionData?.fieldErrors?.email}
          >
            <AtIcon />
          </FormField>
          <FormField
            htmlFor="password"
            label="Password"
            type="password"
            subIcon={<EyeSlash />}
            onChange={(e) => handleInputChange(e, "password")}
            error={actionData?.fieldErrors?.password}
          >
            <EyeIcon />
          </FormField>
        </div>
        <div className="text-7 flex justify-between px-2">
          <Checkbox label="Remember me" name="remenberMe" />
          <p className="text-secondary-400 font-bold">Forgot password ?</p>
        </div>
        <div className="flex gap-x-6 center my-6 ">
          <Button
            type="submit"
            value="Login"
            sx="w-3/4 bg-secondary-400 text-white-200 hover:bg-secondary-300"
          >
            <LoginIcon />
          </Button>
        </div>
      </Form>
      {actionData?.error ? (
        <div className="text-11 font-semibold text-center text-red-600 w-full center gap-x-4 py-1 px-2 text-red">
          <ErrorIcon />
          <p>{actionData?.error}</p>
        </div>
      ) : (
        ""
      )}
      <p className="absolute bottom-2 left-1/2 -translate-x-1/2">
        Don't have account ?
        <span className="text-secondary-300 font-bold">
          <Link to="/auth/signup"> Sign up</Link>
        </span>
      </p>
    </div>
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
