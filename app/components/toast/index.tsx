import { useEffect } from "react";
import { toast } from "react-hot-toast";

export function Toast({ message }: { message?: string }) {
  useEffect(() => {
    if (message && message.includes("Succes")) {
      toast.success(message);
    }
    if (message && message.includes("Forbidden")) {
      toast.error(message);
    }
  }, [message]);
  return <></>;
}
