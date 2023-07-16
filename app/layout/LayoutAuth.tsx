import LayoutPage from "~/layout/LayoutPage";

export default function LayoutAuth({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LayoutPage>
      <div className="flex flex-col min-h-screen w-full bg-primary-100 xl:flex-row xl:max-w-[1200px] xl:center xl:mx-auto">
        <div className="h-[30vw] max-h-[450px] min-h-[200px] center xl:max-h-[850px] xl:h-[50vw]">
          <img
            src="/images/hero.png"
            alt=""
            className="object-cover h-full xl:object-contain"
          />
        </div>
        <div className="basis-10/12 flex flex-col items-center">
          <div className="text-center w-24 rounded-full overflow-hidden hidden">
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
