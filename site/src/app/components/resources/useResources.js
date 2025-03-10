import { useState, useEffect } from "react";
import { getResources } from "./getResources";

export default function useResources() {
	const [resources, setResources] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let isMounted = true;

		const fetchResources = async () => {
			try {
				const data = await getResources();
				if (isMounted) {
					setResources(data);
					setIsLoading(false);
				}
			} catch (err) {
				if (isMounted) {
					setError(err);
					setIsLoading(false);
				}
			}
		};

		fetchResources();

		return () => {
			isMounted = false;
		};
	}, []);

	return { resources, isLoading, error };
}
