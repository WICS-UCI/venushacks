import "./ComingSoon.scss";

const TITLE_TEXT = "VENUSHACKS";

const LETTER_ROTATIONS = [9.4, -5, -1, 9, -4, 3, -6, 4, -3, 9.4];

const TitleLetter = ({ letter, index, rotation }) => {
	const isFloating = index % 2 === 0 ? "float-up" : "float-down";
    return (
		<span
			className={`coming-soon-letter ${isFloating}`}
			style={{ transform: `rotate(${rotation}deg)` }}
		>
			{letter}
		</span>
	);
};

const ComingSoon = () => {
	return (
		<div className="ComingSoon">
			<div id="left-fishes" />
			<div id="right-fishes" />
			<div id="coral" />

			<div className="coming-soon-text">
                <h1 id="coming-soon-title-container">
					{TITLE_TEXT.split("").map((letter, index) => (
						<TitleLetter key={index} letter={letter} index={index} rotation={LETTER_ROTATIONS[index]} />
					))}
				</h1>
				<h2 id="coming-soon-subtitle">Coming Soon in Spring 2025...</h2>
			</div>
		</div>
	);
};

export default ComingSoon;
