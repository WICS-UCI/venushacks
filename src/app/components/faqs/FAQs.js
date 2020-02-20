import React from "react";
import faq_data from './FAQs.json';
import { Card, Accordion } from 'react-bootstrap';
import './FAQs.scss';

const OneFAQ = ({data}) => (
    <Accordion>
        <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
                {data.question}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
            <Card.Body>{data.answer}</Card.Body>
            </Accordion.Collapse>
        </Card>
    </Accordion>    
); 

export default class FAQs extends React.Component {

    handleClick(e) {
        e.stopPropagation();
    }

    render() {
        var leftside = faq_data.filter(function(faq, index) {
            return (index % 2 === 0);
        });

        var rightside = faq_data.filter(function(faq, index) {
            return (index % 2 !== 0);
        });

        return (
            <div id="faq-accordion-grid" onClick={this.handleClick}>
                <div>
                    {leftside.map((faq, i) => (
                        <OneFAQ key={i} data={faq} />
                    ))}
                </div>
                <div>
                    {rightside.map((faq, i) => (
                        <OneFAQ key={i} data={faq} />
                    ))}
                </div>
            </div>
        );
    }
}