import { useEffect } from "react";
import { toast } from "react-hot-toast";

export function Toast({ message }: { message: string }) {
    useEffect(() => {
        if (message && message.includes("Succes")) {
            toast.success(message);
        }
    }, [message]);
    return <></>;
}
