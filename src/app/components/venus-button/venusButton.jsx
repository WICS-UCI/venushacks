import { Button } from 'react-bootstrap';

/**
  * 
  * @param {string} url url of respective application
  * @param {string} text apply as {text}
  * @returns button of that redirects to the url
  */

const VenusButton = ({ url, text }) => {
  return (
    <Button
      className="venus-btn"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
    </Button>
  )
}

export default VenusButton;