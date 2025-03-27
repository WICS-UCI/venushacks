import { ParallaxProvider } from "react-scroll-parallax";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ParallaxProvider>
			<App />
		</ParallaxProvider>
	</React.StrictMode>
);
