import { useState, useEffect } from "react";

export function useGetFeatureProducts() {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?filter[isFeatured][$eq]=true&populate=*`;
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
                console.error("Error fetching featured products:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [url]);

    return { result, loading, error };
}