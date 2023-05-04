import React from "react";
import './team.scss';


export default class Team extends React.Component {
    render() {
        let organizers = [
            {photo: "alan", name: "Alan Chang"},
            {photo: "alicia", name: "Alicia Chuang"},
            {photo: "alisa", name: "Alisa Lu"},
            {photo: "araam", name: "Araam Abutaha"},
            {photo: "audrey", name: "Audrey Lam"},
            {photo: "avent", name: "Avent Chiu"},
            {photo: "brian", name: "Brian Lin"},
            {photo: "caroline", name: "Caroline Wang"},
            {photo: "cheryl", name: "Cheryl Chen"},
            {photo: "chloe", name: "Chloe Cheng"},
            {photo: "cinta", name: "Cinta Adhiningrat"},
            {photo: "crystal", name: "Crystal Lai"},
            {photo: "grace", name: "Grace Manning"},
            {photo: "graceW", name: "Grace Wang"},
            {photo: "hang", name: "Hang Cao"},
            {photo: "jefferey", name: "Jefferey Lee Chea"},
            {photo: "jenny", name: "Jenny Liu"},
            {photo: "kirby", name: "Kirby Ammari"},
            {photo: "kristen", name: "Kristen Yee"},
            {photo: "mason", name: "Mason Wong"},
            {photo: "mignon", name: "Mignon April Lee"},
            {photo: "mirelle", name: "Mirelle George"},
            {photo: "nathanC", name: "Nathan Choi"},
            {photo: "nathan", name: "Nathan Huey"},
            {photo: "nicole", name: "Nicole Nguyen"},
            {photo: "philip", name: "Philip Truong"},
            {photo: "randy", name: "Randy Huynh"},
            {photo: "riley", name: "Riley Wong"},
            {photo: "rochelle", name: "Rochelle Nixon"},
            {photo: "rosalind", name: "Rosalind Guo"},
            {photo: "ruslan", name: "Ruslan Manoharan"},
            {photo: "ryan", name: "Ryan Eurich"},
            {photo: "sam", name: "Sam Der"},
            {photo: "shreshta", name: "Shreshta Kumar"},
            {photo: "taylor", name: "Taylor Quach"}
        ];

        const images = organizers.map((organizer, i) =>
            <div key={i} style={{display:"inline-block" }}>
                <div className="organizer-img-wrapper">
                    <img 
                        src = {require('assets/images/organizer-photos/'+organizer.photo+'.jpg')}
                        alt = {organizer.photo + "'s profile picture"}
                        //onMouseOver={e => (e.currentTarget.src = require('assets/images/organizer-photos-funny/'+organizer.photo+'-funny.jpeg'))}
                        //onMouseOut={e => (e.currentTarget.src = require('assets/images/organizer-photos/'+organizer.photo+'.jpeg'))}
                    />
                </div>
                <p>{organizer.name}</p>
            </div>
        );
        return ( 
            <div id = "organizer-photos">
                {images}
            </div>

      );
    }
}
