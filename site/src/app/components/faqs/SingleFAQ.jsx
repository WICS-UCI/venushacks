import { Accordion } from "react-bootstrap";

const SingleFAQ = ({ index, data }) => (
	<Accordion.Item eventKey={index}>
		<Accordion.Header>{data.question}</Accordion.Header>
		<Accordion.Body>{data.answer}</Accordion.Body>
	</Accordion.Item>
);

export default SingleFAQ;
