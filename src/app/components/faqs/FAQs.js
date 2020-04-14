import React from "react";
import faq_data from './FAQs.json';
import { Card, Accordion } from 'react-bootstrap';
import './FAQs.scss';

const SingleFAQ = ({index, data}) => (
    <Card className="card-wrapper">
        <Accordion.Toggle as={Card.Header} eventKey={index}>
            {data.question}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={index}>
            <Card.Body>{data.answer}</Card.Body>
        </Accordion.Collapse>
    </Card>
); 

export default class FAQs extends React.Component {

    render() {
        var leftFAQs = faq_data.filter(function(faq, index) {
            return (index % 2 === 0);
        });

        var rightFAQs = faq_data.filter(function(faq, index) {
            return (index % 2 !== 0);
        });

        return (
            <div id="faq-accordion-wrapper">
                {/* Two accordions, one faq on each side can be open at a time */}
                <div id="faq-accordion-grid">
                    <Accordion>
                        {leftFAQs.map((faq, i) => (
                            <SingleFAQ key={i} data={faq} index={i}/>
                        ))}
                    </Accordion>
                    <Accordion>
                        {rightFAQs.map((faq, i) => (
                            <SingleFAQ key={i} data={faq} index={i}/>
                        ))}
                    </Accordion>
                </div>

                {/* One accordion, one faq can be open at a time */}
                <div id="faq-accordion-mobile">
                    <Accordion>
                        {faq_data.map((faq, i) => (
                            <SingleFAQ key={i} data={faq} index={i}/>
                        ))}
                    </Accordion>
                </div>
            </div>            
        );
    }
}