import { PortableText } from "@portabletext/react";
import { Accordion } from "react-bootstrap";

const SingleFAQ = ({ index, data }) => (
	<Accordion.Item eventKey={index}>
		<Accordion.Header>{data.question}</Accordion.Header>
		<Accordion.Body>
			{/* Render the answer which is in PortableText format */}
			<PortableText value={data.answer} />
		</Accordion.Body>
	</Accordion.Item>
);

export default SingleFAQ;
