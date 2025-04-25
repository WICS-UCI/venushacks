import "./DayRadioButtons.scss";

export default function DayRadioButtons({ days, selected, onChange }) {
	console.log(selected);
	return (
		<div className="day-radio-group">
			{days.map((day) => (
				<button
					key={day}
					type="button"
					className={`radio-button ${selected === day ? "active" : ""}`}
					onClick={() => onChange(day)}
				>
					{day}
				</button>
			))}
		</div>
	);
}