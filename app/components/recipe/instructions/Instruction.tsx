export interface InstructionProps {
  index: number;
  text: string;
}

export default function Instruction({ index, text }: InstructionProps) {
  return (
    <div
      key={index}
      className="flex items-center rounded-lg bg-main-100 py-4 shadow-facebook"
    >
      <p className="h-fit min-w-[50px] -rotate-90 p-0.5 py-2 text-7 font-semibold text-text-accent ">
        Step {index + 1}
      </p>
      <li className="px-2 py-1 text-8 ">{text}</li>
    </div>
  );
}
