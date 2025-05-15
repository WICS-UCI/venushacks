import imageUrlBuilder from "@sanity/image-url";

import Partner from "./Partner";
import updateView from "./carousel";
import { client } from "../../../sanity/client";

import "./Partners.scss";
import usePartners from "./usePartners";

const builder = imageUrlBuilder(client);

const Partners = () => {
	const { partners, isLoading, error } = usePartners();
	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error: {error.message}</div>;
	if (!partners) return <div>No partners found.</div>;

	let cur = 1;
	let init_show = ["prv", "cur", "nxt"];

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
				{partners.map(({ desc, icon, show, _key }, index) => (
					<Partner
						key={_key}
						imgId={index}
						imgSrc={builder.image(icon).url()}
						addOn={index < init_show.length ? init_show[index] : ""}
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
