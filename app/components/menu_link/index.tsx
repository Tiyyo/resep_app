import type { MenuLinkProps } from "./interface";

export default function MenuLink({ active, item, level }: MenuLinkProps) {

  return (
    <div
      className={
        active
          ? "text-secondary-300 flex items-center justify-start gap-x-1 font"
          : "flex items-center justify-start gap-x-1 font"
      }
    >
      {item.icon ? <div>{item.icon({ size: "5" })}</div> : ""}
      <p className={level === 1 ? "font-semibold" : "font-normal"}>
        {item.name}
      </p>
    </div>
  );
}
