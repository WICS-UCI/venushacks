import "./Title.scss";

const TITLE_TEXT = "VENUSHACKS";

const LETTER_ROTATIONS = [9.4, -5, -1, 9, -4, 3, -6, 4, -3, 9.4];

const TitleLetter = ({ letter, index, rotation }) => {
	const isFloating = index % 2 === 0 ? "float-up" : "float-down";
	return (
		<span
			className={`hero-letter ${isFloating}`}
			style={{ transform: `rotate(${rotation}deg)` }}
		>
			{letter}
		</span>
	);
};

const Title = () => {
	return (
		<div className="hero-text">
			<h1 id="hero-title-container">
				{TITLE_TEXT.split("").map((letter, index) => (
					<TitleLetter
						key={index}
						letter={letter}
						index={index}
						rotation={LETTER_ROTATIONS[index]}
					/>
				))}
			</h1>
			<h2 id="hero-subtitle">UCI's Women-Centric Hackathon 2025...</h2>
		</div>
	);
};

export default Title;
