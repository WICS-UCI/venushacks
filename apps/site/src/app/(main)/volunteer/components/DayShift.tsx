"use client";

import React from "react";
import { useState } from "react";

function as12Hour(hour: number) {
	const suffix = hour >= 12 ? "PM" : "AM";

	hour = hour % 12;
	hour = hour || 12; // instead of 0
	return hour + suffix;
}

interface ShiftInputs {
	shiftText: string;
	startHour: number;
	endHour: number;
	shiftLabel: string;
}

export default function DayShift({
	shiftText,
	startHour,
	endHour,
	shiftLabel,
}: ShiftInputs) {
	const num_hours = endHour - startHour;

	const [availability, setAvailability] = useState(
		Array<boolean>(num_hours).fill(false),
	);
	const [isMouseDown, setIsMouseDown] = useState(false);
	const [firstClicked, setFirstClicked] = useState(false);

	function onMouseDown(
		e: React.MouseEvent<HTMLDivElement, MouseEvent>,
		i: number,
	) {
		e.preventDefault();
		// TODO: edge case - React doesn't guarantee immediate updates
		setIsMouseDown(true);
		setFirstClicked(availability[i]);
		setAvailability((available) => [
			...available.slice(0, i),
			!available[i],
			...available.slice(i + 1),
		]);
	}

	function onMouseOver(i: number) {
		if (isMouseDown) {
			setAvailability((available) => [
				...available.slice(0, i),
				!firstClicked,
				...available.slice(i + 1),
			]);
		}
	}

	function onMouseUp() {
		setIsMouseDown(false);
	}

	return (
		<div className="flex flex-col items-start w-9/12">
			<div className="flex flex-col relative w-full">
				{/* TODO: use actual checkboxes in a table */}
				{availability.map(
					(available, offset) =>
						available && (
							<input
								key={offset}
								className="hidden"
								readOnly
								value={startHour + offset}
								name={shiftLabel}
							/>
						),
				)}
				<div className="w-full text-2xl text-center pb-5 font-sniglet">
					{shiftText}
				</div>
				{availability.map((available, i) => {
					return (
						<div
							key={`shift_${i}`}
							className="relative w-full flex justify-end"
						>
							<div className=" top-[-7px] text-xs left-0 pr-2 mt-[-7px] min-w-[45px]">
								{as12Hour(startHour + i)}
							</div>
							<div
								className={`h-[50px] w-full ${
									i === num_hours ? "" : "border-black border-b-2"
								} ${available ? "bg-blue-500" : "bg-green-100"}`}
								onMouseDown={(e) => onMouseDown(e, i)}
								onMouseUp={onMouseUp}
								onMouseOver={() => onMouseOver(i)}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}
