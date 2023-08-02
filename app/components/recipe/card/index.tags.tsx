export default function CardRecipeTags({
  tags,
  variant,
}: {
  tags?: string[];
  variant?: string;
}) {
  if (!tags || tags.length === 0) return null;

  return (
    <>
      {variant === "horizontal" && (
        <div className="mt-4 flex-grow text-8 opacity-80">
          {tags.map((tag: string, index: number) => {
            return (
              <span key={index} className="capitalize">
                {" "}
                {tag}
                {""}
              </span>
            );
          })}
        </div>
      )}
    </>
  );
}
