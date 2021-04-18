import React from "react";
import './panelistsecondrow.scss';


export default class PanelistSecondRow extends React.Component {
    render() {
        let panelists = [
            {photo: "ekaterina", name: "Ekaterina (Katia) Stambolieva", title: "Founder of Nina Space"},
            {photo: "danielle", name: "Danielle Sandoval", title: "Group Product Manager at Procure Technologies"},
            {photo: "kristina", name: "Kristina Harris", title: "Global Executive Engagement at DarkTrace"},
        ];

        const images = panelists.map((panelist, i) =>
            <div className="col" key={i} style={{display:"inline-block" }}>
                <div className="panelist-img-wrapper">
                    <img 
                        src = {require('assets/images/speaker-photos/'+panelist.photo+'.jpeg')}
                        alt = {panelist.photo + "'s profile picture"}
                    />
                    <div className="text">
                        <h4>{panelist.name}</h4>
                        <p>{panelist.title}</p>
                    </div>
                </div>
            </div>
        );
        return ( 
            <div className="row" id = "panelist-photos">
                {images}
            </div>
      );
    }
}
