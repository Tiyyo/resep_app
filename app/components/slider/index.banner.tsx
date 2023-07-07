export default function BannerSlider({ title }: { title: string }) {
  return (
    <div className="aspect-2/1 h-52 flex-shrink-0">
      <img
        src={`/images/banner_${title?.toLowerCase()}.webp`}
        alt="banner"
        className=" object-cover rounded-2xl"
      />
    </div>
  );
}
