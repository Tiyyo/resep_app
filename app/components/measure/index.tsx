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
    <fieldset key={index} className="flex gap-x-4">
      <div className="basis-[300px]">
        <SelectSearch
          data={ingredients}
          index="id"
          filterBy="name"
          name="ingredient"
          placeholder="Pick an ingredient"
          clear={clear}
        />
      </div>
      <div className="shrink-0 grow-0 basis-[80px]">
        <Input name="quantity" width="14" placeholder="qty" />
      </div>
      <div className="shrink-0 grow-0 basis-[125px]">
        <SelectSearch
          data={units}
          index="id"
          filterBy="abreviation"
          name="unit"
          placeholder=""
          clear={clear}
        />
      </div>
      <div
        className="basis-12  cursor-pointer place-self-center transition-all hover:text-secondary-300"
        data-index={index}
        onClick={remove}
      >
        <CloseIcon size="6" />
      </div>
    </fieldset>
  );
}
