import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import './Nav.scss';

function Nav() {
  const [showDropMenu, setShowDropMenu] = useState(false);

  const toggleDropDownMenu = () => {
    setShowDropMenu(!showDropMenu);
  }

  // hideDropDownMenu is the onclick function for the nav
  // If the menu is shown and the user clicks somewhere on
  // the screen, the menu will be hidden.
  const hideDropDownMenu = () => {
    if (showDropMenu) {
      setShowDropMenu(false);
    }
  }

  return (
    <div 
      className={"nav" + (showDropMenu ? " show-menu" : "")}
      onClick={hideDropDownMenu}
    >
      <Button onClick={toggleDropDownMenu} className="menu-button btn-secondary">
        {showDropMenu ? 'x' : '≡'}
      </Button>
      <div className={"nav-left" + (showDropMenu ? " show" : "")}>
        <Link to="/">
          <p>
            Home
          </p>
        </Link>
        <Link to="/resources">
          <p>
            Resources
          </p>
        </Link>
        <Link to="/workshops">
          <p>
            Workshops
          </p>
        </Link>
      </div>
    </div>
  )
}

export default Nav;

