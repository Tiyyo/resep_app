export default function Label({ label }: { label: string }) {
  return (
    <div className=" w-fit rounded-lg bg-secondary-300 px-2 py-1 text-7 font-semibold text-white-100">
      {label}
    </div>
  );
}
