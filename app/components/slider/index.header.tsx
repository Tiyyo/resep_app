import ArrowLink from "../arrow_link";
import TitleLevel3 from "../title/TilteLevel3";
import { HeaderSliderProps } from "./interface";

export default function HeaderSlider({
  title,
  link,
  linkText,
}: HeaderSliderProps) {
  return (
    <div className="flex items-center justify-between px-4">
      <TitleLevel3 title={title ?? ""} />
      <ArrowLink text={linkText ?? ""} link={link ?? ""} />
    </div>
  );
}
