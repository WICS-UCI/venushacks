import { useEffect } from "react";

const Redirect = ({ url }) => {
  useEffect(() => window.location.replace(url), []);
  return null;
};

export default Redirect;
