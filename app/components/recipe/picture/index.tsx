import ArrowLeftCircle from "~/assets/icons/ArrowLeftCircle";
import Bookmark from "~/assets/icons/Bookmark";

export default function Picture({ picture, author }: Picture) {
  return (
    <div
      className="relative w-full aspect-square max-h-header"
      style={{
        background: "url(" + picture + ") center no-repeat",
      }}
    >
      <div className="absolute top-3 right-2.5 ">
        <Bookmark />
      </div>
      <div className="absolute top-3 left-2.5">
        <ArrowLeftCircle outlineColor="black" />
      </div>
      <div className="absolute rounded-custom h-1/6 w-full bg-primary-100 left-0 bottom-0"></div>
      <div className="absolute right-6 bottom-10 py-1.5 pr-8 pl-2 backdrop-blur backdrop-grayscale-50 rounded-lg text-5 leading-none text-white-100">
        <p>recipe by </p>
        <p className="text-white-200 text-15">{author}</p>
      </div>
    </div>
  );
}
