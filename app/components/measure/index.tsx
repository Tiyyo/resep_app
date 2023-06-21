import CloseIcon from "~/assets/icons/CloseIcon";
import Input from "../input";
import SelectSearch from "../select_search";
import type{ MeasureProps } from "./interface";

export default function Measure({index , ingredients, clear , units, remove} : MeasureProps) {
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
      <div className="basis-[80px] shrink-0 grow-0">
        <Input name="quantity" width="14" placeholder="qty" />
      </div>
      <div className="basis-[125px] shrink-0 grow-0">
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
        className="basis-12  place-self-center cursor-pointer hover:text-secondary-300 transition-all"
        data-index={index}
        onClick={remove}
      >
        <CloseIcon size="6" />
      </div>
    </fieldset>
  );
}
