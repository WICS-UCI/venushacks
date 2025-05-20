import { useEffect, useState } from "react";
import { getPartners } from "./getPartners";

export default function usePartners() {
	const [partners, setPartners] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let isMounted = true;

		const fetchPartners = async () => {
			try {
				const data = await getPartners();
				if (isMounted) {
					setPartners(data);
					setIsLoading(false);
				}
			} catch (err) {
				if (isMounted) {
					setError(err);
					setIsLoading(false);
				}
			}
		};

		fetchPartners();

		return () => {
			isMounted = false;
		};
	}, []);

	return { partners, isLoading, error };
}
