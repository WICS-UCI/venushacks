import { useEffect, useState } from "react";
import { getWorkshops } from "./getWorkshops";

export default function useWorkshops() {
	const [workshops, setWorkshops] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let isMounted = true;

		const fetchWorkshops = async () => {
			try {
				const data = await getWorkshops();
				if (isMounted) {
					setWorkshops(data);
					setIsLoading(false);
				}
			} catch (err) {
				if (isMounted) {
					setError(err);
					setIsLoading(false);
				}
			}
		};

		fetchWorkshops();

		return () => {
			isMounted = false;
		};
	}, []);

	return { workshops, isLoading, error };
}
