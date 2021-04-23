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
        <Link to="/schedule">
          <p>
            Schedule
          </p>
        </Link>
        <Link to="/starter-packs">
          <p>
            Starter Packs
          </p>
        </Link>
        <Link to="/workshops">
          <p>
            Workshops
          </p>
        </Link>
      </div>
      <div className="nav-right">
        <a id="mlh-trust-badge" href="https://mlh.io/seasons/2021/events?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2021-season&utm_content=white" target="_blank" rel="noopener noreferrer">
          <img src="https://s3.amazonaws.com/logged-assets/trust-badge/2021/mlh-trust-badge-2021-white.svg" alt="Major League Hacking 2021 Hackathon Season" />
        </a>
      </div>
    </div>
  )
}

export default Nav;

