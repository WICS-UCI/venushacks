"use client";

import { useState, useEffect, useRef, forwardRef } from "react";

import RequiredAsterisk from "./RequiredAsterisk";

interface MultipleSelectProps {
	name: string;
	labelText: string;
	values: Array<{ value: string; text: string }>;
	containerClass: string;
	inputType: "radio" | "checkbox";
	horizontal?: boolean;
	isRequired?: boolean;
	allChecked?: boolean;
}

interface OtherInputProps {
	isChecked: boolean;
	name: string;
}

const OtherInput = forwardRef<HTMLInputElement, OtherInputProps>(
	({ isChecked, name }, ref) => (
		<input
			ref={ref}
			type="text"
			name={name}
			className={
				isChecked
					? "text-[var(--color-black)] border-b-2 p-1 h-6 border-black w-6/12"
					: "text-[var(--color-white)]border-b-2 p-1 h-6 border-black w-6/12 bg-transparent"
			}
			required={isChecked}
			disabled={!isChecked}
		/>
	),
);
OtherInput.displayName = "OtherInput";

export default function MultipleSelect({
	name,
	labelText,
	inputType,
	values,
	containerClass,
	horizontal,
	isRequired,
	allChecked,
}: MultipleSelectProps) {
	const [isOtherChecked, setIsOtherChecked] = useState(false);
	const [checkedValues, setCheckedValues] = useState<Set<string>>(new Set());
	const otherRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isOtherChecked) {
			otherRef.current?.focus();
		}
	}, [isOtherChecked]);

	const handleChange = (value: string, checked: boolean) => {
		setCheckedValues((prev) => {
			const next = new Set(prev);
			// eslint-disable-next-line no-unused-expressions
			checked ? next.add(value) : next.delete(value);
			return next;
		});
	};

	const allOptionsChecked = allChecked
		? values.every((item) => checkedValues.has(item.value))
		: true;

	return (
		<div className={containerClass}>
			<p className="m-0 text-sm md:text-base mb-4">{labelText}</p>
			<div
				className={`w-full flex ${
					horizontal ? "flex-wrap gap-10" : "flex-col gap-6"
				}`}
			>
				{values.map((item, i) => {
					const inputId = `${name}-${i}`;
					if (item.value === "other") {
						return (
							<div key={item.value} className="flex gap-3 items-start">
								<input
									id={inputId}
									type={inputType}
									key={`option-${i}`}
									name={name}
									value={item.value}
									className="mt-1 flex-shrink-0 appearance-none w-4 h-4 rounded-sm bg-white border border-[#D6D6D6] checked:bg-blue-500 checked:border-blue-500 cursor-pointer"
									style={{ boxShadow: "0px 0px 5px 0px #00000033" }}
									onChange={(e) => {
										setIsOtherChecked(e.target.checked);
										handleChange(item.value, e.target.checked);
									}}
								/>
								<label
									className="w-full font-figtree font-medium appearance-none text-[#000000] text-sm md:text-base leading-snug"
									htmlFor={inputId}
								>
									{item.text}
								</label>
								<OtherInput
									isChecked={isOtherChecked}
									name={`_other_${name}`}
									ref={otherRef}
								/>
							</div>
						);
					}
					return (
						<div key={i} className="flex gap-3 items-start">
							<input
								id={inputId}
								type={inputType}
								name={name}
								value={item.value}
								className="mt-1 flex-shrink-0 appearance-none w-4 h-4 rounded-sm bg-white border border-[#D6D6D6] checked:bg-blue-500 checked:border-blue-500 cursor-pointer"
								style={{ boxShadow: "0px 0px 5px 0px #00000033" }}
								onChange={(e) => handleChange(item.value, e.target.checked)}
							/>
							<label
								className="w-full font-figtree font-medium appearance-none text-[#000000] text-sm md:text-base leading-snug"
								htmlFor={inputId}
							>
								{item.text}
								{isRequired && <RequiredAsterisk />}
							</label>
						</div>
					);
				})}
			</div>

			{allChecked && (
				<input
					type="checkbox"
					className="sr-only"
					checked={allOptionsChecked}
					required
					onChange={() => {}}
					aria-hidden="true"
					tabIndex={-1}
				/>
			)}
		</div>
	);
}
