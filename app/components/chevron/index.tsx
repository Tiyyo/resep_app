import ChevronIcon from "~/assets/icons/ChevronIcon";


export default function Chevron({state} : {state? :boolean}) {

  return (
    <div className={state ? 'rotate-90 transition-transform cursor-pointer' : 'rotate-0 transition-transform cursor-pointer'}>
      <ChevronIcon />
    </div>
  );
}