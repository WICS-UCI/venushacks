const Partner = ({ imgId, imgSrc, addOn, desc }) => {
	return (
		<div id={addOn} className="bubble">
			<div className="pop">
				<img
					id={imgId}
					className="logo"
					src={imgSrc}
					alt={"Sponsor: " + imgId}
				/>
			</div>
			<div className="desc">{desc}</div>
		</div>
	);
};

export default Partner;
