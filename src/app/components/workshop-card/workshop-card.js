import React from 'react'
import './workshop-card.scss'

function WorkshopCard(workshop) {
    const {title, description, prereqs, recording} = workshop;
    var preqs = [];
    if (prereqs) {
        preqs.push(<h5>Prequisites:</h5>);
        for (var i = 0; i < prereqs.length; i++) {
            if(prereqs[i].link){
                preqs.push(<a href={prereqs[i].link}>{prereqs[i].description}</a>);
            }
            else{
                preqs.push(<p>{prereqs[i].description}</p>);
            }
        }
    } else {
        preqs = [];
    }

    return (
        <div className="workshop-card">
            <div className="workshop-card-header">
                <h4>{title}</h4>
                <p>Recording</p>
            </div>
            {description}
            <div className="workshop-card-prereqs">
                {preqs}
            </div>
        </div>
    )
}

export default WorkshopCard;