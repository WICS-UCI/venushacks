import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';

import logo from 'assets/images/zothacks-logo.png';
import { Spring, Trail } from 'react-spring/renderprops';
import { Button } from 'react-bootstrap';

function Nav({history}) {

  const [isHomepage, setHomepage] = useState(history.location.pathname === '/');
  const [resourceHover, setResourceHover] = useState(false);

  const resources = [
    {
      label: 'Starter Packs'
    }, {
      label: 'Devpost'
    }, {
      label: 'Slack'
    }
  ];

  history.listen((location) => {
    setHomepage(location.pathname === '/');
  });

  function test(change) {
    console.log(resourceHover, 'changing to', change);
    setResourceHover(change);
  }

  return (
    <div className="nav">
      <div className="nav-left">
        <Link to="/">
          <img src={logo} alt="Zothacks Logo"></img>
        </Link>
      </div>
      <div className="nav-right">
        <Link to="/">
          <p className="home-button-hide">
            Home
          </p>
        </Link>
        {/* <div className="resource-button-hide" onMouseLeave={() => test(false)}>
          <p onMouseOver={() => test(true)}>
            Resources 
            <i className="fa fa-angle-down"></i>
          </p>
          <Spring to={{ opacity: resourceHover ? 1 : 0 }}>
            {(props) => (
              <div className="nav-resource-dropdown" style={props}>
                <div className="nav-resource-hover-buffer"></div>
                <div className="nav-resource-dropdown-tag"/>
                {resources.map(function(resource, index) {
                    return (
                      <div>
                        <div className="nav-resource-dropdown-item">
                          <p>
                            {resource.label}
                          </p>
                        </div>
                        { index < resources.length - 1 ?
                          <div className="nav-resource-border"></div> : null
                        }
                      </div>
                    )
                  })}
              </div>
            )}
          </Spring>
        </div> */}
        {
          isHomepage ? 
          <Link to="/schedule">
            <Button variant="light">
              Schedule
            </Button>
          </Link> :
          <a href="https://tinyurl.com/zothacks2019">
            <Button variant="light">
              Apply
            </Button>
          </a>
        }
      </div>
    </div>
  )
}

export default Nav;