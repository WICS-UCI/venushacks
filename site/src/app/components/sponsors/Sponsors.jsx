import imageUrlBuilder from "@sanity/image-url";

import { client } from "../../../sanity/client";
import Sponsor from "./Sponsor";
import useSponsors from "./useSponsors";

import "./Sponsors.scss";

const builder = imageUrlBuilder(client);

const Sponsors = () => {
	const { sponsors, isLoading, error } = useSponsors();

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	if (!sponsors) return <div>No sponsors found.</div>;
	return (
		<>
			<div id="all-sponsors">
				{sponsors.map(({ icon, url, _key }, index) => (
					<Sponsor
						key={_key}
						imgId={index}
						imgSrc={builder.image(icon).url()}
						url={url}
					/>
				))}
			</div>
			<div className="special-thanks">
				<h3>Special Thanks to:</h3>
				<p>
					Kim Nguyen
					<br />
					Tiffany Cheung
					<br />
					Swarna Umesh
					<br />
					Paul Townsend
				</p>
			</div>
		</>
	);
};

export default Sponsors;
