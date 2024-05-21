import React from "react";
import { Tooltip, Footer } from "src/app/components";
import { starterPackData } from "src/app/data/resources-info";
import { Carousel, Stack, Card } from 'react-bootstrap';

import "./Resources.scss";
import "bootstrap/dist/css/bootstrap.min.css";

function Resources() {
    return (
        <div className="starter-packs">
            <h2>Resources</h2>
            {starterPackData.map((starterPack) => (
                <div className="starter-pack-card" key={starterPack.name}>
                    <div className="starter-pack-card-information">
                        <h3>{starterPack.name}</h3>
                        <p>{starterPack.description}</p>

                        <div className="starter-pack-card-links">
                            <Carousel style={{ height: 500 }}>
                                {[...Array(Math.ceil(starterPack.packs.length / 3))].map((_, index) => (
                                    <Carousel.Item key={index} className="carousel-item">
                                        <Stack direction="horizontal" className="stack">
                                            {starterPack.packs.slice(index * 3, index * 3 + 3).map((pack, packIndex) => (
                                                <Card key={packIndex} className="card">
                                                    <Tooltip className='tooltip_link' content={pack.tooltip} key={pack.name}>
                                                        <a
                                                            className="starter-pack-card-link"
                                                            href={pack.link}
                                                            target={pack.link.startsWith("/") ? "_self" : "_blank"}
                                                            rel="noopener noreferrer"
                                                        >
                                                            <h4>{pack.name}</h4>
                                                            <img
                                                                src={pack.image}
                                                                alt={pack.name}
                                                            />
                                                        </a>
                                                    </Tooltip>
                                                </Card>
                                            ))}
                                        </Stack>
                                    </Carousel.Item>
                                ))}
                            </Carousel>
                        </div>
                    </div>
                </div>
            ))}
            <Footer />
        </div>
    );
}

export default Resources;
