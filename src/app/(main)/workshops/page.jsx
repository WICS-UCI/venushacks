'use client';
import { WorkshopCard, Footer } from "@/app/components";
import { workshopsData } from "@/assets/data/workshops-info";


import "./Workshops.scss";

const Workshops = () => {
  return (
    <div className="workshops">
        <div id='workshops_header'>
            <h2>Workshops</h2>
            <h5>
            For time and location info, check the
            <a href="/schedule"> schedule </a> !
            </h5>
        </div>
            
        {workshopsData.map((workshop) => WorkshopCard(workshop))}
        <Footer />
    </div>
  );
};

// const Workshops = () => process.env.NEXT_PUBLIC_MAINTENANCE_MODE_WORKSHOPS ? redirect("/") : <p>Workshops</p>;

export default Workshops;
