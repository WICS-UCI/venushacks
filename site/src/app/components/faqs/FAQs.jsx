import { Accordion } from "react-bootstrap";

import faq_data from "./FAQs.json";
import SingleFAQ from "./SingleFAQ";
import useQuestions from "./useQuestions";

import "./FAQs.scss";

export default function FAQs() {
	const { questions, isLoading, error } = useQuestions();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	if (!questions) return <div>No faqs found</div>;
	return (
		<div id="faq-accordion-wrapper">
			{/* One accordion, one faq can be open at a time */}
			<div id="faq-accordion">
				<Accordion>
					{questions.map((faq, i) => (
						<SingleFAQ key={i} data={faq} index={i} />
					))}
				</Accordion>
			</div>
		</div>
	);
}
