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
				className="font-figtree font-medium text-lg mb-2 block"
				htmlFor={name}
			>
				{labelText} {isRequired && <RequiredAsterisk />}
			</label>

			<input
				className="
					w-full font-figtree text-lg h-10 pl-3 pr-4 rounded-xl border border-[#D6D6D6] bg-[#FCFCFC] text-black placeholder:text-[#8E8E8E] outline-none focus:border-slate-300 focus:ring-2 focus:ring-slate-200
				"
				style={{ boxShadow: "0px 0px 5px 0px #00000033" }}
				type={type}
				name={name}
				id={name}
				required={isRequired}
				placeholder={placeholder}
			/>
		</div>
	);
}
