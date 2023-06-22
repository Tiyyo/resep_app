import CloseIcon from "~/assets/icons/CloseIcon";
import type { InstructionProps } from "./interface";


export default function Instruction({ index, remove} : InstructionProps ) {
const id = Math.floor(Math.random() * 1000);
  return (
    <div key={index + id}>
      <div className="flex justify-between px-2">
        <p>Step {index + 1}</p>
        <div
          data-index={index}
          onClick={remove}
          className="cursor-pointer hover:text-secondary-300 transition-all"
        >
          <CloseIcon size="6" />
        </div>
      </div>
      <textarea
        className="`pl-2 pr-1 text-8 w-96 bg-main-300 rounded-md placeholder:pl-1 placeholder:text-7 focus-visible:outline-secondary-300 resize-none"
        key={index}
        name="instructions"
        rows={4}
      ></textarea>
    </div>
  );
}
