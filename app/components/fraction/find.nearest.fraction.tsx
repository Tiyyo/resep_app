import Fraction from "fraction.js";
import FractionContainer from "~/components/fraction";

export default function findNearestFraction(number: number, tape: number) {
  const fraction = new Fraction(
    Math.round(tape * new Fraction(number).valueOf()),
    tape
  );
  if (fraction.d === 1) return fraction.n;
  return <FractionContainer denominator={fraction.d} numerator={fraction.n} />;
}
