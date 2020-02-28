import React from "react";
import faq_data from './FAQs.json';
import { Card, Accordion } from 'react-bootstrap';
import './FAQs.scss';

const OneFAQ = ({index, data}) => (
    // <div className="card-wrapper">
         <Card className="card-wrapper">
            <Accordion.Toggle as={Card.Header} eventKey={index}>
                {data.question}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={index}>
            <Card.Body>{data.answer}</Card.Body>
            </Accordion.Collapse>
        </Card>     
    // </div> 
); 

export default class FAQs extends React.Component {

    render() {
        var leftside = faq_data.filter(function(faq, index) {
            return (index % 2 === 0);
        });

        var rightside = faq_data.filter(function(faq, index) {
            return (index % 2 !== 0);
        });

        return (
            <div id="faq-accordion-wrapper">
                {/* Two accordions, one on each side can be open at a time */}
                <div id="faq-accordion-grid">
                    <Accordion>
                        {leftside.map((faq, i) => (
                            <OneFAQ key={i} data={faq} index={i}/>
                        ))}
                    </Accordion>
                    <Accordion>
                        {rightside.map((faq, i) => (
                            <OneFAQ key={i} data={faq} index={i}/>
                        ))}
                    </Accordion>
                </div>

                {/* One accordion, one can be open at a time */}
                <div id="faq-accordion-mobile">
                    <Accordion>
                        {faq_data.map((faq, i) => (
                            <OneFAQ key={i} data={faq} index={i}/>
                        ))}
                    </Accordion>
                </div>
            </div>            
        );
    }
}