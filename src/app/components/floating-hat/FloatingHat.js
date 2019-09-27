import React, { useState, useEffect } from "react";
import './FloatingHat.scss';

import { Keyframes, animated, interpolate } from 'react-spring/renderprops'

import hat from 'assets/images/hat.png';

const Container = Keyframes.Spring(async next => {
  while (true) {
    let prev = 0;
    let prevDegree = -3;
    for (let i = 0; i < 10; i++) {
      let randomHeight = Math.floor(Math.random() * 20) 
      let randomDegree = i % 1 === 0 ? prevDegree * -1 : prevDegree;
      await next({
        from: { height: prev, degree: prevDegree},
        to: { height: i === 9 ? 0 : randomHeight, degree: randomDegree} 
      });
      prev = randomHeight;
      prevDegree = randomDegree;
    }
  }
})

function FloatingHat({offset}) {
  const image = ({height, degree}) => (
    <animated.img 
      src={hat} 
      className="floating-hat"
      style={{ 
        transform: interpolate([height, degree], (h, d) => `translateY(${h - 10}px) rotate(${d}deg)`),
        transformOrigin: 'top center'
      }}
    ></animated.img>
  );

  return (
    <Container
      reset
      native
      config={{ duration: 1000 }}
    >
      {image}
    </Container>

  );
}

export default FloatingHat;