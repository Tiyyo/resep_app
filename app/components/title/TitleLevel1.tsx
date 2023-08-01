import capitalize from "~/utils/capitalize";

export default function TitleLevel1({ title }: { title: string }) {
  return (
    <h1 className="mb-4 mt-8 pl-5 text-4xl font-bold">{capitalize(title)}</h1>
  );
}
