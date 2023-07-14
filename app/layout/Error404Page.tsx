import { useNavigate } from "@remix-run/react";

export default function Error404() {
    const navigate = useNavigate();

    const handleClick = () => {
        {
            navigate(-1);
        }
    };

    return (
        <div className="bg-primary-100 min-h-screen flex flex-col center">
            <div>
                <img
                    src="/images/404_error_illustration.svg"
                    alt="404 illustration"
                />
                <div className="flex flex-col gap-y-4 items-center">
                    <p className="text-4xl font-semibold text-text-accent">
                        Ooops ... Something went wrong
                    </p>
                    <button
                        type="button"
                        className="rounded-xl bg-secondary-200 py-2 px-6 w-1/2 hover:bg-opacity-70 duration-300"
                        onClick={handleClick}
                    >
                        Try again
                    </button>
                </div>
            </div>
        </div>
    );
}
