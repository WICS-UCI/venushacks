import React from 'react';
import { speakersData } from "assets/data/speakers-info.js";
import './speakers.scss'

export default function Speakers() {

    function Speaker(name, title, photo, index) {
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
        )
    }

    function renderSpeakers(speakers) {
        return (
            <div className="speaker-photos">
                {speakers.map((speaker, index) => 
                    Speaker(speaker.name, speaker.title, speaker.photo, index)
                )}
            </div>
        )
    }

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