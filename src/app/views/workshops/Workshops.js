import React from 'react'

import "./Workshops.scss";

import { WorkshopCard, Footer } from "app/components"
import { workshopsData } from "assets/data/workshops-info.js";

function Workshops() {
    return (
        <div className="workshops">
            <h2>Workshops</h2>
            {workshopsData.map(workshop =>
                WorkshopCard(workshop)
            )}
            <Footer />
        </div>
    );
}

export default Workshops;
