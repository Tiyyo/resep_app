export default function Label({ label }: { label: string }) {
  return (
    <div className=" rounded-lg text-7 font-semibold bg-secondary-300 py-1 px-2 w-fit text-white-100">
      {label}
    </div>
  );
}
