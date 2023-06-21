import type{ AddButtonProps } from "./interface";


export default function AddButton({children, value,  condition, type, addStyle , onClick} : AddButtonProps) {
  return (
    <>
    <p className="text-7 my-2">{condition ? "(" + condition  + ")" : ""}</p>
    <button type={type} onClick={onClick} className={`flex items-center gap-x-8 px-4 py-2 rounded-lg font-bold text-8 mb-8 hover:shadow  transition duration-150 tracking-wide ${addStyle}`}>
        {value}
        <div className="text-secondary-300">
            {children}
        </div>
      
    </button>
    </>
  );
}