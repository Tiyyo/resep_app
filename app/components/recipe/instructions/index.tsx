export default function InstructionsList({ instructions }: Instructions) {

  const reversedInstructions = [...instructions].reverse()
  return (
    <div className="flex text-text-accent flex-col list-none py-6">
      <div className="relative my-4">
        <div className="">
          Instructions
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        {reversedInstructions
          .map((itr: string, index: number) => {
            return (
              <div key={index} className="py-4 flex items-center bg-main-100 rounded-lg shadow-facebook">
                <p className="py-2 text-7 font-semibold text-text-accent p-0.5 -rotate-90 min-w-[50px] h-fit ">
                  Step {index + 1}
                </p>
                <li className="text-8 py-1 px-2 ">{itr}</li>
              </div>
            );
          })}
      </div>
    </div>
  );
}
