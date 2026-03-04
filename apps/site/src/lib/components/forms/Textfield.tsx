import RequiredAsterisk from "./RequiredAsterisk";

interface TextfieldProps {
	name: string;
	labelText: string;
	containerClass: string;
	isRequired: boolean;
	maxLength?: number;
}

export default function Textfield({
	name,
	labelText,
	containerClass,
	isRequired,
	maxLength,
}: TextfieldProps) {
	return (
		<div className={containerClass}>
			<div className="flex flex-col w-full">
				<label className="mb-1 text-sm font-medium" htmlFor={name}>
					{`${labelText} `}
					{isRequired && <RequiredAsterisk />}
				</label>
				<textarea
					className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 shadow-md rounded-xl resize-none h-48"
					id={name}
					name={name}
					required={isRequired}
					maxLength={maxLength}
				/>
			</div>
		</div>
	);
}
