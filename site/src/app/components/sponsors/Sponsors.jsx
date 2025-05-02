import Sponsor from "./Sponsor";

import { getSponsors } from "./getSponsors";
import { client } from "../../../sanity/client";
import imageUrlBuilder from "@sanity/image-url";

import "./Sponsors.scss";

const builder = imageUrlBuilder(client);
const { sponsors } = await getSponsors();

const CORPORATE_EMAIL = "sponsorships@venushacks.com";

const Sponsors = () => {
	return (
		<div id="all-sponsors">
			{sponsors.map(({ icon, url, _key }, index) => (
				<Sponsor key={_key} imgId={index} imgSrc={builder.image(icon).url()} url={url} />
			))}
		</div>
	);
};

export default Sponsors;
