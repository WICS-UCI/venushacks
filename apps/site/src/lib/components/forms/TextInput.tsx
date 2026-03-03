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
			<label
				className="block text-md font-semibold text-slate-900 mb-2"
				htmlFor={name}
			>
				{labelText} {isRequired && <RequiredAsterisk />}
			</label>

			<input
				className="
					w-full
					h-12
					rounded-2xl
					bg-white
					px-4
					text-slate-700
					border border-gray-200				
					bg-white shadow-[0_0_5px_rgba(0,0,0,0.4)] 
					outline-none
					placeholder:text-gray-400
					focus:border-gray-300
					focus:ring-2 focus:ring-gray-200
				"
				type={type}
				name={name}
				id={name}
				required={isRequired}
				placeholder={placeholder}
			/>
		</div>
	)
}
