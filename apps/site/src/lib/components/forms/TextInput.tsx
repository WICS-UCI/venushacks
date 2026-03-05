import RequiredAsterisk from "./RequiredAsterisk";

interface TextProps {
	name: string;
	labelText: string;
	containerClass: string;
	type: string;
	placeholder: string;
	isRequired: boolean;
}

export default function TextInput({
	name,
	labelText,
	containerClass,
	placeholder,
	type,
	isRequired,
}: TextProps) {
	return (
		<div className={containerClass}>
			<label className="text-md mb-2" htmlFor={name}>
				{`${labelText} `} {isRequired && <RequiredAsterisk />}
			</label>
			<input
				className="text-[var(--color-black)] text-sm border shadow-lg p-2 h-10 resize-none rounded-xl flex flex-col w-full"
				type={type}
				name={name}
				id={name}
				required={isRequired}
				placeholder={placeholder}
			/>
		</div>
	);
}
