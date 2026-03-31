/* eslint-disable no-mixed-spaces-and-tabs */

"use client";

import { useState, useEffect } from "react";

import convertToPST from "@/lib/utils/convertToPST";

import EventCard from "../components/EventCard";
import EventProps from "../EventProps";
import ScheduleScroll from "./ScheduleScroll";
import EventSidebar from "../components/EventSidebar";

import "./SchedulePage.scss";

const T_REFRESH = 15000;

interface ScheduleProps {
	schedule: EventProps[][];
}

// test date : "2024-01-26T23:30:00.000Z"

export default function SchedulePage({ schedule }: ScheduleProps) {
	const [now, setNow] = useState<Date>(convertToPST(new Date()));

	useEffect(() => {
		const refreshNow = setInterval(() => {
			setNow(convertToPST(new Date()));
		}, T_REFRESH);

		return () => {
			clearInterval(refreshNow);
		};
	}, []);

	const [selectedEvent, setSelectedEvent] = useState<EventProps | undefined>(
		undefined,
	);

	const [selectedEventDay, setSelectedEventDay] = useState<Date | undefined>(
		getEventDate(new Date(Date.now())),
	);

	function getEventDate(date: Date) {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate());
	}

	const firstDay = new Date(2025, 0, 24); // hackathon start day

	const allDays = schedule
		.map((event) => (event ? event[0].startTime : new Date(0)))
		.filter((date) => date.getTime() > 0)
		.map((date) => getEventDate(date));

	const currentWeekday =
		now.getTime() > firstDay.getTime() ? getEventDate(now) : firstDay;

	let currentScheduleEvents = schedule.filter(
		(event) =>
			getEventDate(event[0].startTime).getTime() === currentWeekday.getTime(),
	)?.[0];

	const selectedScheduleEvents = schedule.filter(
		(event) =>
			getEventDate(event[0].startTime).getTime() ===
			selectedEventDay?.getTime(),
	)?.[0];

	if (!currentScheduleEvents) currentScheduleEvents = schedule[0];

	const currentEvent = currentScheduleEvents
		? currentScheduleEvents.filter(
				(event) =>
					event.startTime.getTime() <= now.getTime() &&
					event.endTime.getTime() >= now.getTime(),
		  )?.[0]
		: undefined;

	useEffect(() => {
		setSelectedEvent(currentEvent);
	}, [currentEvent]);

	return (
		<div className="relative w-full h-fit flex gap-10 flex-col max-md:gap-2">
			<ScheduleScroll
				weekdays={allDays}
				setSelectedEventDay={setSelectedEventDay}
				selectedEventDay={selectedEventDay}
			/>
			<div className="w-full relative flex max-lg:flex-col-reverse max-lg:gap-20">
				<EventSidebar
					events={
						selectedScheduleEvents
							? selectedScheduleEvents
							: currentScheduleEvents
					}
					currentTitle={`${currentEvent?.title}${currentEvent?.startTime.toISOString()}`}
					setSelectedEvent={setSelectedEvent}
				/>
				{selectedEvent ? (
					<div className="w-[50%] relative flex max-lg:hidden lg:min-h-[700px]">
						<EventCard
							key={selectedEvent.title}
							now={now}
							isHappening={false}
							{...selectedEvent}
						/>
					</div>
				) : (
					<div className="w-[50%] min-h-[700px] relative flex max-lg:justify-center max-lg:hidden">
						<div className="w-[90%] min-h-[700px] h-full bg-black border-4 border-white relative p-16 font-display">
							<div className="text-4xl min-h-[600px] w-full h-full flex justify-center items-center text-center">
								No Event Selected...
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
