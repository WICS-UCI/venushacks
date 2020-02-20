import React, { useState, useEffect } from "react";
import { useSpring, animated } from 'react-spring';
import './AnimatedAstronaut.scss';


import astronaut from 'assets/images/astronaut_solid.png';
import laptop from 'assets/images/laptop.png';


const interp = i => r => `translate3d(0, ${10 * Math.sin(r + (i * 1.5 * Math.PI) / 1.6)}px, 0)`;


function AnimatedAstronaut() {
  const { radians } = useSpring({
    to: async next => {
      while (1) await next({ radians: 2 * Math.PI })
    },
    from: { radians: 0 },
    config: { duration: 3500 },
    reset: true,
  })
  return (
    <div className="container" style={{marginLeft: "80px", paddingTop: "20px"}}>
  
    <div className="Left" style={{width: "50%"}}>
      <animated.div className="image1" 
        style={{ transform: radians.interpolate(interp(0)) }} 
      >
        <img src={astronaut} style={{width: "300px", height: 'auto'}} />
      </animated.div>
      <animated.div className=" image2" style={{ transform: radians.interpolate(interp(1))}} >
        <img src={laptop} style={{width: "350px", height: 'auto', margin: "-120px 0 0 280px"}}/>
      </animated.div>
    </div>
  </div>

  );
}

export default AnimatedAstronaut;