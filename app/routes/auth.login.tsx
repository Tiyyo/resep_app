import { Link, useActionData } from "@remix-run/react";
import { useState } from "react";
import AtIcon from "~/assets/icons/AtIcon";
import EyeIcon from "~/assets/icons/Eye";
import EyeSlash from "~/assets/icons/EyeSlash";
import LoginIcon from "~/assets/icons/LoginIcon";
import Button from "~/components/button";
import Checkbox from "~/components/checkbox";
import { FormField } from "~/components/form_field";

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
    <form className="w-4/5">
    <h2 className="text-3xl font-bold text-secondary-300 my-5 text-center">
      Hello Again !
    </h2>
    <p className="text-center text-black-light text-8 my-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id repellat commodi quos accusantium assumenda mollitia.</p>
    <div className="flex flex-col">
      <FormField
        htmlFor="email"
        label="Email"
        type="text"
        onChange={(e) => handleInputChange(e, "email")}
        error={""}
      >
        <AtIcon />
      </FormField>
      <FormField
        htmlFor="password"
        label="Password"
        type="password"
        subIcon={<EyeSlash/>}
        onChange={(e) => handleInputChange(e, "password")}>
          <EyeIcon/>
      </FormField>
    </div>
    <div className="text-7 flex justify-between px-2">
      <Checkbox label="Remember me" name="remenberMe" />
      <p className="text-secondary-400 font-bold">
        Forgot password ?
      </p>
    </div>
    <div className="flex gap-x-6 center my-6 ">
      <Button type="submit" value="Login" sx="basis-1/2 bg-secondary-400 text-white-200 hover:bg-secondary-300">
        <LoginIcon/>
      </Button>
      <Button type="button" value="Login with Google" sx="basis-1/2   hover:text-secondary-300 ">
      <img
          className="w-6 h-6"
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          loading="lazy"
          alt="google logo"
        />
      </Button>
    </div>
    <p className="absolute bottom-2 left-1/2 -translate-x-1/2">
      Don't have account ?
      <span className="text-secondary-300 font-bold">
        <Link to="/auth/signup"> Sign up</Link>
      </span>
    </p>
  </form>
  );
}