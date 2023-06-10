import type{ ErrorProps } from "./interface";

export default function Error({ message }: ErrorProps) {
  return (
    <div className="text-secondary-300 text-8 font-semibold text-center">
      {message ? (
        <>
          <div>{message}</div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
