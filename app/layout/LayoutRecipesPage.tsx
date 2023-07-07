export default function LayoutRecipePages({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="mx-auto flex flex-col max-w-[1325px]">
      <img
        src="/images/banner_recipe_page.webp"
        alt=""
        className="rounded-md"
      />
      <h1 className="text-4xl font-bold pl-5 mt-8 mb-4">{title}</h1>
      {children}
    </div>
  );
}
