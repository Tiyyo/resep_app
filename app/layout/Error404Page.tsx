import { useNavigate } from "@remix-run/react";

export default function Error404() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <div className="center flex min-h-screen flex-col bg-primary-100">
      <div>
        <img src="/images/404_error_illustration.svg" alt="404 illustration" />
        <div className="flex flex-col items-center gap-y-4">
          <p className="text-4xl font-semibold text-text-accent">
            Ooops ... Something went wrong
          </p>
          <button
            type="button"
            className="w-1/2 rounded-xl bg-secondary-200 px-6 py-2 duration-300 hover:bg-opacity-70"
            onClick={handleClick}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}
