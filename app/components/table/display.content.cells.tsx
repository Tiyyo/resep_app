import { numericFields } from "~/constants/unit.format";

export function displayContentToCells(
  key: string,
  d: any,
  image: boolean
): string | JSX.Element {
  if (key.toLowerCase() === "image" && image) {
    return (
      <div className="rounded-full overflow-hidden h-6 aspect-square">
        {d.image ? (
          <img src={d.image} alt="icon of an ingredient object-center" />
        ) : (
          ""
        )}
      </div>
    );
  }
  if (numericFields.includes(key.toLowerCase())) {
    return isNaN(Number(d[key])) ? d[key] : Number(d[key]).toFixed(1);
  }
  return d[key];
}
