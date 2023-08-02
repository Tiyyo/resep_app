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
import UserIcon from "~/assets/icons/UserIcon";
import Button from "~/components/button";
import Checkbox from "~/components/checkbox";
import { FormField } from "~/components/form_field";
import { withZod } from "@remix-validated-form/with-zod";
import { validationError } from "remix-validated-form";
import * as Z from "zod";
import type { ActionArgs } from "@remix-run/node";
import { register } from "~/service/auth.server";
import LayoutAuth from "~/layout/LayoutAuth";
import LayoutPage from "~/layout/LayoutPage";
import Error404 from "~/layout/Error404Page";

export const validator = withZod(
  Z.object({
    username: Z.string()
      .min(4, { message: "Must be at least 4 characters long" })
      .max(24, { message: "Must be 24 of fewer characters long" })
      .trim()
      .toLowerCase(),
    email: Z.string().email({ message: "This is not an valid email" }),
    password: Z.string()
      .min(8, { message: "Must contains at least 8 characters" })
      .max(24, { message: "Must be 24 or fewer characters long" })
      .trim()
      .refine((value) => /\w*[a-z]\w*/.test(value), {
        message: "Must contain one lowercase",
      })
      .refine((value) => /\w*[A-Z]\w*/.test(value), {
        message: "Must contain one uppercase",
      })
      .refine((value) => /\d/.test(value), {
        message: "Must contain one number",
      })
      .refine((value) => /[ `!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(value), {
        message: "Must containe one special character",
      }),
    confirmedPassword: Z.string(),
    termsAndService: Z.string().transform((value) => value === "on"),
  }).refine((data) => data.password === data.confirmedPassword, {
    message: "Passwords don't match !",
    path: ["confirm"],
  })
);

export async function action({ request }: ActionArgs) {
  const data = await validator.validate(await request.formData());
  if (data.error) return validationError(data.error);

  const { username, email, password } = data.data;

  return await register({ username, email, password });
}

export default function () {
  const actionData = useActionData();

  console.log(actionData);

  const [formData, setFormData] = useState({
    username: "",
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
      <Form
        method="post"
        className="flex w-4/5 max-w-[450px] flex-col xl:max-w-[600px] xl:rounded-2xl xl:bg-white-100 xl:px-8 xl:py-6 xl:shadow-xl"
      >
        <h2 className="my-5 text-center text-3xl font-bold text-secondary-300">
          Sign up for free !
        </h2>
        <p className="my-5 text-center text-8 text-black-light">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id repellat
          commodi quos accusantium assumenda mollitia.
        </p>
        <div className="flex flex-col gap-y-2">
          <FormField
            type="text"
            htmlFor="username"
            label="Username"
            onChange={(e) => handleInputChange(e, "username")}
            error={actionData?.fieldErrors?.username}
          >
            <UserIcon />
          </FormField>
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
          <FormField
            htmlFor="confirmedPassword"
            label="Confirm your password"
            type="password"
            onChange={(e) => handleInputChange(e, "password")}
            error={actionData?.fieldErrors?.confirm}
          ></FormField>
        </div>
        <div className="flex justify-between px-2 text-7">
          <Checkbox
            label="I confirm that I have read and agree to FreshBooks Terms of Service and Privacy Policy."
            name="termsAndService"
            error={actionData?.fieldErrors?.termsAndService}
          />
        </div>
        <div className="center my-6 flex gap-x-6 ">
          <Button
            type="submit"
            value="Sign up"
            sx="w-3/4 bg-secondary-400 text-white-200 hover:bg-secondary-300"
          >
            <LoginIcon />
          </Button>
        </div>
        <p className="mt-4 self-center xl:absolute xl:bottom-2 xl:left-1/2 xl:-translate-x-1/2 ">
          Already have an account ?
          <span className="px-1 font-bold text-secondary-300">
            <Link to="/login">Log in</Link>
          </span>
        </p>
      </Form>
    </LayoutAuth>
  );
}

// Make a component for the error page handling
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
