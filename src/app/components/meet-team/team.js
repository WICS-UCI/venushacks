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
            {photo: 'danielle', name: "Danielle Muhlenberg"},
            {photo: 'deepal', name: "Deepal Sanghrajka"},
            {photo: 'jp', name: "JP Nguyen"},
            {photo: 'kayla', name: "Kayla Tran"},
            {photo: 'karen', name: "Karen Vu"},
            {photo: 'megha', name: "Megha Kak"},
            {photo: 'mohra', name: "Mohra Asala"},
            {photo: 'nehal', name: "Nehal Desai"},
            {photo: 'sandy', name: "Sandy Pan"},
            {photo: 'shannon', name: "Shannon Hoang"},
            {photo: 'sharon', name: "Sharon Hsu"},
            {photo: 'shreyas', name: "Shreyas Hukkeri"},
            {photo: 'tedrick', name: "Tedrick Wong"},
        ];

        const images = organizers.map(organizer =>
            <div style={{display:"inline-block" }}>
                <div className="organizer-img-wrapper">
                    <img src = {require('assets/images/organizer-photos/'+organizer.photo+'.jpeg')}/>
                </div>
                <p>{organizer.name}</p>
            </div>
        );
        return ( 
            <div id = "organizer-photos" >
                {images}
            </div>

      );
    }
}
