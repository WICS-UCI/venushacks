import React from 'react';
import { speakersData } from "assets/data/speakers-info.js";
import "./speakers.scss";

const Speaker = (name, title, photo) => (
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

const renderSpeakers = (speakers) => (
    <div className="speaker-photos">
        {speakers.map((speaker) => 
            Speaker(speaker.name, speaker.title, speaker.photo)
        )}
    </div>
);

const Speakers = () => {
    return (
        <div id="speakers">
            <p className="subheader">Opening Speakers</p>
            {renderSpeakers(speakersData.opening)}
            <p className="subheader">Closing Speakers</p>
            {renderSpeakers(speakersData.closing)}
            <p className="subheader">Panelists</p>
            {renderSpeakers(speakersData.panelists)}
        </div>
    );

export default Speakers;