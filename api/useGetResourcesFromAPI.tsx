import { useState, useEffect } from "react";

export function useGetResourcesFromAPI(resource: string, query?: string) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${resource}?${query ? query : "populate=*"}`;
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(url);
                const json = await res.json();
                setResult(json.data);
            } catch (err: any) {
                console.error(`Error fetching from API ${url} :`, err);
                setError(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [url]);

    return { result, loading, error };
}