
import React from 'react';
import { speakersData } from "assets/data/speakers-info.js";
import './speakers.scss'

const Speaker = (name, title, photo, index) => {
    return (
        <div className="speaker-img-wrapper">
            <img 
                src = {require('assets/images/speaker-photos/'+photo+'.jpeg')}
                alt = {name + "'s profile picture"}
            />
            <div className="text">
                <h4>{name}</h4>
                <p>{title}</p>
            </div>
        </div>
    );
}

const renderSpeakers = (speakers) => {
    return (
        <div className="speaker-photos">
            {speakers.map((speaker, index) => 
                Speaker(speaker.name, speaker.title, speaker.photo, index)
            )}
        </div>
    ) 
}

export default class Speakers extends React.Component {
    render() {
        return (
            <div id="speakers">
                <p className="subheader">Opening Speakers</p>
                {renderSpeakers(speakersData.opening)}
                <p className="subheader">Closing Speakers</p>
                {renderSpeakers(speakersData.closing)}
                <p className="subheader">Panelists</p>
                {renderSpeakers(speakersData.panelists)}
            </div>
        )
    }
}

// <p className="subheader">Keynote</p>
// {renderSpeakers(speakersData.keynotes)}
