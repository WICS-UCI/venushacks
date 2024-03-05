import { Accordion } from "react-bootstrap";
import faq_data from "./FAQs.json";

import "./FAQs.scss";

const FAQs = () => {
	return (
		<Accordion>
			{faq_data.map((faq) => (
				<>
					{/* eslint-disable-next-line react/jsx-key */}
					<Accordion.Item>
						<Accordion.Header>{faq.question}</Accordion.Header>
						<Accordion.Body>{faq.answer}</Accordion.Body>
					</Accordion.Item>
				</>
			))}
		</Accordion>
	);
};

export default FAQs;
