export interface InstructionProps {
  index: number;
  text: string;
}

export default function Instruction({ index, text }: InstructionProps) {
  return (
    <div
      key={index}
      className="py-4 flex items-center bg-main-100 rounded-lg shadow-facebook"
    >
      <p className="py-2 text-7 font-semibold text-text-accent p-0.5 -rotate-90 min-w-[50px] h-fit ">
        Step {index + 1}
      </p>
      <li className="text-8 py-1 px-2 ">{text}</li>
    </div>
  );
}
