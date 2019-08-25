import React from "react";
import './NumbersGroup.scss';

import { Button } from 'react-bootstrap';

function NumbersGroup(props) {
  return (
    <div className='numbers-group'>
      {props.children}
    </div>
  );
}

export default NumbersGroup;
