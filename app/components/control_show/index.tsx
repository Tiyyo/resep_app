import ChevronDownIcon from "~/assets/icons/ChevronDownIcon";
import ChevronUpIcon from "~/assets/icons/ChevronUpIcon";

export default function ControlShow({variant} : {variant: 'more' | 'less'}) {

  return (
    <div className="flex items-center rounded-3xl bg-secondary-300 text-white-200 font-semibold shadow-xl text-7 px-3 py-2 cursor-pointer gap-x-2 mx-2">
        <p>{variant === 'more' ? "Show more" : "Show less"}</p>
        {variant === 'more' ? <ChevronDownIcon size="4"/> : <ChevronUpIcon size="4"/>}
    </div>
  );
}