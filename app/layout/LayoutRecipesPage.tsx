import TitleLevel1 from "~/components/title/TitleLevel1";

export default function LayoutRecipePages({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="mx-auto flex  max-w-[1325px] flex-col">
      <img
        src="/images/banner_recipe_page.webp"
        alt=""
        className="hidden rounded-md xl:block"
      />
      <TitleLevel1 title={title} />
      {children}
      <div className="h-14"></div>
    </div>
  );
}
