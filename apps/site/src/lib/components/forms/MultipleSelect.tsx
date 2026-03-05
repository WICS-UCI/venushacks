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

export default function MultipleSelectYesFRQ({
	name,
	labelText,
	inputType,
	values,
	containerClass,
	horizontal,
	isRequired,
}: MultipleSelectProps) {
	const [isOtherChecked, setIsOtherChecked] = useState(false);
	const otherRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (isOtherChecked) {
			otherRef.current?.focus();
		}
	}, [isOtherChecked]);

	return (
		<div className={containerClass}>
			<p className="m-0 text-lg mb-4">
				{labelText} {isRequired && <RequiredAsterisk />}
			</p>
			<div
				className={`w-10/12 flex ${
					horizontal ? "flex-wrap gap-10" : "flex-col gap-2"
				}`}
			>
				{values.map((item, i) => {
					const inputId = `${name}-${i}`;
					if (item.value === "other") {
						return (
							<div key={item.value} className="flex gap-2 items-center">
								<input
									id={inputId}
									type={inputType}
									key={`option-${i}`}
									name={name}
									value={item.value}
									onChange={(e) => setIsOtherChecked(e.target.checked)}
								/>
								<label className="text-lg" htmlFor={inputId}>
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
						<div key={i} className="flex gap-2 items-center">
							<input
								id={inputId}
								type={inputType}
								key={`option-${i}`}
								name={name}
								value={item.value}
							/>
							<label className="text-lg" htmlFor={inputId}>
								{item.text}
							</label>
						</div>
					);
				})}
			</div>
		</div>
	);
}
