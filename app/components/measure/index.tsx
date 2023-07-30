import CloseIcon from "~/assets/icons/CloseIcon";
import Input from "../input";
import SelectSearch from "../select_search";
import type { MeasureProps } from "./interface";

export default function Measure({
  index,
  ingredients,
  clear,
  units,
  remove,
}: MeasureProps) {
  return (
    <fieldset
      key={index}
      className="text:7 border-t-secondary mx-auto flex w-full max-w-[80%] flex-col justify-center gap-2 border-b-secondary-400 border-t-secondary-400 py-4 sm:flex-row sm:text-10"
    >
      <div className="order-2 sm:order-1 sm:basis-[300px]">
        <SelectSearch
          data={ingredients}
          index="id"
          filterBy="name"
          name="ingredient"
          placeholder="Pick an ingredient"
          clear={clear}
        />
      </div>
      <div className="order-3 flex justify-evenly sm:order-2">
        <div className="shrink-0 grow-0 sm:basis-[80px]">
          <Input name="quantity" width="14" placeholder="qty" />
        </div>
        <div className="grow-0 sm:shrink-0 sm:basis-[125px]">
          <SelectSearch
            data={units}
            index="id"
            filterBy="abreviation"
            name="unit"
            placeholder=""
            clear={clear}
          />
        </div>
      </div>
      <div
        className="order-1 cursor-pointer place-self-center self-end transition-all hover:text-secondary-300 sm:order-3 sm:basis-12"
        data-index={index}
        onClick={remove}
      >
        <CloseIcon size="6" />
      </div>
    </fieldset>
  );
}
