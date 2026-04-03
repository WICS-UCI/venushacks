"use client";

import { useEffect, useRef } from "react";
import clsx from "clsx";

import EventPlaque from "./EventPlaque";
import EventProps from "../EventProps";
import EventCard from "./EventCard";

import styles from "./EventSidebar.module.scss";

export default function EventSidebar({
	events,
	currentTitle,
	setSelectedEvent,
}: {
	events: EventProps[];
	currentTitle: string | undefined;
	setSelectedEvent: React.Dispatch<
		React.SetStateAction<EventProps | undefined>
	>;
}) {
	const scheduleBarRef = useRef<Map<string, HTMLDivElement>>(new Map());
	const scheduleContainerRef = useRef<HTMLDivElement>(null);
	const scheduleScrollerRef = useRef<HTMLDivElement>(null);

	const getScheduleRef = () => {
		if (!scheduleBarRef.current) scheduleBarRef.current = new Map();
		return scheduleBarRef.current;
	};

	const calculateScrollDistance = (node: HTMLDivElement | undefined) => {
		if (!node || !scheduleContainerRef.current || !scheduleScrollerRef.current)
			return 0;

		return (
			node.getBoundingClientRect().top -
			scheduleContainerRef.current?.getBoundingClientRect().top +
			(node.getBoundingClientRect().bottom - node.getBoundingClientRect().top) /
				2 -
			(scheduleScrollerRef.current?.getBoundingClientRect().bottom -
				scheduleScrollerRef.current?.getBoundingClientRect().top) /
				2
		);
	};

	const scrollToEventPlaqueOnClick = (title: string) => {
		const m = getScheduleRef();
		const node = m.get(title);

		scheduleScrollerRef.current?.scrollTo({
			top: calculateScrollDistance(node),
			behavior: "smooth",
		});

		setSelectedEvent(events.filter((event) => event.title === title)[0]);
	};

	useEffect(() => {
		if (currentTitle) {
			const m = getScheduleRef();
			const node = m.get(currentTitle);

			scheduleScrollerRef.current?.scrollTo({
				top: calculateScrollDistance(node),
				behavior: "smooth",
			});
		}
	}, [currentTitle]);

	return (
		<div className="flex flex-col items-center select-none relative w-[50%] max-lg:w-[100%]">
			<div
				className={clsx(
					styles.background,
					"h-[800px] w-[80%] overflow-auto max-lg:w-full",
				)}
				ref={scheduleScrollerRef}
			>
				<div
					className="w-full h-fit flex flex-col gap-4 p-6 max-lg:gap-10"
					ref={scheduleContainerRef}
				>
					<div className="h-[100px] w-full relative flex justify-center items-center max-md:h-0" />
					{events.map((event) => {
						return (
							<div
								key={`${event.title}${event.startTime.toISOString()}`}
								className="max-lg:hidden"
							>
								<EventPlaque
									onClick={scrollToEventPlaqueOnClick}
									ref={(node: HTMLDivElement) => {
										const m = getScheduleRef();
										m.set(event.title, node);

										return () => m.delete(event.title);
									}}
									title={event.title}
									startTime={event.startTime}
									endTime={event.endTime}
									isHappening={
										currentTitle ===
										`${event.title}${event.startTime.toISOString()}`
									}
								/>
							</div>
						);
					})}

					{events.map((event) => {
						return (
							<div
								key={`${event.title}${event.startTime.toISOString()}`}
								className="lg:hidden"
							>
								<EventCard
									{...event}
									isHappening={
										currentTitle ===
										`${event.title}${event.startTime.toISOString()}`
									}
								/>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
