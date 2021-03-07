import React from "react";
import './team.scss';


export default class Team extends React.Component {
    render() {
        let organizers = [
            {photo: "alice", name: "Alice Phan"},
            {photo: "ameya", name: "Ameya Mandalik"},
            {photo: 'april', name: "April Lee"},
            {photo: 'areeta', name: "Areeta Wong"},
            {photo: 'bhavani', name: "Bhavani Panda"},
            {photo: 'chase', name: "Chase Carnaroli"},
            {photo: 'crystal', name: "Crystal Lee"},
            {photo: 'deepal', name: "Deepal Sanghrajka"},
            {photo: 'elise', name: "Elise Jang"},
            {photo: 'ellen', name: "Ellen Kim"},
            {photo: 'ellise', name: "Ellise Limjoco"},
            {photo: 'kasey', name: "Kasey Chuang"},
            {photo: 'kayla', name: "Kayla Tran"},
            {photo: 'khushi', name: "Khushi Valia"},
            {photo: 'kingsley', name: "Kingsley Szeto"},
            {photo: 'megha', name: "Megha Kak"},
            {photo: 'nicole', name: "Nicole Pham"},
            {photo: 'rieko', name: "Rieko Konishi"},
            {photo: 'riley', name: "Riley Champion"},
            {photo: 'shannon', name: "Shannon Hoang"},
        ];

        const images = organizers.map((organizer, i) =>
            <div key={i} style={{display:"inline-block" }}>
                <div className="organizer-img-wrapper">
                    <img src = {require('assets/images/organizer-photos/'+organizer.photo+'.jpeg')}
                    onmouseover="this.src='./assets/images/organizer-photos-funny/'+organizer.photo+'-funny.jpeg'"
                    onmouseout="this.src='./assets/images/organizer-photos/'+organizer.photo+'.jpeg'"
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
