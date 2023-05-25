import { Outlet} from "@remix-run/react";
import LayoutPage from "~/components/layout/LayoutPage";

export default function Login() {
  return (
    <LayoutPage>
      <main className="h-full center">
        <div className="flex w-8/12 bg-secondary-100 max-w-6xl h-3/4 rounded-xl overflow-hidden text-8">
          <div className="basis-6/12 border"></div>
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
