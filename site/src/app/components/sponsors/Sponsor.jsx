const Sponsor = ({ imgId, imgSrc, url }) => {
	return (
		<a href={url} target="_blank" rel="noopener noreferrer">
			<img id={imgId} className="logo" src={imgSrc} alt={"Sponsor: " + imgId} />
		</a>
	);
};

export default Sponsor;
