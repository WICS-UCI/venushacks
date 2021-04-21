import React from 'react'
import './workshop-card.scss'

function WorkshopCard(workshop) {
    const {title, description, recording} = workshop;

    return (
        <div className="workshop-card">
            <div className="workshop-card-header">
                <h4>{title}</h4>
                <p>Recording</p>
            </div>
            {description}
        </div>
    )
}

export default WorkshopCard;