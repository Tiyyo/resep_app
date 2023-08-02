

export default function FieldForm({nameInput, type, onChange, variant, value, label, placeholder} : FormField) {
  return (
    <div>
       <label htmlFor={nameInput}>{label}</label>
       <input type={type} name={nameInput} id={nameInput} value={value} className="" />
    </div>

  );
}