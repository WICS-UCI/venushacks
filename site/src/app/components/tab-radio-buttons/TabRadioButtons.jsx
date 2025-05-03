import "./TabRadioButtons.scss";

export default function TabRadioButtons({ tabFields, selected, onChange }) {
	return (
		<div className="tab-radio-group">
			{tabFields.map((field) => (
				<button
					key={field}
					type="button"
					className={`radio-button ${selected === field ? "active" : ""}`}
					onClick={() => onChange(field)}
				>
					{field}
				</button>
			))}
		</div>
	);
}