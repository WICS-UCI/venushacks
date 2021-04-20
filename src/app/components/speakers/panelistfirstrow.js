import React from "react";
import './panelistfirstrow.scss';


export default class PanelistFirstRow extends React.Component {
    render() {
        let panelists = [
            {photo: "maira", name: "Maira Benjamin", title: "Senior Director of Engineering at Change.org"},
            {photo: "tiffany", name: "Tiffany Wong", title: "Software Engineer at Linode"},
            {photo: "victoria", name: "Victoria Good", title: "Lead Software Engineer at Linode"},
            {photo: "sally", name: "Sally Steuterman", title: "Senior Education Program Developer at LaunchCode"},
        ];

        const images = panelists.map((panelist, i) =>
            <div className="col" key={i}>
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
