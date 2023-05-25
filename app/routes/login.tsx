import { Link, Outlet, useActionData } from "@remix-run/react";
import { useState } from "react";
import AtIcon from "~/assets/icons/AtIcon";
import EyeIcon from "~/assets/icons/Eye";
import EyeIconn from "~/assets/icons/Eye";
import EyeSlash from "~/assets/icons/EyeSlash";
import Checkbox from "~/components/checkbox";
import { FormField } from "~/components/form_field";
import LayoutPage from "~/components/layout/LayoutPage";

export default function Login() {
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
    <LayoutPage>
      <main className="h-full center">
        <div className="flex w-8/12 bg-secondary-100 max-w-6xl h-2/3 rounded-xl overflow-hidden text-8">
          <div className="basis-6/12 border"></div>
          <div className="relative basis-6/12 flex justify-start pt-7  flex-col bg-white-100 h-full w-full center ">
              <div className="text-center w-24 rounded-full overflow-hidden">
                <img className="w-full"src="/images/29372253_coking_23.jpg" alt="" />
              </div>
            <form className="w-4/5">
              <h2 className="text-3xl font-bold text-secondary-300 my-5 text-center">
                Hello Again !
              </h2>
              <p className="text-center text-black-light text-8 my-5">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id repellat commodi quos accusantium assumenda mollitia.</p>
              <div className="flex flex-col">
                <FormField
                  htmlFor="email"
                  label="email"
                  type="text"
                  onChange={(e) => handleInputChange(e, "email")}
                  error={""}
                >
                  <AtIcon />
                </FormField>
                <FormField
                  htmlFor="password"
                  label="password"
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
              <div className="flex gap-x-6 center my-6">
                <button type="submit" className="basis-1/2 center px-4 py-2 border flex gap-2 border-slate-200 rounded-lg text-center text-white-100 bg-secondary-400 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                  <span className="text-center">Login</span>
                </button>
                <button type="button" className="basis-1/2 px-4 py-2 border flex items-center gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                  <img
                    className="w-6 h-6"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    loading="lazy"
                    alt="google logo"
                  />
                  <span className="text-7">Login with Google</span>
                </button>
              </div>
              <p className="absolute bottom-2 left-1/2 -translate-x-1/2">
                Don't have account ?
                <span className="text-secondary-400 font-bold">
                  <Link to="/signup"> Sign Up</Link>
                </span>
              </p>
            </form>
            <Outlet />
          </div>
        </div>
      </main>
    </LayoutPage>
  );
}
