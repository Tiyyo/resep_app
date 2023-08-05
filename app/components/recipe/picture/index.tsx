import ArrowLeftCircle from "~/assets/icons/ArrowLeftCircle";
import Bookmark from "~/assets/icons/Bookmark";
import type { Picture } from "./interface";

export default function Picture({ picture, author }: Picture) {
  return (
    <div
      className="relative aspect-square max-h-header w-full"
      style={{
        background: "url(" + picture + ") center no-repeat",
      }}
    >
      <div className="absolute right-2.5 top-3 ">
        <Bookmark />
      </div>
      <div className="absolute left-2.5 top-3">
        <ArrowLeftCircle outlineColor="black" />
      </div>
      <div className="absolute bottom-0 left-0 h-1/6 w-full rounded-custom bg-primary-100"></div>
      <div className="absolute bottom-10 right-6 rounded-lg py-1.5 pl-2 pr-8 text-5 leading-none text-white-100 backdrop-blur backdrop-grayscale-50">
        <p>recipe by </p>
        <p className="text-15 text-white-200">{author}</p>
      </div>
    </div>
  );
}
