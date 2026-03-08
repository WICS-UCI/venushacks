import RequiredAsterisk from "./RequiredAsterisk";

interface TextfieldProps {
	name: string;
	labelText: string;
	containerClass: string;
	isRequired: boolean;
	maxLength?: number;
	placeholder?: string;
}

export default function Textfield({
	name,
	labelText,
	containerClass,
	isRequired,
	maxLength,
	placeholder,
}: TextfieldProps) {
	return (
		<div className={containerClass}>
			<div className="flex flex-col w-full">
				<label className="text-base mb-2" htmlFor={name}>
					{`${labelText} `}
					{isRequired && <RequiredAsterisk />}
				</label>
				<textarea
					className="text-[var(--color-black)] text-sm border shadow-lg p-3 h-36 resize-none rounded-xl"
					id={name}
					name={name}
					required={isRequired}
					maxLength={maxLength}
					placeholder={placeholder}
				/>
			</div>
		</div>
	);
}
