const Partner = ({ imgId, imgSrc, addOn, desc, link }) => {
	const handleClick = () => {
		if (link) {
			window.open(link, "_blank", "noopener,noreferrer");
		}
	};

	return (
		<div
			id={addOn}
			className={`bubble ${link && "clickable"}`}
			onClick={handleClick}
			style={{ cursor: link ? "pointer" : "default" }}
		>
			<div className="pop">
				<img
					id={imgId}
					className="logo"
					src={imgSrc}
					alt={"Sponsor: " + imgId}
				/>
			</div>
			<div className="desc">
				{desc} {link && <>Learn more at {link}</>}
			</div>
		</div>
	);
};

export default Partner;
