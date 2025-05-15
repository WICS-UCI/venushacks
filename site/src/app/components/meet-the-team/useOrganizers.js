import { useEffect, useState } from "react";
import { getOrganizers } from "./getOrganizers";

export default function useOrganizers() {
    const [organizers, setOrganizers] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const fetchOrganizers = async () => {
            try {
                const data = await getOrganizers();
                if (isMounted) {
                    setOrganizers(data);
                    setIsLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err);
                    setIsLoading(false);
                }
            }
        };

        fetchOrganizers();

        return () => {
            isMounted = false;
        };
    }, []);

    return { organizers, isLoading, error };
}
