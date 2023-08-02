import { ReactNode } from "react";

interface InputWithIcon {
  unit?: string;
  name?: string;
  children: ReactNode;
}

export default function InputWithIcon({ unit, name, children }: InputWithIcon) {
  return (
    <div className="flex items-center justify-center text-7 gap-2.5">
      <div className="rounded-full text-text-200 flex items-center justify-center h-10 w-10 bg-primary-300 p-2 text-7 gap-2.5">
        {children}
      </div>
      <p>
        <span>
          <input type="number" />
        </span>
        {unit}
      </p>
    </div>
  );
}
