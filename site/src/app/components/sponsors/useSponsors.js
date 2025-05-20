import { useEffect, useState } from "react";
import { getSponsors } from "./getSponsors";

export default function useSponsors() {
	const [sponsors, setSponsors] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let isMounted = true;

		const fetchSponsors = async () => {
			try {
				const data = await getSponsors();
				if (isMounted) {
					setSponsors(data);
					setIsLoading(false);
				}
			} catch (err) {
				if (isMounted) {
					setError(err);
					setIsLoading(false);
				}
			}
		};

		fetchSponsors();

		return () => {
			isMounted = false;
		};
	}, []);

	return { sponsors, isLoading, error };
}
