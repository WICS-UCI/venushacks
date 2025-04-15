import Sponsor from "./Sponsor";

import placeholder from "/assets/images/shell.svg";

import "./Sponsors.scss";

const CORPORATE_EMAIL = "sponsorships@venushacks.com";

const sponsors = [
	{
		imgId: "spfb",
		imgSrc: placeholder,
		url: "https://asuci.uci.edu/president/spfb/",
	},
	{
		imgId: "odit",
		imgSrc: placeholder,
		url: "https://odit.uci.edu/",
	},
	{
		imgId: "melissa",
		imgSrc: placeholder,
		url: "https://www.melissa.com/",
	},
	{
		imgId: "antrepreneur",
		imgSrc: placeholder,
		url: "https://antrepreneur.uci.edu/",
	},
	{
		imgId: "spfb",
		imgSrc: placeholder,
		url: "https://asuci.uci.edu/president/spfb/",
	},
];

const Sponsors = () => {
	return (
		<div id="all-sponsors">
			{sponsors.map((s) => (
				<Sponsor imgId={s.imgId} imgSrc={s.imgSrc} url={s.url} />
			))}
		</div>
	);
};

export default Sponsors;
