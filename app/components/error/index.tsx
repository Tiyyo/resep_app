export default function Error({ message }: { message: string }) {
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
