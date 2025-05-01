import { useEffect, useState } from "react";
import { getSchedule } from "./getSchedule";

export default function useSchedule() {
	const [schedule, setSchedule] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let isMounted = true;

		const fetchSchedule = async () => {
			try {
				const data = await getSchedule();
				if (isMounted) {
					setSchedule(data);
					setIsLoading(false);
				}
			} catch (err) {
				if (isMounted) {
					setError(err);
					setIsLoading(false);
				}
			}
		};

		fetchSchedule();

		return () => {
			isMounted = false;
		};
	}, []);

	return { schedule, isLoading, error };
}
