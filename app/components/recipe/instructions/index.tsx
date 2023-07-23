import TitleLevel3 from "~/components/title/TilteLevel3";
import type { InstructionsListProps } from "./interface";
import Instruction from "./Instruction";

export default function InstructionsList({
  instructions,
}: InstructionsListProps) {
  const reversedInstructions = [...instructions].reverse();
  return (
    <div className="flex list-none flex-col text-text-accent">
      <TitleLevel3 title="Instructions" />
      <div className="flex flex-col gap-y-4">
        {reversedInstructions.map((itr: string, index: number) => {
          return <Instruction index={index} text={itr} key={index} />;
        })}
      </div>
    </div>
  );
}
