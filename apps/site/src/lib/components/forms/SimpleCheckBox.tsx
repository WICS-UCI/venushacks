import RequiredAsterisk from "./RequiredAsterisk";

interface SimpleCheckBoxProps {
	name: string;
	labelText: string;
	labelClass: string;
	isRequired: boolean;
	containerClass: string;
}

export default function SimpleCheckBox({
	name,
	labelText,
	containerClass,
	labelClass,
	isRequired,
}: SimpleCheckBoxProps) {
	return (
		<div className={containerClass}>
			<div className="w-full flex flex-row gap-5 items-center">
				<input
					type="checkbox"
					id={`checkbox_${name}`}
					name={name}
					required={isRequired}
					className="h-5 w-5 appearance-none rounded shadow-lg border border-gray-300"
				/>
				<p className={labelClass}>
				{`${labelText} `}
				{isRequired && <RequiredAsterisk />}
			</p>
			</div>
		</div>
	);
}
