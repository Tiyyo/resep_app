import {
  Form,
  Link,
  isRouteErrorResponse,
  useActionData,
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
import { withZod } from "@remix-validated-form/with-zod";
import { validationError } from "remix-validated-form";
import * as Z from "zod";
import { redirect, type ActionArgs } from "@remix-run/node";
import { getUser, login } from "~/service/auth.server";
import ErrorIcon from "~/assets/icons/ErrorIcon";
import LayoutAuth from "~/layout/LayoutAuth";
import LayoutPage from "~/layout/LayoutPage";
import Error404 from "~/layout/Error404Page";

export async function loader({ request }: LoaderArgs) {
  return (await getUser(request)) ? redirect("/home") : null;
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

  const [, setFormData] = useState({
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
    <LayoutAuth>
      <div className="flex w-4/5 max-w-[450px] flex-col xl:max-w-[600px] xl:rounded-2xl xl:bg-white-100 xl:px-8 xl:py-6 xl:shadow-xl ">
        <h2 className="my-5 text-center text-3xl font-bold text-secondary-300">
          Hello Again !
        </h2>
        <p className="my-5 text-center text-8 text-black-light">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id repellat
          commodi quos accusantium assumenda mollitia.
        </p>
        <form
          method="post"
          action="/auth/google"
          className="center w-full py-2"
        >
          <Button
            action="google_auth"
            name="_action"
            type="submit"
            value="Login with Google"
            sx=" hover:text-secondary-300 w-full"
          >
            <img
              className="h-6 w-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            />
          </Button>
        </form>
        <Form method="post">
          <div className="flex flex-col gap-y-1">
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
          <div className="flex justify-between px-2 text-7">
            <Checkbox label="Remember me" name="rememberMe" />
            <p className="font-bold text-secondary-400">Forgot password ?</p>
          </div>
          <div className="center my-6 flex gap-x-6 ">
            <Button
              type="submit"
              value="Login"
              sx="w-3/4 bg-secondary-400 text-white-200 hover:bg-secondary-300"
            >
              <LoginIcon />
            </Button>
          </div>
        </Form>
        {actionData?.error && (
          <div className="text-red-600 center w-full gap-x-4 px-2 py-1 text-center text-8 font-semibold text-red">
            <ErrorIcon />
            <p>{actionData?.error}</p>
          </div>
        )}
        <p className="mt-4 self-center xl:absolute xl:bottom-2 xl:left-1/2 xl:-translate-x-1/2 ">
          Don't have account ?
          <span className="px-1 text-center font-bold text-secondary-300">
            <Link to="/signup"> Sign up</Link>
          </span>
        </p>
      </div>
    </LayoutAuth>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (!isRouteErrorResponse(error)) {
    if (error.status === 500) {
      return (
        <LayoutPage>
          <h2>Something went wrong ... try again later</h2>
        </LayoutPage>
      );
    }
  }

  if (error.status === 404) {
    return <Error404 />;
  }
}
