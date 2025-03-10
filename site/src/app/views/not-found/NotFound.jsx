import { Footer } from "src/app/components";

import "./NotFound.scss";

function NotFound() {
	return (
		<div className="not-found">
			<div className="not-found-message">
				<h1>404</h1>
				<span className="h2">Not Found</span>
				<span>Just empty space over here.</span>
			</div>
			{/* <Footer /> */}
		</div>
	);
}

export default NotFound;
