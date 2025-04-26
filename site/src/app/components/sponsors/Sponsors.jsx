import Sponsor from "./Sponsor";
import "./Sponsors.scss";

import { getSponsors } from "./getSponsors";
import { client } from "../../../sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);
const { sponsors } = await getSponsors();

const CORPORATE_EMAIL = "sponsorships@venushacks.com";

const Sponsors = () => {
	return (
		<div id="all-sponsors">
			{sponsors.map(({ icon, url, _key }) => (
				<Sponsor imgId={_key} imgSrc={builder.image(icon).url()} url={url} />
			))}
		</div>
	);
};

export default Sponsors;
