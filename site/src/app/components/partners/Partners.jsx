import Partner from "./Partner";
import "./Partners.scss";
import updateView from "./carousel";

import { getPartners } from "./getPartners";
import { client } from "../../../sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);
const { partners } = await getPartners();

const Partners = () => {
	let cur = 1;

	function shift(dir) {
		cur = updateView(cur, dir);
	}

	return (
		<div id="partners-carousel">
			<input
				className="arrow"
				type="button"
				value="<"
				onClick={() => shift(-1)}
			/>

			<div id="partners-view">
				{partners.map(({ desc, icon, show, _key }) => (
					<Partner
						imgId={_key}
						imgSrc={builder.image(icon).url()}
						addOn={show}
						desc={desc}
					/>
				))}
			</div>

			<input
				className="arrow"
				type="button"
				value=">"
				onClick={() => shift(1)}
			/>
		</div>
	);
};

export default Partners;
