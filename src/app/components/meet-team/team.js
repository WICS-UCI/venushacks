import React from "react";
import './team.scss';


export default class Team extends React.Component {
    render() {
        let organizers = [
            {photo: "aasha", name: "Aasha Sendhil"},
            {photo: "alan", name: "Alan Chang"},
            {photo: "ameya", name: "Ameya Mandalik"},
            {photo: "angela", name: "Angela Qiao"},
            {photo: "chase", name: "Chase Carnaroli"},
            {photo: "chloe", name: "Chloe Cheng"},
            {photo: "duong", name: "Duong Vu"},
            {photo: "elise", name: "Elise Jang"},
            {photo: "ellise", name: "Ellise Limjoco"},
            {photo: "emily", name: "Emily Doan"},
            {photo: "grace", name: "Grace Manning"},
            {photo: "joseph", name: "Joseph Gu"},
            {photo: "julianna", name: "Julianna Cardenas"},
            {photo: "khushi", name: "Khushi Valia"},
            {photo: "kingsley", name: "Kingsley Szeto"},
            {photo: "megha", name: "Megha Kak"},
            {photo: "nathan", name: "Nathan Nguyen"},
            {photo: "nicole", name: "Nicole Pham"},
            {photo: "olivia", name: "Olivia Ih"},
            {photo: "parsa", name: "Parsa Karamat"},
            {photo: "philip", name: "Philip Truong"},
            {photo: "riley", name: "Riley Wong"},
            {photo: "rochelle", name: "Rochelle Nixon"},
            {photo: "rong", name: "Rong Mu"},
            {photo: "sanjana", name: "Sanjana Magidewar"},
            {photo: "shalini", name: "Shalina Bhakta"},
            {photo: "sydney", name: "Sydnee Tan"},
            {photo: "william", name: "William Hou"},
            {photo: "zoya", name: "Zoya Hajee"}
        ];

        const images = organizers.map((organizer, i) =>
            <div key={i} style={{display:"inline-block" }}>
                <div className="organizer-img-wrapper">
                    <img 
                        src = {require('assets/images/organizer-photos/'+organizer.photo+'.jpeg')}
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
