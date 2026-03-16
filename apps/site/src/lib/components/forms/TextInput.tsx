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
		<div className={`${containerClass} font-figtree`}>
			<label
				className="block text-sm md:text-base font-figtree mb-2"
				htmlFor={name}
			>
				{labelText} {isRequired && <RequiredAsterisk />}
			</label>

			<input
				className="
					w-full
					rounded-xl
					px-4 py-2
					border border-gray-200				
					bg-[#FCFCFC] shadow-[0_0_5px_rgba(0,0,0,0.4)] 
					outline-none
					text-sm md:text-base
					placeholder:text-[#8E8E8E] text-black
					focus:bg-white
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
	);
}
