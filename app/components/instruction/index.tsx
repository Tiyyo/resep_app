import CloseIcon from "~/assets/icons/CloseIcon";
import type { InstructionProps } from "./interface";

export default function Instruction({ index, remove }: InstructionProps) {
  // non stable cause re-render and reset textarea value
  // const id = Math.floor(Math.random() * 1000);

  return (
    <div key={index}>
      <div className="flex justify-between px-2">
        <p>Step {index + 1}</p>
        <div
          data-index={index}
          onClick={remove}
          className="cursor-pointer transition-all hover:text-secondary-300"
        >
          <CloseIcon size="6" />
        </div>
      </div>
      <textarea
        className="`pl-2 w-96 resize-none rounded-md bg-main-300 pr-1 text-8 placeholder:pl-1 placeholder:text-7 focus-visible:outline-secondary-300"
        key={index}
        name="instructions"
        rows={4}
      ></textarea>
    </div>
  );
}
