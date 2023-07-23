import { ReactNode } from "react";

interface InputWithIcon {
  unit?: string;
  name?: string;
  children: ReactNode;
}

export default function InputWithIcon({ unit, name, children }: InputWithIcon) {
  return (
    <div className="flex items-center justify-center gap-2.5 text-7">
      <div className="flex h-10 w-10 items-center justify-center gap-2.5 rounded-full bg-primary-300 p-2 text-7 text-text-200">
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
