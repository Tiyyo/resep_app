import BrushOne from "~/assets/brush/UnderlineBrush";

export default function TitleLogo({ sx }: { sx?: string }) {
  return (
    <div className="relative col-start-2 col-end-3 row-start-1 place-self-center text-2xl font-bold">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-secondary-400 opacity-70 xl:opacity-90">
        <BrushOne />
      </div>
      <p className={`relative -top-1 z-10 -rotate-3 text-10 xl:text-15 ${sx}`}>
        <span>r</span>
        <span>e</span>
        <span>s</span>
        <span className="scale-x-flip">e</span>
        <span>p</span>
      </p>
    </div>
  );
}
