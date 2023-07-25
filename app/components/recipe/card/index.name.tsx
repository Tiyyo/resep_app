export default function CardRecipeName({
  recipeName,
  variant,
}: {
  recipeName: string;
  variant?: string;
}) {
  return (
    <div
      className={`text-10 font-semibold ${
        variant === "horizontal" ? "min-h-12" : ""
      }`}
    >
      {recipeName}
    </div>
  );
}
