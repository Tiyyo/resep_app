import { Outlet} from "@remix-run/react";
import LayoutPage from "~/layout/LayoutPage";

export default function Login() {
  return (
    <LayoutPage>
      <main className="h-full center">
        <div className="flex w-8/12 max-w-6xl h-3/4 rounded-xl overflow-hidden text-8 shadow-2xl">
          <div className="basis-6/12 border center bg-secondary-200 ">
            <img src="/images/hero.png" alt="" className="object-cover w-full" />
          </div>
          <div className="relative basis-6/12 flex justify-start pt-7  flex-col bg-white-100 h-full w-full center ">
              <div className="text-center w-24 rounded-full overflow-hidden">
                <img className="w-full"src="/images/29372253_coking_23.jpg" alt="company logo" />
              </div>
            <Outlet />
          </div>
        </div>
      </main>
    </LayoutPage>
  );
}
