const Sponsor = ({ imgId, imgSrc, url }) => {
	return (
		<div className="sponsor">
			<a href={url} target="_blank" rel="noopener noreferrer">
				<img
					id={imgId}
					className="logo"
					src={imgSrc}
					alt={"Sponsor: " + imgId}
				/>
			</a>
		</div>
	);
};

export default Sponsor;
