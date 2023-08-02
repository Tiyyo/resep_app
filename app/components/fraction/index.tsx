export default function FractionContainer({
  denominator,
  numerator,
}: {
  denominator: number;
  numerator: number;
}) {
  return (
    <div className="flex justify-center h-8 max-h-8 text-8">
      <span className="self-start">{numerator}</span>
      <span className="self-center">/</span>
      <span className="self-end">{denominator}</span>
    </div>
  );
}
