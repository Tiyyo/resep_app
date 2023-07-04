import { useId, useState } from "react";
import Tag from "../tag";

export default function TagsGenerator() {
  const [tags, setTags] = useState<string[]>([]);
  const id = useId();

  const addOneTag = (inputValue: string) => {
    setTags((prevState) => [...prevState, inputValue]);
  };

  const removeTag = (e: React.MouseEvent<HTMLElement>) => {
    const index = e.currentTarget.dataset.index;
    const copy = [...tags];
    if (index) {
      const convertIndex = parseInt(index, 10);
      copy.splice(convertIndex, 1);
      setTags(copy);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.code.toLowerCase() === "enter" &&
      (e.target as HTMLInputElement)?.value?.length >= 1
    ) {
      e.preventDefault();
      addOneTag((e.target as HTMLInputElement)?.value.trim());
      (e.target as HTMLInputElement).value = "";
    }
  };

  return (
    <>
      <input
        type="text"
        name="addTag"
        id="addTag"
        placeholder="Add a new tag"
        width="24"
        onKeyDown={handleKeyPress}
        className="pl-2 pr-1 text-8 h-9 bg-main-300 rounded-md placeholder:pl-1 placeholder:text-7 focus-visible:outline-secondary-300"
      />
      <p className="text-7 opacity-80">
      You can include tags such as the recipe's country of origin and its main ingredients. eg: for pasta carbonara Tags: Italy, Pasta, Pork.
      </p>
      <div className="flex flex-wrap gap-1 w-1/2">
        {tags.map((tag, index) => {
          return (
            <Tag key={id + index} value={tag} index={index} removeTag={removeTag} />
          );
        })}
      </div>
    </>
  );
}
