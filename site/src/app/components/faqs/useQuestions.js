import { useEffect, useState } from "react";
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
				// console.log("Fetched questions:", data[0].faqs); // Check the fetched data
				if (isMounted) {
					setQuestions(data[0].faqs);
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
