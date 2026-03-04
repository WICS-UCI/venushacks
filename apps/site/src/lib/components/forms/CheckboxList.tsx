"use client";

import { useEffect, useRef, useState } from "react";

import RequiredAsterisk from "./RequiredAsterisk";

export interface CheckboxListOption {
	value: string;
	label: string;
}

interface CheckboxListProps {
	name: string;
	labelText: string;
	options: CheckboxListOption[];
	isRequired?: boolean;
	includeOther?: boolean;
}

export default function CheckboxList({
	name,
	labelText,
	options,
	isRequired = true,
	includeOther = false,
}: CheckboxListProps) {
	const [otherChecked, setOtherChecked] = useState(false);
	const otherInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (otherChecked) otherInputRef.current?.focus();
	}, [otherChecked]);

	return (
		<div className="flex flex-col w-full gap-2">
			<p className="mb-1 text-sm font-medium">
				{labelText} {isRequired && <RequiredAsterisk />}
			</p>
			<div className="flex flex-col w-full gap-2 px-4 py-3 bg-white border border-gray-300 shadow-md rounded-xl">
				{options.map((opt) => (
					<label
						key={opt.value}
						className="flex items-center gap-3 text-sm text-gray-900 cursor-pointer select-none"
					>
						<input
							type="checkbox"
							name={name}
							value={opt.value}
							className="w-4 h-4 cursor-pointer accent-gray-600"
						/>
						{opt.label}
					</label>
				))}

				{includeOther && (
					<label className="flex items-center gap-3 text-sm text-gray-900 cursor-pointer select-none">
						<input
							type="checkbox"
							name={name}
							value="other"
							checked={otherChecked}
							onChange={(e) => setOtherChecked(e.target.checked)}
							className="w-4 h-4 cursor-pointer accent-gray-600"
						/>
						<span className="shrink-0">Other:</span>
						<input
							ref={otherInputRef}
							type="text"
							name={`_other_${name}`}
							disabled={!otherChecked}
							required={otherChecked}
							className="flex-1 text-sm text-gray-900 bg-transparent border-b border-gray-400 outline-none placeholder:text-gray-400 disabled:opacity-0"
							placeholder="Please specify"
						/>
					</label>
				)}
			</div>
		</div>
	);
}
