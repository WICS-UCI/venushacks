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
			<label className="mb-1 text-sm font-medium" htmlFor={name}>
				{`${labelText} `} {isRequired && <RequiredAsterisk />}
			</label>
			<input
				className="w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 shadow-md rounded-xl placeholder:text-gray-400"
				type={type}
				name={name}
				id={name}
				required={isRequired}
				placeholder={placeholder}
			/>
		</div>
	);
}
