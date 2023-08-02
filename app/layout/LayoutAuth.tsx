import LayoutPage from "~/layout/LayoutPage";

export default function LayoutAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutPage>
      <div className="xl:center flex min-h-screen w-full flex-col bg-primary-100 xl:mx-auto xl:max-w-[1200px] xl:flex-row">
        <div className="center h-[30vw] max-h-[450px] min-h-[200px] xl:h-[50vw] xl:max-h-[850px]">
          <img
            src="/images/hero.png"
            alt=""
            className="h-full object-cover xl:object-contain"
          />
        </div>
        <div className="flex basis-10/12 flex-col items-center">
          <div className="hidden w-24 overflow-hidden rounded-full text-center">
            <img
              className="w-full"
              src="/images/29372253_coking_23.jpg"
              alt="company logo"
            />
          </div>
          {children}
        </div>
      </div>
    </LayoutPage>
  );
}

{
  /* <main className="h-full min-h-screen center ">
<div className="flex w-8/12  h-5/6 rounded-xl overflow-hidden text-8 shadow-2xl">
  <div className="basis-6/12 border center bg-secondary-200 ">
    <img
      src="/images/hero.png"
      alt=""
      className="object-cover w-full"
    />
  </div>
  <div className="relative basis-6/12 flex justify-start pt-7 flex-col bg-white-100 h-full w-full center ">
    <div className="text-center w-24 rounded-full overflow-hidden">
      <img
        className="w-full"
        src="/images/29372253_coking_23.jpg"
        alt="company logo"
      />
    </div>
    {children}
  </div>
</div>
</main> */
}
