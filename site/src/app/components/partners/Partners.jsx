import Partner from "./Partner";

import placeholder from "/assets/images/shell.svg";

import "./Partners.scss";
import updateView from "./carousel";

const partners = [
	{
		imgId: "design",
		imgSrc: placeholder,
		addOn: "",
		desc: "Lorem1 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
	},
	{
		imgId: "design",
		imgSrc: placeholder,
		addOn: "prv",
		desc: "Lorem2 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
	},
	{
		imgId: "design",
		imgSrc: placeholder,
		addOn: "cur",
		desc: "Lorem3 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
	},
	{
		imgId: "design",
		imgSrc: placeholder,
		addOn: "nxt",
		desc: "Lorem4 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
	},
	{
		imgId: "design",
		imgSrc: placeholder,
		addOn: "",
		desc: "Lorem5 ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.",
	},
];

const Partners = () => {
	let cur = 1;

	function shift(dir) {
		cur = updateView(cur, dir);
	}

	return (
		<section id="partners">
			<div id="partners-container">
				<input
					className="arrow"
					type="button"
					value="<"
					onClick={() => shift(-1)}
				/>

				<div id="partners-view">
					{partners.map((p) => (
						<Partner
							imgId={p.imgId}
							imgSrc={p.imgSrc}
							addOn={p.addOn}
							desc={p.desc}
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
		</section>
	);
};

export default Partners;
