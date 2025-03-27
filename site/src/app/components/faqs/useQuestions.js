import { useState, useEffect } from "react";
import { getQuestions } from "./getQuestions";

export default function useQuestions() {
	const [questions, setQuestions] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		let isMounted = true;

		const fetchQuestions = async () => {
			try {
				const data = await getQuestions();
				if (isMounted) {
					setQuestions(data);
					setIsLoading(false);
				}
			} catch (err) {
				if (isMounted) {
					setError(err);
					setIsLoading(false);
				}
			}
		};

		fetchQuestions();

		return () => {
			isMounted = false;
		};
	}, []);

	return { questions, isLoading, error };
}