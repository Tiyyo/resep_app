import type { ErrorProps } from "./interface";

export default function Error({ message }: ErrorProps) {
  return (
    <div className="text-center text-8 font-semibold text-secondary-300">
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
