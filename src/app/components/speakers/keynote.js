import React from "react";
import './keynote.scss';


export default class Keynote extends React.Component {
    render() {
        let keynotes = [
            {photo: "lisa", name: "Lisa Conn", title: "Cofounder & Chief Operating Officer at Icebreaker"},
            {photo: "emily", name: "Emily Van Norden", title: "Senior Director of Diversity, Equity, & Inclusion and Corporate Communications at Crowdstrike"},
        ];

        const images = keynotes.map((keynote, i) =>
            <div className="col" key={i}>
                <div className="keynote-img-wrapper">
                    <img 
                        src = {require('assets/images/speaker-photos/'+keynote.photo+'.jpeg')}
                        alt = {keynote.photo + "'s profile picture"}
                    />
                    <div className="text">
                        <h4>{keynote.name}</h4>
                        <p>{keynote.title}</p>
                    </div>
                </div>
            </div>
        );
        return ( 
            <div className="row" id = "keynote-photos">
                {images}
            </div>
      );
    }
}
