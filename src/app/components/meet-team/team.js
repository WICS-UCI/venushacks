import React from "react";
import './team.scss';

export default class Team extends React.Component {
    render() {
        let organizers = [
            {photo: "alice", name: "Alice Phan"},
            {photo: "alyssa", name: "Alyssa Darjuan"},
            {photo: 'archita', name: "Archita Ganesh"},
            {photo: 'areeta', name: "Areeta Wong"},
            {photo: 'chey', name: "Chey Chavez"},
            {photo: 'christian', name: "Christian Chun"},
            {photo: 'danielle', name: "Danielle Muhlenberg"},
            {photo: 'deepal', name: "Deepal Sanghrajka"},
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
            {photo: 'jp', name: "JP Nguyen"},
            {photo: 'kaeley', name: "Kaeley Lenard"},
=======
            {photo: 'elise', name: "Elise Jang"},
            {photo: 'ellen', name: "Ellen Kim"},
            {photo: 'ellise', name: "Ellise Limjoco"},
            {photo: 'karen', name: "Karen Vu"},
            {photo: 'kasey', name: "Kasey Chuang"},
>>>>>>> parent of b979899... Update team.js
=======
            {photo: 'jp', name: "JP Nguyen"},
            {photo: 'kaeley', name: "Kaeley Lenard"},
>>>>>>> parent of b0424ff... hack at uci + org photos
=======
            {photo: 'jp', name: "JP Nguyen"},
            {photo: 'kaeley', name: "Kaeley Lenard"},
>>>>>>> parent of b0424ff... hack at uci + org photos
=======
            {photo: 'jp', name: "JP Nguyen"},
            {photo: 'kaeley', name: "Kaeley Lenard"},
>>>>>>> parent of b0424ff... hack at uci + org photos
            {photo: 'kayla', name: "Kayla Tran"},
            {photo: 'karen', name: "Karen Vu"},
            {photo: 'megha', name: "Megha Kak"},
            {photo: 'mohra', name: "Mohra Arsala"},
            {photo: 'nehal', name: "Nehal Desai"},
            {photo: 'paul', name: "Paul Yang"},
            {photo: 'sahil', name: "Sahil Railkar"},
            {photo: 'sandy', name: "Sandy Pan"},
            {photo: 'shannon', name: "Shannon Hoang"},
            {photo: 'sharon', name: "Sharon Hsu"},
            {photo: 'shreyas', name: "Shreyas Hukkeri"},
            {photo: 'tedrick', name: "Tedrick Wong"},
            {photo: 'theja', name: "Theja Krishna"},
            {photo: 'tiffany', name: "Tiffany Liang"},
            {photo: 'zach', name: "Zach Pinto"},
        ];

        const images = organizers.map((organizer, i) =>
            <div key={i} style={{display:"inline-block" }}>
                <div className="organizer-img-wrapper">
                    <img src = {require('assets/images/organizer-photos/'+organizer.photo+'.jpeg')}/>
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
