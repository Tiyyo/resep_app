export default function InstructionsList({ instructions }: Instructions) {
  return (
    <div className="flex text-text-accent flex-col list-none text-justify">
      <div className="relative w-full bg-primary-200 h-20">
        <div className="absolute rounded-custom w-full  bottom-0 flex items-end p-4 h-20 bg-secondary-200">
          Instructions
        </div>
      </div>
      <div className="p-4 bg-secondary-200">
        {instructions.map((itr: string, index: number) => {
          return (
            <div key={index} className="py-4 ">
              <p className="text-7 text-text-accent_soft p-0.5">
                Step {index + 1}
              </p>
              <li className="text-8">{itr}</li>
            </div>
          );
        })}
      </div>
    </div>
  );
}
