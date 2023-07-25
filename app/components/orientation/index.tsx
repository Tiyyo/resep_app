export default function OrientationScreen() {
  return (
    <div className="center h-full w-full flex-col gap-y-6 xl:hidden">
      <p className="text-12 text-center font-semibold">
        You need a larger screen to display this page
      </p>
      <img
        src="/images/orientation_rotation_screen_icon.png"
        alt="orientation screen icon to request a larger screen "
        className="w-18"
      />
    </div>
  );
}
