import type { MenuLinkProps } from "./interface";

export default function MenuLink({ active, item, level }: MenuLinkProps) {
  return (
    <div
      className={
        active
          ? "font flex items-center justify-start gap-x-1 text-secondary-300"
          : "font flex items-center justify-start gap-x-1"
      }
    >
      {item.icon ? <div>{item.icon({ size: "5" })}</div> : ""}
      <p className={level === 1 ? "font-semibold" : "font-normal"}>
        {item.name}
      </p>
    </div>
  );
}
