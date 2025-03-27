import { Accordion } from "react-bootstrap";

import faq_data from "./FAQs.json";
import SingleFAQ from "./SingleFAQ";

import "./FAQs.scss";

export default function FAQs() {
	return (
		<div id="faq-accordion-wrapper">
			{/* One accordion, one faq can be open at a time */}
			<div id="faq-accordion">
				<Accordion>
					{faq_data.map((faq, i) => (
						<SingleFAQ key={i} data={faq} index={i} />
					))}
				</Accordion>
			</div>
		</div>
	);
}
