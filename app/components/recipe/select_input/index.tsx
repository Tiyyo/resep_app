export default function SelectInput ({nameInput, label, options,  } : SelectInput) {

  return (
    <div>
      <label htmlFor={nameInput}>{label}</label>
      <select name={nameInput} className="select select-bordered">
        <option value="">Pick a {nameInput}</option>
        {options.map((o) => (<option key={o.id} value={o.id}>{o.name}</option>))}
      </select>
    </div>
  );
}