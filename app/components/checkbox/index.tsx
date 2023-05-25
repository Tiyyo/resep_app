import type { CheckboxProps } from "./interface";

export default function Checkbox({label, onChange} : CheckboxProps) {
  return (
    <>
      <label className="label cursor-pointer flex items-center">
        <input type="checkbox" className="checkbox" onChange={onChange} name={label}/>
        <span className="label-text pl-2">{label}</span>
      </label>
    </>
  );
}
