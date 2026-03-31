"use client"

import { useState, useRef } from "react";
import RequiredAsterisk from "./RequiredAsterisk";

interface TextProps {
	name: string;
	labelText: string;
	containerClass: string;
	type: string;
	placeholder: string;
	isRequired: boolean;
	isDate?: boolean;
}

function isValidDate(value: string): boolean {
	if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) return false;

	const [mm, dd, yyyy] = value.split("/").map(Number);
	if (mm < 1 || mm > 12) return false;
	if (dd < 1 || dd > 31) return false;
	if (yyyy < 1000 || yyyy > 9999) return false;

	const date = new Date(yyyy, mm - 1, dd);
	return (
		date.getFullYear() === yyyy &&
		date.getMonth() === mm - 1 &&
		date.getDate() === dd
	);
}

export default function TextInput({
	name,
	labelText,
	containerClass,
	placeholder,
	type,
	isRequired,
	isDate,
}: TextProps) {
	const [dateValue, setDateValue] = useState("");
	const [dateError, setDateError] = useState("");
	const prevValueRef = useRef("");

	const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const raw = e.target.value;
		const prev = prevValueRef.current;

		if (raw.length < prev.length) {
			let stripped = raw;
			if (prev[raw.length] === "/") {
				stripped = raw.slice(0, -1);
			}
			setDateValue(stripped);
			prevValueRef.current = stripped;
			setDateError("");
			return;
		}

		const digitsOnly = raw.replace(/[^\d]/g, "");

		let formatted = "";
		if (digitsOnly.length <= 2) {
			formatted = digitsOnly;
		} else if (digitsOnly.length <= 4) {
			formatted = `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2)}`;
		} else {
			formatted = `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2, 4)}/${digitsOnly.slice(4, 8)}`;
		}

		setDateValue(formatted);
		prevValueRef.current = formatted;

		if (formatted.length === 10) {
			if (!isValidDate(formatted)) {
				setDateError("Please enter a valid date in MM/DD/YYYY format.");
			} else {
				setDateError("");
			}
		} else {
			setDateError("");
		}
	};

	const handleDateBlur = () => {
		if (dateValue.length > 0 && dateValue.length < 10) {
			setDateError("Please enter a complete date in MM/DD/YYYY format.");
		} else if (dateValue.length === 10 && !isValidDate(dateValue)) {
			setDateError("Please enter a valid date in MM/DD/YYYY format.");
		}
	};

	const handleDateInvalid = (e: React.InvalidEvent<HTMLInputElement>) => {
		e.preventDefault();
		setDateError("Please enter a valid date in MM/DD/YYYY format.");
	};

	const inputClass = `
		w-full
		rounded-xl
		px-4 py-2
		border
		bg-[#FCFCFC] shadow-[0_0_5px_rgba(0,0,0,0.4)]
		outline-none
		text-sm md:text-base
		placeholder:text-[#8E8E8E] text-black
		focus:bg-white
		focus:ring-2
		transition-colors duration-150
		${dateError
			? "border-red-400 focus:border-red-400 focus:ring-red-100"
			: "border-gray-200 focus:border-gray-300 focus:ring-gray-200"
		}
	`;

	if (isDate) {
		return (
			<div className={`${containerClass} font-figtree`}>
				<label
					className="block text-sm md:text-base font-figtree mb-2"
					htmlFor={name}
				>
					{labelText} {isRequired && <RequiredAsterisk />}
				</label>

				{/* Hidden input submits the ISO datetime string as form data */}
				<input
					type="hidden"
					name={name}
					value={
						isValidDate(dateValue)
							? new Date(dateValue).toISOString()
							: ""
					}
				/>

				<input
					className={inputClass}
					type="text"
					inputMode="numeric"
					id={name}
					required={isRequired}
					placeholder={placeholder || "MM/DD/YYYY"}
					value={dateValue}
					maxLength={10}
					onChange={handleDateChange}
					onBlur={handleDateBlur}
					onInvalid={handleDateInvalid}
					ref={(el) => {
						if (el) {
							if (dateValue.length > 0 && !isValidDate(dateValue)) {
								el.setCustomValidity("Please enter a valid date in MM/DD/YYYY format.");
							} else {
								el.setCustomValidity("");
							}
						}
					}}
					aria-describedby={dateError ? `${name}-error` : undefined}
					aria-invalid={!!dateError}
				/>

				{dateError && (
					<p
						id={`${name}-error`}
						role="alert"
						className="mt-1.5 flex items-center gap-1.5 text-xs md:text-sm text-red-500"
					>
						<svg
							className="w-3.5 h-3.5 shrink-0"
							viewBox="0 0 16 16"
							fill="currentColor"
							aria-hidden="true"
						>
							<path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm.75 4a.75.75 0 0 0-1.5 0v3.25a.75.75 0 0 0 1.5 0V5zm-.75 6a.875.875 0 1 0 0-1.75A.875.875 0 0 0 8 11z" />
						</svg>
						{dateError}
					</p>
				)}
			</div>
		);
	}

	return (
		<div className={`${containerClass} font-figtree`}>
			<label
				className="block text-sm md:text-base font-figtree mb-2"
				htmlFor={name}
			>
				{labelText} {isRequired && <RequiredAsterisk />}
			</label>

			<input
				className={inputClass}
				type={type}
				name={name}
				id={name}
				required={isRequired}
				placeholder={placeholder}
			/>
		</div>
	);
}