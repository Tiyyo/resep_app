import { useFetcher } from "@remix-run/react";
import { useEffect, useState } from "react";

export default function useProfileData() {
    const [data, setData] = useState<{ admin: boolean, profile: any, state : 'idle' | 'loaded'| 'isLoading' }>({ admin: false, profile: null, state : 'idle' });
    const fetcher = useFetcher();

    useEffect(() => {
        setData((prevState) => {
            return {
                ...prevState,
                state : 'isLoading'
            };
        });
        if (fetcher.state === "idle" && fetcher.data == undefined) {
            fetcher.load("/api/profile");
        }
        if (fetcher.data) {
            setData((prevState) => {
                return {
                    ...prevState,
                    admin: fetcher.data.admin,
                    profile: fetcher.data.profile,
                    state : "loaded"
                };
            });
        }
    }, [fetcher]);
    return data;
}